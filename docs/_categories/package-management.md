---
layout: category
title: Package Management
icon: ti ti-package
color: #10b981
description: Package managers for Debian/Ubuntu, RHEL/CentOS, and SUSE systems.
---

## Debian/Ubuntu (APT)

```bash
apt update                    # Update package list
apt upgrade                   # Upgrade packages
apt full-upgrade             # Full upgrade with dependencies
apt install package          # Install package
apt remove package           # Remove package
apt purge package            # Remove with config
apt autoremove               # Remove unused packages
apt clean                    # Clear cache
apt autoclean                # Clear old cache
```

## APT Advanced

```bash
apt show package             # Package details
apt search keyword           # Search packages
apt list --installed         # List installed
apt list --upgradable        # List upgradable
apt edit-sources             # Edit sources
apt-cache policy package     # Package policy
apt-cache depends package    # Show dependencies
apt-get source package       # Download source
```

## RHEL/CentOS/Fedora (DNF/YUM)

```bash
dnf update                   # Update packages
dnf upgrade                 # Upgrade packages
dnf install package         # Install package
dnf remove package          # Remove package
dnf list installed          # List installed
dnf list available          # List available
dnf search keyword          # Search packages
dnf info package            # Package info
```

## YUM Legacy (CentOS 7)

```bash
yum update                   # Update packages
yum install package          # Install package
yum remove package           # Remove package
yum list installed           # List installed
yum search keyword           # Search packages
```

## SUSE (Zypper)

```bash
zypper refresh               # Refresh repos
zypper update                # Update packages
zypper install package       # Install package
zypper remove package        # Remove package
zypper search keyword        # Search packages
zypper info package          # Package info
zypper pa -i                 # List installed
```

## Arch Linux (pacman)

```bash
pacman -Syu                  # Sync and upgrade
pacman -S package            # Install package
pacman -R package            # Remove package
pacman -Rs package           # Remove with deps
pacman -Qs keyword           # Search installed
pacman -Ss keyword           # Search repos
pacman -Qi package           # Package info
```

## Snap Packages

```bash
snap install package         # Install snap
snap remove package          # Remove snap
snap list                   # List snaps
snap refresh                 # Refresh snaps
snap find keyword            # Search snaps
```

## Flatpak

```bash
flatpak install package      # Install flatpak
flatpak update package       # Update flatpak
flatpak uninstall package    # Remove flatpak
flatpak list                 # List installed
flatpak search keyword       # Search packages
```

## AppImage

```bash
# Download and make executable
wget app.appimage
chmod +x app.appimage
./app.appimage               # Run

# Or integrate with system
appimaged                    # Daemon for AppImages
```

## Common Scenarios

### Fix broken packages on Debian/Ubuntu
```bash
# Fix broken dependencies
sudo dpkg --configure -a
sudo apt install -f

# Clean and update
sudo apt clean
sudo apt update
sudo apt full-upgrade

# Remove package locks
sudo rm /var/lib/apt/lists/lock
sudo rm /var/cache/apt/archives/lock
sudo rm /var/lib/dpkg/lock
```

### Search for specific package
```bash
# Debian/Ubuntu
apt search nginx
apt-cache search nginx
apt-cache madison nginx      # Show all versions

# RHEL/CentOS
dnf search nginx
yum search nginx

# SUSE
zypper search nginx
```

### Install package from specific repo
```bash
# Using yum/dnf with enablerepo
dnf --enablerepo=epel install package
yum --enablerepo=remi-php install php

# Using apt with pinning
apt install -t testing package
```

### Downgrade package
```bash
# Debian/Ubuntu
apt install package=version
apt-cache policy package      # Check available versions

# RHEL/CentOS
dnf downgrade package
yum downgrade package

# Or install specific version
dnf install package-version
```

### Add repository on Debian/Ubuntu
```bash
# Add PPA
add-apt-repository ppa:user/repo
apt update

# Manually add repo
echo "deb http://archive.ubuntu.com/ubuntu/ $(lsb_release -sc) main" | sudo tee /etc/apt/sources.list.d/custom.list
wget -qO - https://example.com/key.gpg | sudo apt-key add -
apt update
```

### Add repository on RHEL/CentOS
```bash
# EPEL repo
dnf install epel-release

# Add custom repo
cat > /etc/yum.repos.d/custom.repo << EOF
[custom]
name=Custom Repo
baseurl=http://example.com/repo/
enabled=1
gpgcheck=0
EOF

dnf update
```

### Hold package from updates
```bash
# Debian/Ubuntu
apt-mark hold package
apt-mark unhold package

# List held packages
apt-mark showhold

# RHEL/CentOS
echo "exclude=package" >> /etc/yum.conf
```

### Clean up old packages
```bash
# Debian/Ubuntu
apt autoremove
apt autoclean
apt clean

# RHEL/CentOS
dnf autoremove
dnf clean all

# Remove orphaned packages
deborphan | xargs apt remove -y  # Debian
```

### Install .deb file
```bash
# Using dpkg
sudo dpkg -i package.deb
sudo apt install -f  # Fix dependencies

# Using apt (recommended)
sudo apt install ./package.deb
```

### Install .rpm file
```bash
# Using rpm
sudo rpm -i package.rpm

# Using dnf/yum (better dependency handling)
sudo dnf install ./package.rpm
sudo yum localinstall package.rpm
```

### Find which package owns a file
```bash
# Debian/Ubuntu
dpkg -S /path/to/file
apt-file search filename  # Requires apt-file update

# RHEL/CentOS
yum whatprovides /path/to/file
dnf provides /path/to/file

# Find which command belongs to
dnf provides command
```

### List all files installed by package
```bash
# Debian/Ubuntu
dpkg -L package

# RHEL/CentOS
rpm -ql package
dnf repoquery -l package
```
