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
- [ZFS Management](#zfs-management)
- [ZFS Tools and Snapshots](#zfs-tools-and-snapshots)
- [ZnapZend Backup](#znapzend-backup)
- [Logical Volume Management](#logical-volume-management)
- [Btrfs File System](#btrfs-file-system)
- [Proxmox Administration](#proxmox-administration)
- [Configuration Management](#configuration-management)
- [Infrastructure as Code](#infrastructure-as-code)
- [Container Orchestration](#container-orchestration)
- [Continuous Integration](#continuous-integration)
- [GPU & AI Management](#gpu--ai-management)
- [Server BMC & iLO Management](#server-bmc--ilo-management)


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

## ZFS Management

Commands for managing ZFS pools and datasets.

```bash
# Pool Management
zpool create tank mirror sda sdb    # Create mirrored pool
zpool status -v                     # Show pool status
zpool scrub tank                    # Start pool scrub
zpool import -f tank                # Force import pool
zpool export tank                   # Export pool

# Dataset Management
zfs create tank/dataset            # Create dataset
zfs set compression=lz4 tank/dataset  # Enable compression
zfs get all tank/dataset           # Show all properties
zfs list -t snapshot               # List snapshots
zfs send tank/dataset@snap | zfs receive backup/dataset  # Send snapshot

# Performance Tuning
zfs set primarycache=all tank      # Set ARC cache
zfs set secondarycache=all tank    # Set L2ARC cache
zfs set sync=disabled tank         # Disable sync writes
zfs set atime=off tank            # Disable access time updates

# Example: Creating a Mirrored Pool with Cache
zpool create tank mirror sda sdb \
    cache nvme0n1 \
    log mirror nvme1n1 nvme2n1
```

## ZFS Tools and Snapshots

Advanced ZFS tools and snapshot management.

```bash
# ZFS Tools
zfs-auto-snapshot                  # Automatic snapshot tool
sanoid                            # Policy-driven snapshot management
zfs-linux-utils                   # Additional ZFS utilities

# Snapshot Management
zfs snapshot tank/dataset@snap    # Create snapshot
zfs rollback tank/dataset@snap    # Rollback to snapshot
zfs clone tank/dataset@snap tank/clone  # Clone snapshot
zfs destroy tank/dataset@snap     # Delete snapshot

# Example: Automated Snapshot Script
#!/bin/bash
# Create daily snapshot with timestamp
DATE=$(date +%Y-%m-%d_%H:%M)
zfs snapshot -r tank@daily-$DATE

# Clean old snapshots
zfs list -H -t snapshot -o name | \
    grep "daily-" | head -n -7 | \
    xargs -r zfs destroy
```

## ZnapZend Backup

ZnapZend configuration and backup management.

```bash
# ZnapZend Setup
znapzendzetup create --tsformat='%Y-%m-%d-%H%M%S' \
    SRC '7d=>1h,30d=>1d' tank/dataset \
    DST '7d=>1h,30d=>1d' backup/dataset

# Configuration Management
znapzendzetup list                # List configurations
znapzendzetup export pool/fs      # Export configuration
znapzendzetup import pool/fs      # Import configuration

# Backup Management
znapzend --noaction              # Dry run
znapzend --verbose               # Verbose output
znapzend --recursive             # Recursive backup

# Example: ZnapZend Configuration
tank/dataset:
    frequent => 4=>15min
    hourly => 24=>1hour
    daily => 7=>1day
    weekly => 4=>1week
    monthly => 12=>1month
```

## Logical Volume Management

LVM commands for managing storage volumes.

```bash
# Physical Volume Management
pvcreate /dev/sdb                # Create PV
pvdisplay                        # Show PV info
pvresize /dev/sdb                # Resize PV

# Volume Group Management
vgcreate vg0 /dev/sdb           # Create VG
vgextend vg0 /dev/sdc           # Add PV to VG
vgreduce vg0 /dev/sdc           # Remove PV from VG

# Logical Volume Management
lvcreate -L 10G vg0 -n lv0      # Create LV
lvextend -L +5G /dev/vg0/lv0    # Extend LV
lvreduce -L -5G /dev/vg0/lv0    # Reduce LV

# Filesystem Resizing
# For ext3/ext4
resize2fs /dev/vg0/lv0          # Resize after lvextend

# For XFS
xfs_growfs /dev/vg0/lv0         # Grow XFS filesystem
# Note: XFS cannot be shrunk

# Example: Extending Root Volume
lvextend -l +100%FREE /dev/vg0/root  # Use all free space
resize2fs /dev/vg0/root              # Resize filesystem
```

## Btrfs File System

Btrfs filesystem management commands.

```bash
# Filesystem Management
mkfs.btrfs /dev/sda              # Create filesystem
btrfs filesystem show            # Show filesystem
btrfs filesystem df /mount       # Show space usage
btrfs balance start /mount       # Start balance

# Subvolume Management
btrfs subvolume create /mount/@  # Create subvolume
btrfs subvolume list /mount      # List subvolumes
btrfs subvolume delete /mount/@  # Delete subvolume

# Snapshot Management
btrfs subvolume snapshot /mount/@ /mount/@snap  # Create snapshot
btrfs send /mount/@snap | btrfs receive /backup # Send snapshot

# Example: Creating RAID1 Filesystem
mkfs.btrfs -d raid1 -m raid1 /dev/sda /dev/sdb

# Example: Defragmentation
btrfs filesystem defragment -r /mount
```

## Proxmox Administration

Proxmox VE management commands.

```bash
# VM Management
qm list                          # List VMs
qm start 100                     # Start VM
qm stop 100                      # Stop VM
qm create 100                    # Create VM

# Container Management
pct list                         # List containers
pct start 100                    # Start container
pct stop 100                     # Stop container
pct create 100 local:vztmpl/ubuntu-20.04-standard_20.04-1_amd64.tar.gz

# Storage Management
pvesm status                     # Show storage status
pvesm add cifs storage --server 192.168.1.100 --share backup

# Cluster Management
pvecm status                     # Show cluster status
pvecm add node2                  # Add node to cluster

# Example: Creating VM from Template
qm clone 9000 100 --name web-server
qm set 100 --cores 2
qm set 100 --memory 2048
qm start 100
```

## Configuration Management

Ansible configuration and playbook examples.

```yaml
# Inventory Example
[webservers]
web1.example.com
web2.example.com

[dbservers]
db1.example.com
db2.example.com

# Playbook Example - Configure Web Servers
---
- name: Configure web servers
  hosts: webservers
  become: yes
  
  vars:
    http_port: 80
    max_clients: 200
    
  tasks:
    - name: Install Apache
      apt:
        name: apache2
        state: present
        
    - name: Start Apache
      service:
        name: apache2
        state: started
        enabled: yes
        
    - name: Deploy configuration
      template:
        src: apache2.conf.j2
        dest: /etc/apache2/apache2.conf
      notify: Restart Apache
      
  handlers:
    - name: Restart Apache
      service:
        name: apache2
        state: restarted

# Role Structure Example
roles/
  webserver/
    tasks/
      main.yml
    handlers/
      main.yml
    templates/
      apache2.conf.j2
    vars/
      main.yml
```

## Infrastructure as Code

Terraform configuration examples.

```hcl
# Provider Configuration
provider "aws" {
  region = "us-west-2"
}

# VPC Configuration
resource "aws_vpc" "main" {
  cidr_block = "10.0.0.0/16"
  
  tags = {
    Name = "main"
  }
}

# EC2 Instance
resource "aws_instance" "web" {
  ami           = "ami-0c55b159cbfafe1f0"
  instance_type = "t2.micro"
  
  vpc_security_group_ids = [aws_security_group.allow_http.id]
  
  tags = {
    Name = "web-server"
  }
}

# Example: Using Variables
variable "environment" {
  type    = string
  default = "development"
}

# Example: Using Modules
module "vpc" {
  source = "terraform-aws-modules/vpc/aws"
  
  name = "my-vpc"
  cidr = "10.0.0.0/16"
  
  azs             = ["us-west-2a", "us-west-2b"]
  private_subnets = ["10.0.1.0/24", "10.0.2.0/24"]
  public_subnets  = ["10.0.101.0/24", "10.0.102.0/24"]
}
```

## Container Orchestration

Kubernetes and k3s administration.

```bash
# Kubernetes Administration
kubectl apply -f manifest.yaml    # Apply configuration
kubectl get pods -A               # List all pods
kubectl describe node node1       # Show node details
kubectl logs pod-name            # View pod logs

# K3s Management
k3s server                       # Start K3s server
k3s agent                        # Start K3s agent
k3s kubectl get nodes           # List nodes
k3s uninstall.sh                # Uninstall K3s

# ArgoCD Application Example
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: myapp
  namespace: argocd
spec:
  project: default
  source:
    repoURL: https://github.com/org/repo
    targetRevision: HEAD
    path: k8s
  destination:
    server: https://kubernetes.default.svc
    namespace: myapp

# Example: Deploying with Kustomize
kubectl apply -k ./overlay/production
```

## Continuous Integration

Jenkins pipeline examples.

```groovy
// Jenkinsfile Example
pipeline {
    agent any
    
    environment {
        DOCKER_IMAGE = 'myapp:${BUILD_NUMBER}'
    }
    
    stages {
        stage('Build') {
            steps {
                sh 'docker build -t ${DOCKER_IMAGE} .'
            }
        }
        
        stage('Test') {
            steps {
                sh 'docker run --rm ${DOCKER_IMAGE} npm test'
            }
        }
        
        stage('Deploy') {
            when {
                branch 'main'
            }
            steps {
                sh '''
                    kubectl apply -f k8s/
                    kubectl set image deployment/myapp \
                        container=${DOCKER_IMAGE}
                '''
            }
        }
    }

    post {
        always {
            cleanWs()
        }
    }
}
```

## GPU & AI Management

NVIDIA GPU management, AI/ML tools, HPC workload management.

```bash
# NVIDIA GPU Monitoring with nvidia-smi
nvidia-smi                                    # Show GPU status
nvidia-smi dmon                               # Continuous monitoring
watch -n 1 nvidia-smi                         # Watch GPU stats
nvidia-smi -q                                 # Detailed GPU info
nvidia-smi -q -d TEMPERATURE                  # Temperature info only
nvidia-smi --query-gpu=utilization.gpu,temperature.gpu --format=csv,noheader

# GPU Process Management
nvidia-smi pmon -c 1                          # Show processes using GPU
fuser -v /dev/nvidia*                         # Find GPU processes

# NVIDIA Driver & CUDA
nvcc --version                                # Check CUDA version
cat /usr/local/cuda/version.txt              # Legacy CUDA version check
ls -la /usr/local/ | grep cuda                # List installed CUDA versions

# Set CUDA version (add to .bashrc)
export PATH=/usr/local/cuda-12.1/bin:$PATH
export LD_LIBRARY_PATH=/usr/local/cuda-12.1/lib64:$LD_LIBRARY_PATH
sudo update-alternatives --config cuda       # Switch CUDA versions

# GPU Persistence & Power Management
sudo nvidia-smi -pm 1                         # Enable persistence mode
sudo nvidia-smi -pl 250                       # Set power limit (W)
nvidia-smi -r                                  # Reset all GPUs
nvidia-smi -i 0 -r                             # Reset specific GPU

# GPU Device Selection
export CUDA_VISIBLE_DEVICES=0,1               # Use GPUs 0 and 1
export CUDA_VISIBLE_DEVICES=2,3               # Use GPUs 2 and 3

# Conda - Environment & Package Management
conda create -n myenv python=3.11             # Create environment
conda activate myenv                          # Activate environment
conda deactivate                               # Deactivate environment
conda env list                                 # List environments
conda env remove -n myenv                     # Remove environment
conda install numpy pandas matplotlib         # Install packages
conda install -c conda-forge package          # Install from channel
conda list                                     # List installed packages
conda search tensorflow                       # Search packages
conda env export > environment.yml            # Export environment
conda env create -f environment.yml           # Create from file

# Environment Modules (Lmod)
module avail                                   # List available modules
module list                                    # List loaded modules
module load cuda/12.1                          # Load module
module unload cuda                             # Unload module
module purge                                    # Unload all modules
module spider keyword                          # Search modules
module show cuda/12.1                          # Module details

# Spack - HPC Package Manager
spack list                                     # List packages
spack find                                     # Find installed packages
spack info package_name                        # Package info
spack install package_name                     # Install package
spack install package_name@version             # Specific version
spack install package_name+cuda                # With variants
spack env create myenv                         # Create environment
spack env activate myenv                       # Activate environment

# Slurm - Workload Manager
sinfo                                         # Cluster state
sinfo -N -l                                   # Detailed node info
squeue                                        # Job queue
squeue -u $USER                               # Your jobs
sbatch job_script.sh                          # Submit job
srun --pty bash                               # Interactive job
scancel <job_id>                              # Cancel job
scontrol show job <job_id>                    # Job details
sacct -j <job_id>                             # Job history

# Slurm Job Script Example
#!/bin/bash
#SBATCH --job-name=myjob
#SBATCH --nodes=2
#SBATCH --ntasks-per-node=4
#SBATCH --gres=gpu:4
#SBATCH --time=04:00:00
#SBATCH --partition=gpu
module load cuda/12.1 python/3.11
srun python train.py

# IPMI for Remote GPU Management (some BMCs)
ipmitool sensor list | grep -i gpu            # GPU temp sensors
ipmitool delloem powermonitor                 # Dell power monitoring
```

## Server BMC & iLO Management

HP iLO, Dell iDRAC, Supermicro IPMI, Gigabyte BMC commands.

```bash
# HP iLO Commands
hponcfg                                       # iLO CLI tool
hponcfg -i                                    # Get iLO info
hponcfg -a | grep -i network                  # Network settings
hponcfg -r                                    # Reset iLO

# HP iLO via REST API (curl)
curl -k -u admin:password https://ilo-ip/redfish/v1/Systems/1
curl -k -u admin:password https://ilo-ip/redfish/v1/Systems/1 | jq '.PowerState'
curl -k -u admin:password -X POST -H 'Content-Type: application/json' \
  -d '{"ResetType": "On"}' \
  https://ilo-ip/redfish/v1/Systems/1/Actions/ComputerSystem.Reset

# Dell iDRAC Commands (racadm)
racadm getsysinfo                              # System info
racadm getniccfg                              # Network settings
racadm setniccfg -s 192.168.1.100 255.255.255.0 192.168.1.1
racadm racreset                                # Reset iDRAC
racadm serveraction powerup                    # Power on
racadm serveraction powerdown                  # Power off
racadm serveraction powerstatus                # Power status
racadm set iDRAC.Users.2.Password ""           # Clear password

# Dell iDRAC via IPMItool
ipmitool -I lanplus -H idrac-ip -U admin -P password mc info
ipmitool -I lanplus -H idrac-ip -U admin -P password power on
ipmitool -I lanplus -H idrac-ip -U admin -P password power off
ipmitool -I lanplus -H idrac-ip -U admin -P password power status

# Generic IPMI Commands
ipmitool mc info                               # BMC info
ipmitool lan print                             # Network config
ipmitool sensor list                           # All sensors
ipmitool sel list                              # System event log
ipmitool sel clear                             # Clear event log
ipmitool fru list                              # FRU info

# IPMI Power Control
ipmitool power on                              # Power on
ipmitool power off                             # Power off
ipmitool power cycle                           # Power cycle
ipmitool power status                          # Power status
ipmitool chassis status                        # Chassis status

# IPMI Serial Over LAN (SOL)
ipmitool -I lanplus -H ipmi-ip -U admin -P password sol activate
ipmitool -I lanplus -H ipmi-ip -U admin -P password sol deactivate

# Supermicro IPMI
ipmitool raw 0x30 0x45 0x01 0x01              # Full speed fans
ipmitool raw 0x30 0x45 0x01 0x00              # Optimal fans

# Redfish API (Universal)
curl -k -u admin:password https://bmc-ip/redfish/v1/
curl -k -u admin:password https://bmc-ip/redfish/v1/Systems/1
curl -k -u admin:password -X POST -H 'Content-Type: application/json' \
  -d '{"ResetType": "ForceRestart"}' \
  https://bmc-ip/redfish/v1/Systems/1/Actions/ComputerSystem.Reset

# BIOS Password Reset (Physical - varies by vendor)
# HP: Switch SW1 position 6, or remove CMOS battery
# Dell: PSWD jumper, or remove CMOS battery
# Supermicro: JPB1 jumper, or SW1 button
# Gigabyte: CLRTC jumper, or red CLR_CMOS button
# Always consult service manual first!

# Firewall for BMC/IPMI access
firewall-cmd --add-port=623/udp --permanent    # IPMI
firewall-cmd --add-port=443/tcp --permanent    # HTTPS
firewall-cmd --add-port=5900/tcp --permanent    # VNC/Console
firewall-cmd --reload
```

## Package Search & Downgrade

Advanced package management for Debian/Ubuntu and RHEL/CentOS.

```bash
# Debian/Ubuntu Package Search
apt search keyword                             # Basic search
apt search --names-only keyword                # Name only search
apt show package                               # Package details
apt-cache madison package                      # All versions
apt-cache policy package                       # Available versions
apt-file update                                # Update file database
apt-file search filename                       # Find package by file
apt list --installed | grep keyword            # Search installed
apt list --upgradable                          # Show upgradable

# RHEL/CentOS/Fedora Package Search
dnf search keyword                             # Basic search
dnf search --name-only keyword                 # Name only
dnf info package                               # Package details
dnf --showduplicates list package              # All versions
dnf provides /path/to/file                     # Find package by file
dnf provides command                           # Find package for command
dnf list installed | grep keyword              # Search installed
dnf repoquery --installed "*python*"           # Query installed

# Debian/Ubuntu Downgrade
apt-cache policy package                       # Check versions
apt install package=1.2.3-4ubuntu1             # Specific version
apt install aptitude                           # Install better tool
aptitude install package=version               # Downgrade with aptitude
apt-mark hold package                          # Prevent upgrades
apt-mark showhold                              # List held packages

# RHEL/CentOS/Fedora Downgrade
dnf --showduplicates list package              # Show versions
dnf downgrade package                          # Downgrade
dnf install package-1.2.3-4.el8                # Specific version
yum history list                               # View history
yum history undo <id>                          # Undo transaction
sudo dnf versionlock add package               # Lock version
sudo dnf versionlock list                      # List locked
echo "exclude=package" >> /etc/dnf/dnf.conf    # Exclude from updates
```
```
