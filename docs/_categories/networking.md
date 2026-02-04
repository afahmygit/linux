---
layout: category
title: Networking
icon: ti ti-network
color: #2fb344
description: Network configuration, troubleshooting, and diagnostic commands.
---

## Network Configuration

```bash
ip addr                # Show IP addresses
ip addr show eth0      # Show specific interface
ip link                # Show network interfaces
ip route               # Show routing table
ip link set eth0 up    # Bring interface up
ip link set eth0 down  # Bring interface down
ip addr add 192.168.1.10/24 dev eth0  # Add IP
```

## Network Diagnostics

```bash
ping -c 4 google.com   # Ping with count
ping -i 0.2 host       # Fast ping (200ms interval)
traceroute host        # Trace packet route
tracepath host         # Modern traceroute
mtr host               # My traceroute (continuous)
nslookup domain        # DNS lookup
dig domain             # Detailed DNS lookup
dig +short domain      # Short DNS output
host domain            # DNS lookup (alternative)
whois domain           # WHOIS lookup
```

## Network Statistics & Monitoring

```bash
netstat -tulpn         # Show listening ports + PID
netstat -rn            # Show routing table
netstat -i             # Interface statistics
ss -tulpn              # Modern netstat
ss -s                  # Summary statistics
ip link show           # Interface stats
sar -n DEV 1           # Network stats (1s interval)
```

## Connection & Port Testing

```bash
telnet host port        # Test TCP connection
nc -zv host port        # Netcat port test
nc -l 8080              # Listen on port
curl -I http://site     # HTTP headers only
wget -O - http://site   # Download to stdout
```

## Firewall (iptables/nftables)

```bash
# iptables
iptables -L -v -n       # List rules
iptables -A INPUT -p tcp --dport 22 -j ACCEPT  # Allow SSH
iptables -A INPUT -s 192.168.1.0/24 -j ACCEPT  # Allow subnet
iptables -D INPUT <line>  # Delete rule
iptables -F             # Flush all rules

# nftables
nft list ruleset        # List all rules
```

## Packet Capture

```bash
tcpdump -i eth0         # Capture on interface
tcpdump -i eth0 port 22 # Capture SSH traffic
tcpdump -i eth0 -w capture.pcap  # Write to file
tcpdump -r capture.pcap # Read from file
tcpdump -n -i eth0      # No DNS resolution
```

## Bandwidth Monitoring

```bash
iftop                   # Real-time bandwidth
nethogs                 # Per-process bandwidth
speedtest-cli           # Internet speed test
iperf3 -s               # Start iperf3 server
iperf3 -c server        # Client speed test
```

## Common Scenarios

### Troubleshoot network connectivity
```bash
# Check local IP
ip addr show

# Check routing
ip route

# Test DNS
ping 8.8.8.8
ping google.com

# Trace route
traceroute google.com

# Check specific port
nc -zv host 443
```

### Find which process is using a port
```bash
# Using lsof
lsof -i :8080

# Using netstat
netstat -tulpn | grep :8080

# Using ss
ss -tulpn | grep :8080
```

### Set a static IP (temporary)
```bash
# Add IP to interface
ip addr add 192.168.1.100/24 dev eth0

# Bring interface up
ip link set eth0 up

# Add default route
ip route add default via 192.168.1.1
```

### Check internet speed
```bash
# Using speedtest-cli
speedtest-cli

# Using iperf3 (need a server)
iperf3 -c speedtest.tele2.net
```

### Capture HTTP traffic
```bash
# Capture HTTP on port 80
tcpdump -i eth0 -A -s 0 'tcp port 80 and (((ip[2:2] - ((ip[0]&0xf)<<2)) - ((tcp[12]&0xf0)>>2)) != 0)'

# Capture HTTPS handshake
tcpdump -i eth0 -n 'tcp port 443' -X
```

### Check open ports on localhost
```bash
# Using ss
ss -tulpn

# Using netstat
netstat -tulpn

# Using nmap
nmap -sT -O localhost
```
