---
layout: category
title: System Services
icon: ti ti-settings
color: #fcc624
description: Systemd service management, init scripts, and service monitoring.
---

## Systemd Service Management

```bash
systemctl start service        # Start service
systemctl stop service         # Stop service
systemctl restart service      # Restart service
systemctl reload service       # Reload config
systemctl status service       # Check status
systemctl enable service       # Enable at boot
systemctl disable service      # Disable at boot
systemctl is-enabled service   # Check if enabled
systemctl is-active service    # Check if running
systemctl daemon-reload        # Reload systemd
```

## Service Information

```bash
systemctl list-units           # List all units
systemctl list-units --type=service  # List services
systemctl list-units --failed  # List failed units
systemctl list-unit-files      # List all unit files
systemctl show service         # Show service properties
systemctl cat service          # Show service file
```

## Service Logs

```bash
journalctl -u service          # View service logs
journalctl -u service -f       # Follow service logs
journalctl -u service --since today  # Today's logs
journalctl -u service -b       # Since boot
journalctl -p err              # Error logs only
journalctl --disk-usage        # Show disk usage
journalctl --vacuum-time=7d    # Delete old logs
```

## System Management

```bash
systemctl poweroff             # Power off
systemctl reboot               # Reboot
systemctl suspend              # Suspend
systemctl hibernate            # Hibernate
systemctl rescue               # Rescue mode
systemctl emergency            # Emergency mode
systemctl get-default          # Get default target
systemctl set-default multi-user.target  # Set default
```

## Runlevels/Targets

```bash
systemctl list-targets         # List all targets
systemctl get-default          # Current default target
systemctl isolate multi-user.target   # Switch target
systemctl isolate graphical.target    # Switch to GUI
```

## Timer Units (Cron Alternative)

```bash
systemctl list-timers          # List active timers
systemctl start timer          # Start timer
systemctl status timer         # Timer status
systemctl list-timers --all    # All timers
```

## Service Troubleshooting

```bash
systemctl restart service      # Try restart
systemctl reset-failed service # Reset failed state
systemctl status service -l    # Detailed status
journalctl -xe                 # Show errors
systemctl show service         # Show properties
```

## Init Scripts (Legacy)

```bash
service nginx status           # Service command
/etc/init.d/nginx status       # Init script
chkconfig --list               # List services (RHEL)
update-rc.d nginx defaults     # Enable service (Debian)
```

## Common Scenarios

### Start a service and enable at boot
```bash
# Start and enable
systemctl start nginx
systemctl enable nginx

# Or combined
systemctl enable --now nginx

# Check status
systemctl status nginx
```

### Debug a failing service
```bash
# Check status
systemctl status service -l

# View logs
journalctl -u service -n 50

# View logs since boot
journalctl -u service -b

# View real-time logs
journalctl -u service -f

# Check service config
systemctl cat service
```

### Create a custom systemd service
```bash
# Create service file
nano /etc/systemd/system/myservice.service

# Content:
[Unit]
Description=My Custom Service
After=network.target

[Service]
Type=simple
User=myuser
ExecStart=/path/to/script
Restart=on-failure

[Install]
WantedBy=multi-user.target

# Reload and start
systemctl daemon-reload
systemctl enable --now myservice
```

### Check service startup time
```bash
# Service startup time
systemd-analyze blame | grep service

# Overall boot time
systemd-analyze time

# Graph boot process
systemd-analyze critical-chain
```

### Run script as systemd timer
```bash
# Create timer file
nano /etc/systemd/system/mytask.timer

# Content:
[Unit]
Description=Run mytask daily

[Timer]
OnCalendar=daily
Persistent=true

[Install]
WantedBy=timers.target

# Create service
nano /etc/systemd/system/mytask.service

# Content:
[Unit]
Description=My Task
[Service]
Type=oneshot
ExecStart=/path/to/script

[Install]
WantedBy=multi-user.target

# Enable and start
systemctl enable --now mytask.timer
```

### Disable a service temporarily
```bash
# Stop service
systemctl stop service

# Disable from auto-start
systemctl disable service

# Mask service (prevent manual start)
systemctl mask service

# Unmask when needed
systemctl unmask service
```

### View resource usage of services
```bash
# Using systemd-cgtop
systemd-cgtop

# Check service resource limits
systemctl show service | grep -i limit

# View service cgroup
cat /sys/fs/cgroup/systemd/system.service/*
```
