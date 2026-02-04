---
layout: category
title: Users & Permissions
icon: ti ti-users
color: #ae3ec9
description: User management, group management, and file permissions.
---

## User Management

```bash
useradd username               # Create new user
useradd -m -s /bin/bash user   # Create with home and shell
userdel username               # Delete user
userdel -r username            # Delete user + home dir
usermod -aG group user         # Add user to group
usermod -s /bin/zsh user       # Change user shell
passwd username                # Change password
passwd -l username             # Lock password
passwd -u username             # Unlock password
chage -l username              # Password expiry info
chage -M 90 username           # Set max password age
```

## Group Management

```bash
groupadd groupname             # Create new group
groupdel groupname             # Delete group
groupmod -n newname oldname    # Rename group
gpasswd -a user group          # Add user to group
gpasswd -d user group          # Remove user from group
groups username                # Show user groups
id username                    # Show user/group IDs
```

## File Permissions

```bash
chmod 755 file                 # rwxr-xr-x
chmod 644 file                 # rw-r--r--
chmod +x file                  # Make executable
chmod -R g+w dir               # Recursive group write
chmod u+s file                 # Set SUID
chmod g+s file                 # Set SGID
```

## Permission Numeric Reference
```
7 = rwx (read, write, execute)
6 = rw- (read, write)
5 = r-x (read, execute)
4 = r-- (read only)
0 = --- (no permission)

Owner | Group | Others
------|-------|-------
rwx   | r-x   | r-x
7     | 5     | 5
```

## Ownership

```bash
chown user file                # Change owner
chown user:group file          # Change owner and group
chown -R user /path            # Recursive owner change
chgrp group file               # Change group
chown -R user:group /path      # Recursive both
```

## Access Control Lists (ACL)

```bash
getfacl file                   # View ACL
setfacl -m u:user:rw file     # Add user ACL
setfacl -m g:group:rx file    # Add group ACL
setfacl -x u:user file         # Remove ACL
setfacl -R -m u:user:rx dir   # Recursive ACL
```

## Special Attributes

```bash
chattr +i file                 # Make immutable
chattr -i file                 # Remove immutable
chattr +a file                 # Append only
lsattr file                    # List attributes
```

## Sudo Management

```bash
visudo                         # Edit sudoers file
sudo -u user command           # Run as specific user
sudo -i                        # Interactive root shell
sudo -l                        # List sudo permissions
```

## Common Scenarios

### Add a new user with sudo access
```bash
# Create user with home
useradd -m -s /bin/bash newuser

# Set password
passwd newuser

# Add to sudo group (Ubuntu/Debian)
usermod -aG sudo newuser

# Or for RHEL/CentOS
usermod -aG wheel newuser
```

### Fix permission issues on web directory
```bash
# Set ownership to web user
chown -R www-data:www-data /var/www

# Set proper permissions
find /var/www -type d -exec chmod 755 {} \;
find /var/www -type f -exec chmod 644 {} \;
```

### Grant user read-only access to directory
```bash
# Add to group
usermod -aG readonly username

# Set group ownership
chgrp -R readonly /path/to/dir

# Set permissions
chmod -R 750 /path/to/dir

# Or use ACL for single user
setfacl -R -m u:username:rx /path/to/dir
```

### Create a shared directory for group
```bash
# Create directory
mkdir /shared

# Set group ownership
chgrp developers /shared

# Set permissions with SGID
chmod 2770 /shared

# Now all new files inherit group
```

### Find files with SUID/SGID bits
```bash
# Find SUID files
find / -perm -4000 -type f 2>/dev/null

# Find SGID files
find / -perm -2000 -type f 2>/dev/null

# Find both
find / \( -perm -4000 -o -perm -2000 \) -type f 2>/dev/null
```

### Lock/unlock user account
```bash
# Lock user
passwd -l username
usermod -L username

# Unlock user
passwd -u username
usermod -U username

# Check status
passwd -S username
```

### View who is currently logged in
```bash
w               # Who is logged in and what they're doing
who             # Who is logged in
whoami          # Current user
id              # Current user ID and groups
last            # Last logged in users
lastlog         # Last login for all users
```
