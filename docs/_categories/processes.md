---
layout: category
title: Process Management
icon: ti ti-cpu
color: #ff0055
description: Process monitoring, control, and system resource management.
---

## Process Viewing

```bash
ps aux                 # Show all processes
ps -ef                 # Full format listing
ps aux --sort=-%cpu    # Sort by CPU
ps aux --sort=-%mem    # Sort by memory
ps -u username         # Processes by user
ps tree                # Process tree
pstree                 # Process tree view
pgrep process          # Find process ID
pidof process          # Find process ID
```

## Interactive Process Monitoring

```bash
top                    # Real-time process viewer
htop                   # Enhanced top (colorful)
atop                   # Advanced system monitor
iotop                  # I/O monitor
btop                   # Modern resource monitor
```

### Common top commands
```
P    - Sort by CPU
M    - Sort by memory
k    - Kill process
r    - Renice process
q    - Quit
```

## Process Control

```bash
kill PID               # Send SIGTERM (15)
kill -9 PID            # Send SIGKILL (9)
kill -l                # List signals
killall name           # Kill all by name
pkill pattern          # Kill by pattern
pkill -9 -f pattern    # Force kill by pattern
```

## Process Priority

```bash
nice -n 10 command     # Run with low priority
nice -n -5 command     # Run with high priority
renice -n 5 PID        # Change priority
renice -n -5 PID       # Increase priority
```

## Background & Foreground

```bash
command &              # Run in background
jobs                   # List background jobs
bg %1                  # Background job 1
fg %1                  # Foreground job 1
nohup command &        # Immune to hangups
disown                 # Remove from job list
```

## Terminal Multiplexing

```bash
screen                 # Start screen session
screen -S name         # Named session
screen -ls             # List sessions
screen -r name         # Attach to session
# Detach: Ctrl+A, D

tmux                   # Start tmux
tmux new -s name       # Named session
tmux ls                # List sessions
tmux attach -t name    # Attach session
# Detach: Ctrl+B, D
```

## Process Monitoring Details

```bash
strace -p PID          # Trace system calls
ltrace -p PID          # Trace library calls
strace command         # Trace new command
lsof -p PID            # Files opened by process
lsof -i                # Network open files
/proc/PID/             # Process info directory
cat /proc/PID/status   # Process status
cat /proc/PID/cmdline  # Command line
cat /proc/PID/environ  # Environment variables
```

## System Resource Limits

```bash
ulimit -a              # Show all limits
ulimit -n              # Open files limit
ulimit -u              # User processes limit
ulimit -n 4096         # Set open files limit
/etc/security/limits.conf  # Permanent limits
```

## Common Scenarios

### Find and kill a specific process
```bash
# Find the process
ps aux | grep process_name
pgrep process_name

# Kill it
kill $(pgrep process_name)
pkill process_name

# Force kill
kill -9 $(pgrep process_name)
pkill -9 process_name
```

### Run process in background and keep after logout
```bash
# Using nohup
nohup long_command &

# Using screen
screen -S mysession
long_command
# Detach: Ctrl+A, D

# Using tmux
tmux new -s mysession
long_command
# Detach: Ctrl+B, D
```

### Monitor specific process resources
```bash
# Using top with filter
top -p $(pgrep process_name)

# Using htop
htop -p $(pgrep process_name)

# Watch process stats
watch -n 1 'ps aux | grep process_name'

# Monitor with pidstat
pidstat -p PID 1
```

### Find zombie processes
```bash
# Find zombies
ps aux | grep Z

# Find zombie parent
ps -el | grep Z

# Kill zombie parent (cannot kill zombie directly)
kill -9 $(ps -el | grep Z | awk '{print $4}')
```

### Find what's using the most CPU
```bash
# Using top
top -o %CPU

# Using ps
ps aux --sort=-%cpu | head -10

# Continuous monitoring
watch -n 1 'ps aux --sort=-%cpu | head -10'
```

### Check process environment
```bash
# View environment
cat /proc/PID/environ | tr '\0' '\n'

# Using ps
ps eww PID

# Using strace
strace -e trace=open -p PID
```

### Run command at specific time
```bash
# Using at
echo "command" | at 10:30
echo "command" | at now + 1 hour

# List at jobs
atq

# Remove at job
atrm jobnum
```

### Trace system calls of running process
```bash
# Trace all system calls
strace -p PID

# Trace specific calls (file operations)
strace -e trace=file -p PID

# Trace with timestamp
strace -tt -p PID

# Save to file
strace -o trace.log -p PID
```
