---
layout: category
title: System Administration
icon: ti ti-server
color: #00d4ff
description: Core system administration commands including system information, monitoring, and diagnostics.
---

## System Information

```bash
uname -a              # Display all system information
uname -r              # Display kernel release
uname -m              # Display machine hardware
hostname              # Show or set hostname
uptime                # System uptime and load
arch                  # Show system architecture
dmidecode             # Display SMBIOS/DMI information
lscpu                 # Display CPU information
lsblk                 # List block devices
lspci                 # List PCI devices
lsusb                 # List USB devices
```

## System Monitoring

```bash
top                   # Real-time process viewer
htop                  # Interactive process viewer
atop                  # Advanced system monitor
iotop                 # I/O monitoring
vmstat 1              # Virtual memory statistics (1s interval)
iostat -x 1           # Extended I/O statistics
mpstat -P ALL 1       # Per-CPU statistics
sar                   # System activity reporter
```

## Memory Management

```bash
free -h               # Human-readable memory usage
free -m               # Memory in MB
free -g               # Memory in GB
vmstat                # Virtual memory stats
slabtop               # Kernel slab cache info
cat /proc/meminfo     # Detailed memory info
```

## Kernel & Logging

```bash
dmesg                 # Display kernel ring buffer
dmesg | tail -50      # Last 50 kernel messages
dmesg -T              # Human-readable timestamps
journalctl            # View systemd journal
journalctl -f         # Follow journal logs
journalctl -u service # View specific service logs
journalctl --since today  # Today's logs
last                  # Show last logged in users
w                     # Who is logged in and what
```

## Common Scenarios

### Check system resource usage
```bash
# Quick overview
free -h && df -h && uptime

# Detailed process view
htop

# Real-time monitoring
vmstat 1
```

### Troubleshoot high CPU
```bash
# Find top CPU consumers
top -o %CPU

# Check per-CPU usage
mpstat -P ALL 1

# Find process details
ps aux --sort=-%CPU | head -10
```

### View system boot issues
```bash
# Check kernel messages
dmesg | grep -i error
dmesg | grep -i fail

# Check service failures
journalctl -b -p err
systemctl --failed
```
