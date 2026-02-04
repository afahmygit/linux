---
layout: category
title: Disk & Storage
icon: ti ti-device-hdd
color: #ff6b00
description: Disk management, filesystems, ZFS, LVM, and storage troubleshooting.
---

## Disk Management Basics

```bash
fdisk -l              # List all disk partitions
parted -l             # List partition tables
lsblk                 # List block devices
lsblk -f              # List with filesystems
df -h                 # Disk space usage (human-readable)
df -i                 # Inode usage
du -sh *              # Directory sizes
du -h --max-depth=1   # Directory sizes 1 level deep
```

## ZFS Management

### Pool Operations
```bash
zpool status          # Show pool status
zpool list            # List all pools
zpool iostat -v 1     # Pool I/O statistics
zpool scrub pool      # Start pool scrub
zpool export pool     # Export pool
zpool import pool     # Import pool
zpool destroy pool    # Destroy pool
```

### Dataset Operations
```bash
zfs list              # List all datasets
zfs list -t snapshot  # List snapshots
zfs create pool/ds    # Create dataset
zfs destroy pool/ds   # Destroy dataset
zfs set property=value pool/ds  # Set property
zfs get all pool/ds   # Get all properties
```

### Snapshots & Replication
```bash
zfs snapshot pool/ds@snapname     # Create snapshot
zfs list -t snapshot              # List snapshots
zfs rollback pool/ds@snapname     # Rollback to snapshot
zfs clone pool/ds@snap pool/clone # Clone snapshot
zfs send pool/ds@snap | zfs recv backup/ds  # Replicate
```

### Performance Tuning
```bash
zfs set compression=lz4 pool/ds           # Enable compression
zfs set atime=off pool/ds                 # Disable atime
zfs set primarycache=all pool/ds          # Set ARC cache
zfs set sync=disabled pool/ds             # Disable sync writes
zfs set recordsize=1M pool/ds             # Set record size
```

## LVM Management

### Physical Volumes
```bash
pvcreate /dev/sdb                # Create physical volume
pvdisplay                        # Display PV info
pvs                              # List PVs
pvremove /dev/sdb                # Remove PV
pvresize /dev/sdb                # Resize PV
```

### Volume Groups
```bash
vgcreate vg0 /dev/sdb            # Create volume group
vgdisplay                        # Display VG info
vgs                              # List VGs
vgextend vg0 /dev/sdc            # Add PV to VG
vgreduce vg0 /dev/sdc            # Remove PV from VG
```

### Logical Volumes
```bash
lvcreate -L 10G vg0 -n lv0       # Create 10G LV
lvdisplay                        # Display LV info
lvs                              # List LVs
lvextend -L +5G /dev/vg0/lv0     # Extend LV by 5G
lvreduce -L -5G /dev/vg0/lv0     # Reduce LV by 5G
lvremove /dev/vg0/lv0            # Remove LV
```

### Filesystem Resizing
```bash
# For ext3/ext4
resize2fs /dev/vg0/lv0           # Grow to max
resize2fs /dev/vg0/lv0 50G       # Set to 50G

# For XFS
xfs_growfs /mount                # Grow to max (cannot shrink)
```

## Btrfs Filesystem

```bash
mkfs.btrfs /dev/sda              # Create filesystem
btrfs filesystem show            # Show filesystem
btrfs filesystem df /mount       # Space usage
btrfs filesystem resize +10G /mount  # Resize
btrfs balance start /mount       # Balance chunks
```

## Common Scenarios

### Create a new ZFS pool with mirror
```bash
# Create mirrored pool
zpool create tank mirror sda sdb

# Add cache device
zpool add tank cache nvme0n1

# Add log device (ZIL)
zpool add tank log mirror nvme1n1 nvme2n1
```

### Extend an LVM logical volume
```bash
# Extend LV
lvextend -L +50G /dev/vg0/lv0

# Resize filesystem (ext4)
resize2fs /dev/vg0/lv0

# Or in one command (ext4)
lvextend -r -L +50G /dev/vg0/lv0
```

### Recover a failed disk in ZFS
```bash
# Identify failed disk
zpool status -v

# Replace failed disk
zpool replace tank /dev/sdX /dev/sdY

# Verify resilvering
zpool status
```

### Create automated ZFS snapshots
```bash
# Create snapshot with timestamp
DATE=$(date +%Y-%m-%d_%H:%M)
zfs snapshot -r tank@daily-$DATE

# Clean old snapshots (keep last 7)
zfs list -H -t snapshot -o name | \
    grep "tank@daily-" | head -n -7 | \
    xargs -r zfs destroy
```

### Check disk health
```bash
# SMART status
smartctl -a /dev/sda

# Check for bad blocks
badblocks -sv /dev/sda

# Disk I/O test
dd if=/dev/zero of=/tmp/test bs=1M count=1024 oflag=direct
```
