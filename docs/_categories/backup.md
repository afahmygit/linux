---
layout: category
title: Backup & Recovery
icon: ti ti-copy
color: #3b82f6
description: Backup strategies, restore procedures, and disaster recovery.
---

## Basic Backup Commands

```bash
tar -czf backup.tar.gz /path/to/dir    # Create tar.gz backup
tar -xzf backup.tar.gz                 # Extract backup
tar -czf - /path | ssh user@host "cat > backup.tar.gz"  # Backup over SSH
rsync -av /src/ /dst/                  # Copy with rsync
rsync -avz --delete /src/ /dst/        # Mirror with delete
```

## Rsync Backup Options

```bash
rsync -av /src/ user@host:/dst/        # Remote backup
rsync -avz -e ssh /src/ user@host:/dst/  # With SSH
rsync -av --progress /src/ /dst/       # Show progress
rsync -av --partial /src/ /dst/        # Resume interrupted
rsync -av --exclude '*.log' /src/ /dst/  # Exclude files
rsync -av --backup --backup-dir=/old /src/ /dst/  # Keep old files
```

## ZFS Backup & Replication

```bash
# Create snapshot
zfs snapshot pool/dataset@backup-$(date +%Y%m%d)

# List snapshots
zfs list -t snapshot

# Send snapshot (full)
zfs send pool/dataset@snap | zfs recv backup/dataset

# Incremental backup
zfs send -i pool/dataset@oldsnap pool/dataset@newsnap | zfs recv backup/dataset

# Compressed send
zfs send pool/dataset@snap | gzip > backup.gz
gunzip -c backup.gz | zfs recv backup/dataset
```

## MySQL Backup

```bash
# Full backup
mysqldump -u root -p database > backup.sql

# All databases
mysqldump -u root -p --all-databases > all.sql

# Compressed backup
mysqldump -u root -p database | gzip > backup.sql.gz

# Restore
mysql -u root -p database < backup.sql
gunzip -c backup.sql.gz | mysql -u root -p database
```

## PostgreSQL Backup

```bash
# Full backup
pg_dump database > backup.sql

# Custom format (compressed)
pg_dump -Fc database > backup.dump

# All databases
pg_dumpall > all.sql

# Restore
psql database < backup.sql
pg_restore -d database backup.dump
```

## LVM Backup

```bash
# Create snapshot
lvcreate -L 10G -s -n snap /dev/vg0/lv0

# Mount snapshot
mount /dev/vg0/snap /mnt

# Backup from snapshot
tar -czf backup.tar.gz /mnt

# Remove snapshot
umount /mnt
lvremove /dev/vg0/snap
```

## Bare Metal Backup

```bash
# Clone disk
dd if=/dev/sda of=/dev/sdb bs=4M status=progress

# Create disk image
dd if=/dev/sda of=backup.img bs=4M status=progress

# Compressed image
dd if=/dev/sda | gzip > backup.img.gz

# Restore
gzip -dc backup.img.gz | dd of=/dev/sda
```

## System Backup

```bash
# Using rsync for full system
rsync -aAXv / --exclude={"/dev/*","/proc/*","/sys/*","/tmp/*","/run/*","/mnt/*","/media/*","/lost+found"} /mnt/backup

# Using tar
tar -czpf /mnt/backup/full-backup-$(date +%Y%m%d).tar.gz --exclude=/mnt --exclude=/proc --exclude=/sys --exclude=/dev /
```

## Common Scenarios

### Automated daily backup with rsync
```bash
#!/bin/bash
# Backup script with rotation

SOURCE="/data"
DEST="/backup"
DATE=$(date +%Y%m%d)
RETENTION=7

# Create backup
rsync -av --delete "$SOURCE/" "$DEST/current/"

# Create snapshot
cp -al "$DEST/current" "$DEST/$DATE"

# Remove old backups
find "$DEST" -maxdepth 1 -type d -mtime +$RETENTION -exec rm -rf {} \;
```

