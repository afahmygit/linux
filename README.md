# Linux and DevOps Commands Reference Guide

A comprehensive collection of essential Linux commands and DevOps tools reference for system administrators and DevOps engineers.

## Table of Contents
- [File and Directory Management](#file-and-directory-management)
- [File Viewing and Editing](#file-viewing-and-editing)
- [Process Management](#process-management)
- [Disk Management](#disk-management)
- [Networking](#networking)
- [User and Group Management](#user-and-group-management)
- [System Information and Monitoring](#system-information-and-monitoring)
- [Archiving and Compression](#archiving-and-compression)
- [Package Management](#package-management)
- [System Services and Daemon Management](#system-services-and-daemon-management)
- [Scheduling Tasks](#scheduling-tasks)
- [File Permissions and Security](#file-permissions-and-security)
- [System Backup and Restore](#system-backup-and-restore)
- [System Diagnostics and Troubleshooting](#system-diagnostics-and-troubleshooting)
- [Networking & Remote Management](#networking--remote-management)
- [Text Processing Utilities](#text-processing-utilities)
- [System Shutdown and Reboot](#system-shutdown-and-reboot)
- [File System Mounting and Management](#file-system-mounting-and-management)
- [Filesystem Permissions and Security](#filesystem-permissions-and-security)
- [Containerization and Orchestration](#containerization-and-orchestration)
- [Automation and Configuration Management](#automation-and-configuration-management)
- [CI/CD Tools and Commands](#cicd-tools-and-commands)
- [Cloud Services](#cloud-services)
- [Logging and Monitoring](#logging-and-monitoring)

## File and Directory Management

Essential commands for managing files and directories in Linux systems.

```bash
ls -la       # List all files with detailed information
pwd         # Print working directory
cd -        # Change to previous directory
mkdir -p    # Create directory and parents if needed
rm -rf      # Remove directories recursively
cp -r       # Copy directories recursively
mv          # Move/rename files or directories
touch       # Create empty file or update timestamp
find / -name "pattern"    # Search for files
tree -L 2   # Display directory structure, 2 levels deep
ln -s       # Create symbolic link
chmod       # Change file permissions
chown       # Change file owner
df -h       # Display disk space usage
du -sh      # Display directory size
```

## File Viewing and Editing

Commands for viewing, editing, and manipulating file contents.

```bash
cat         # Display file contents
less        # View file contents page by page
head -n     # Display first n lines of file
tail -f     # Monitor file in real-time
nano        # Simple text editor
vim         # Advanced text editor
grep -r     # Recursive text search
sed -i      # In-place text substitution
awk '{print $1}'    # Process text by columns
sort        # Sort lines in text files
uniq        # Report or filter out repeated lines
cut -d      # Remove sections from lines
paste      # Merge lines of files
diff        # Compare files line by line
```

## Process Management

Commands for monitoring and controlling system processes.

```bash
ps aux      # Display all processes
top -c      # Show processes with command
htop        # Interactive process viewer
kill -9     # Force terminate process
pkill -f    # Kill process by name pattern
nice -n     # Start program with priority
renice -n   # Change process priority
nohup       # Run immune to hangups
screen      # Terminal multiplexer
tmux        # Terminal session manager
pgrep       # List processes by name
strace      # Trace system calls
lsof        # List open files
fuser       # Identify processes using files
```

## Disk Management

Commands for managing storage devices and filesystems.

```bash
fdisk -l    # List disk partitions
parted      # Partition manipulation tool
mkfs        # Create filesystem
mount       # Mount filesystem
umount      # Unmount filesystem
fsck        # Check filesystem
dd          # Convert and copy files
badblocks   # Check for bad blocks
smartctl    # SMART disk monitoring
lvdisplay   # Display logical volumes
vgdisplay   # Display volume groups
pvdisplay   # Display physical volumes
```

## Networking

Network configuration and troubleshooting commands.

```bash
ip addr     # Show IP addresses
ip route    # Show routing table
netstat -tulpn  # Show listening ports
ss          # Socket statistics
ping        # Test network connectivity
traceroute  # Trace packet route
nslookup    # Query DNS
dig         # DNS lookup utility
host        # DNS lookup
ifconfig    # Configure network interface
route       # Show/manipulate routing table
iptables    # Configure firewall rules
tcpdump     # Capture network traffic
nmap        # Network exploration tool
```

## User and Group Management

Commands for managing system users and groups.

```bash
useradd     # Create new user
usermod     # Modify user account
userdel     # Delete user account
groupadd    # Create new group
groupmod    # Modify group
groupdel    # Delete group
passwd      # Change password
chage       # Change user password expiry
id          # Print user/group IDs
who         # Show who is logged in
w           # Show who is logged in and what they're doing
last        # Show last logged in users
sudo        # Execute command as another user
su          # Switch user
```

## System Information and Monitoring

Commands for system monitoring and information gathering.

```bash
uname -a    # System information
uptime      # System uptime
free -h     # Memory usage
vmstat      # Virtual memory statistics
iostat      # CPU and I/O statistics
sar         # System activity reporter
mpstat      # CPU statistics
pidstat     # Process statistics
dmesg       # Kernel ring buffer
journalctl  # Query systemd journal
```

## Archiving and Compression

Commands for file archiving and compression.

```bash
tar -czf    # Create gzipped tar archive
tar -xzf    # Extract gzipped tar archive
gzip        # Compress files
gunzip      # Decompress files
zip         # Create zip archive
unzip       # Extract zip archive
bzip2       # Compress files
bunzip2     # Decompress files
xz          # Compress files
unxz        # Decompress files
```

## Package Management

Package management commands for different Linux distributions.

```bash
# Debian/Ubuntu
apt update          # Update package list
apt upgrade         # Upgrade packages
apt install         # Install package
apt remove          # Remove package
dpkg -i            # Install local package

# Red Hat/CentOS
yum update         # Update packages
yum install        # Install package
yum remove         # Remove package
rpm -i             # Install local package

# SUSE
zypper update      # Update packages
zypper install     # Install package
zypper remove      # Remove package
```

## System Services and Daemon Management

Commands for managing system services using systemd.

```bash
systemctl start    # Start service
systemctl stop     # Stop service
systemctl restart  # Restart service
systemctl status   # Check service status
systemctl enable   # Enable service at boot
systemctl disable  # Disable service at boot
systemctl list-units  # List units
journalctl -u     # View service logs
```

## Scheduling Tasks

Commands for scheduling and automating tasks.

```bash
crontab -e        # Edit cron jobs
crontab -l        # List cron jobs
at                # Schedule one-time task
batch             # Schedule task for low load
anacron           # Periodic command scheduler
systemd-run       # Run command as service
```

## File Permissions and Security

Commands for managing file permissions and security.

```bash
chmod             # Change file permissions
chown             # Change file owner
chgrp             # Change group ownership
umask             # Set default permissions
getfacl           # Display file ACLs
setfacl           # Modify file ACLs
chattr            # Change file attributes
lsattr            # List file attributes
```

## System Backup and Restore

Commands for system backup and recovery.

```bash
rsync             # Remote file copying tool
dd                # Disk cloning
dump              # Filesystem backup
restore           # Restore from backup
tar               # Archive utility
duplicity         # Encrypted backup
rdiff-backup      # Incremental backup
```

## Containerization and Orchestration

Docker and Kubernetes commands for container management.

```bash
# Docker
docker build -t    # Build image with tag
docker run -d      # Run container in background
docker exec -it    # Interactive terminal
docker logs -f     # Follow container logs
docker-compose up -d  # Start services
docker network     # Manage networks
docker volume      # Manage volumes

# Kubernetes
kubectl get all    # List all resources
kubectl describe   # Resource details
kubectl logs -f    # Follow pod logs
kubectl port-forward  # Port forwarding
kubectl apply -f   # Apply manifest
kubectl delete     # Delete resource
kubectl rollout    # Manage rollouts
kubectl scale     # Scale resources
```

## Logging and Monitoring

Advanced logging and monitoring tools configuration.

```bash
# Prometheus
prometheus --config.file=prometheus.yml    # Start Prometheus
promtool check config                     # Validate config
promtool query instant                    # Query metrics

# Prometheus Query Examples
rate(http_requests_total[5m])           # Request rate
sum by (status_code) (http_requests_total)  # Requests by status
increase(node_cpu_seconds_total[1h])    # CPU usage

# Prometheus Configuration
global:
  scrape_interval: 15s
scrape_configs:
  - job_name: 'node'
    static_configs:
      - targets: ['localhost:9100']

# Grafana
grafana-server                          # Start Grafana server
grafana-cli plugins install            # Install plugins
grafana-cli admin reset-admin-password  # Reset admin password

# Grafana API Examples
curl -X POST http://localhost:3000/api/dashboards/db    # Create dashboard
curl -X GET http://localhost:3000/api/search            # Search dashboards
curl -X PUT http://localhost:3000/api/user/password     # Update password

# Grafana Dashboard JSON Example
{
  "dashboard": {
    "id": null,
    "title": "System Metrics",
    "panels": [
      {
        "title": "CPU Usage",
        "type": "graph",
        "targets": [
          {
            "expr": "rate(node_cpu_seconds_total[5m])",
            "legendFormat": "{{cpu}}"
          }
        ]
      }
    ]
  }
}
```

## CI/CD Tools and Commands

Commands for various CI/CD platforms.

```bash
# Azure DevOps
az pipelines create              # Create pipeline
az pipelines run                 # Run pipeline
az repos pr create              # Create pull request
az boards work-item create      # Create work item
az artifacts universal publish  # Publish package

# AWS CodeBuild/CodePipeline
aws codebuild start-build       # Start build
aws codebuild batch-get-builds  # Get build info
aws codepipeline start-pipeline-execution  # Start pipeline
aws codepipeline get-pipeline-state       # Get pipeline state

# ArgoCD
argocd login                    # Login to ArgoCD server
argocd app create              # Create application
argocd app sync                # Sync application
argocd app list                # List applications
argocd cluster add             # Add cluster
argocd proj create             # Create project
```

## Cloud Services

Extended cloud provider CLI commands.

```bash
# AWS CLI
aws ec2 run-instances          # Launch EC2 instance
aws s3 sync                    # Sync directories with S3
aws rds create-db-instance     # Create RDS instance
aws lambda invoke              # Invoke Lambda function
aws ecs run-task              # Run ECS task

# Azure CLI
az vm create                   # Create VM
az webapp deploy              # Deploy web app
az aks create                 # Create AKS cluster
az network vnet create        # Create virtual network
az monitor metrics list       # List metrics

# Google Cloud CLI
gcloud compute instances create  # Create instance
gcloud container clusters create # Create GKE cluster
gcloud functions deploy         # Deploy function
gcloud sql instances create     # Create SQL instance
```