### ZFS automated backup script
```bash
#!/bin/bash
# ZFS snapshot and replication

POOL="tank"
BACKUP_POOL="backup"
DATASET="data"

# Create snapshot
DATE=$(date +%Y%m%d_%H%M)
zfs snapshot -r $POOL/$DATASET@$DATE

# Replicate to backup
zfs send -R $POOL/$DATASET@$DATE | zfs recv -F $BACKUP_POOL/$DATASET

# Clean old snapshots (keep 7 daily)
zfs list -H -t snapshot -o name | \
    grep "$POOL/$DATASET@" | \
    sort | \
    head -n -7 | \
    xargs -r zfs destroy
```

### MySQL automated backup with retention
```bash
#!/bin/bash
# MySQL backup with rotation

BACKUP_DIR="/backups/mysql"
RETENTION_DAYS=30
DATE=$(date +%Y%m%d_%H%M%S)

# Create backup directory
mkdir -p "$BACKUP_DIR"

# Backup all databases
mysqldump --all-databases | gzip > "$BACKUP_DIR/all_$DATE.sql.gz"

# Remove old backups
find "$BACKUP_DIR" -name "*.sql.gz" -mtime +$RETENTION_DAYS -delete

# Log backup
echo "Backup completed: $DATE" >> /var/log/mysql_backup.log
```

### Backup to remote server
```bash
# Using rsync over SSH
rsync -avz -e ssh /data/ user@remote:/backup/

# Using tar over SSH
tar -czf - /data | ssh user@remote "cat > /backup/data.tar.gz"

# Using rsync with bandwidth limit
rsync -avz --bwlimit=10000 /data/ user@remote:/backup/
```

### Disaster recovery: Restore from ZFS snapshot
```bash
# List snapshots
zfs list -t snapshot -r pool/dataset

# Rollback to snapshot
zfs rollback pool/dataset@backup-20240101

# Or clone snapshot for testing
zfs clone pool/dataset@backup-20240101 pool/dataset_test

# Mount and verify
zfs mount pool/dataset_test
```

### Bare metal disaster recovery
```bash
# Boot from live CD/USB

# Partition disk (same as original)
fdisk /dev/sda

# Create filesystems
mkfs.ext4 /dev/sda1
mkfs.ext4 /dev/sda2

# Mount and restore
mount /dev/sda1 /mnt
tar -xzf /path/to/backup.tar.gz -C /mnt

# Install bootloader
chroot /mnt
grub-install /dev/sda
update-grub
```

### Incremental backup with hard links
```bash
#!/bin/bash
# Backup with hardlinks (rsnapshot-style)

SOURCE="/data"
DEST="/backup"
DATE=$(date +%Y%m%d)
CURRENT="$DEST/current"
NEW="$DEST/$DATE"

# First backup
if [ ! -d "$CURRENT" ]; then
    rsync -av "$SOURCE/" "$CURRENT/"
else
    # Incremental with hardlinks
    cp -al "$CURRENT" "$NEW"
    rsync -av --delete "$SOURCE/" "$NEW/"
fi
```

### Cloud backup to AWS S3
```bash
# Using AWS CLI
aws s3 sync /data s3://bucket/path/

# Using rclone
rclone sync /data remote:bucket/path/

# Scheduled backup with cron
0 2 * * * /usr/local/bin/backup-to-s3.sh
```

### Restore single table from MySQL backup
```bash
# Extract single database from full backup
sed -n '/^-- Current Database: `mydb`/,/^-- Current Database: `/p' all.sql > mydb.sql

# Extract single table (with awk)
awk '/CREATE TABLE.*mytable/,/UNLOCK TABLES/' mydb.sql > mytable.sql

# Restore
mysql mydb < mytable.sql
```

### Backup verification
```bash
#!/bin/bash
# Verify backup integrity

BACKUP_FILE="/backup/data.tar.gz"

# Check if file exists
if [ ! -f "$BACKUP_FILE" ]; then
    echo "Backup file not found!"
    exit 1
fi

# Verify archive integrity
tar -tzf "$BACKUP_FILE" > /dev/null
if [ $? -eq 0 ]; then
    echo "Backup is valid"
else
    echo "Backup is corrupted!"
    exit 1
fi

# Check file size
SIZE=$(du -h "$BACKUP_FILE" | cut -f1)
echo "Backup size: $SIZE"
```
