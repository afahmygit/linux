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

## Package Search - Advanced

### Debian/Ubuntu Package Search

```bash
# Basic search
apt search keyword
apt-cache search keyword

# Search package names only
apt search --names-only keyword

# Search with detailed info
apt show package
apt-cache show package

# Show all available versions
apt-cache madison package
apt-cache policy package

# Search by installed packages
apt list --installed | grep keyword
apt list --installed | grep -i python

# Search upgradable packages
apt list --upgradable

# Search for package that provides a file
apt-file update  # Update database first
apt-file search filename
apt-file find /path/to/file

# Search package contents
apt-file list package

# Search by maintainer
apt-cache search "Maintainer:.*debian"

# Search by section/category
apt-cache search ~ndevelopment  # Development packages
apt-cache search ~nweb          # Web packages
apt-cache search ~pgame         # Games
```

### RHEL/CentOS/Fedora Package Search

```bash
# Basic search
dnf search keyword
yum search keyword

# Search package names only
dnf search --name-only keyword

# Show package details
dnf info package
yum info package

# List all versions
dnf --showduplicates list package

# Search installed packages
dnf list installed | grep keyword
dnf repoquery --installed --queryformat "%{NAME} - %{VERSION}" | grep keyword

# Search available packages
dnf list available
dnf available

# Search what provides a file/command
dnf provides /path/to/file
dnf provides command
yum whatprovides "*bin/command"

# Search by architecture
dnf list available | grep ".x86_64"
dnf list available | grep ".noarch"

# Search by group
dnf group list
dnf group info "Development Tools"

# Search repositories
dnf repolist
dnf repolist all

# Search specific repo
dnf --enablerepo=epel search keyword
```

## Package Downgrade

### Debian/Ubuntu Downgrade Methods

```bash
# Method 1: Install specific version (most common)
# First, check available versions
apt-cache policy package
apt-cache madison package

# Downgrade to specific version
sudo apt install package=1.2.3-4ubuntu1

# If version not in current repo, check older releases
# Edit /etc/apt/sources.list to add old release
sudo apt-cache policy package  # Check available versions from all repos

# Method 2: Using aptitude (better dependency resolution)
sudo apt install aptitude
sudo aptitude install package=version

# Method 3: From snapshot repository
# Add snapshot repo for Ubuntu
echo "deb http://snapshot.debian.org/archive/ubuntu/20230101T000000Z/ $(lsb_release -sc) main" | sudo tee /etc/apt/sources.list.d/snapshot.list
sudo apt update
sudo apt install package=version

# Method 4: Download and install specific .deb
wget http://archive.ubuntu.com/ubuntu/pool/main/p/package/package_version.deb
sudo dpkg -i package_version.deb

# Method 5: Pin specific version to prevent upgrades
cat << EOF | sudo tee /etc/apt/preferences.d/package-pin
Package: package
Pin: version 1.2.3-4ubuntu1
Pin-Priority: 1001
EOF

# Hold package at current version
sudo apt-mark hold package
sudo apt-mark unhold package  # Unhold
apt-mark showhold  # List held packages
```

### RHEL/CentOS/Fedora Downgrade Methods

```bash
# Method 1: Using dnf downgrade (RHEL 8+/Fedora)
sudo dnf downgrade package

# Method 2: Install specific version
# List available versions
dnf --showduplicates list package
yum --showduplicate list package

# Install specific version
sudo dnf install package-1.2.3-4.el8
sudo yum install package-1.2.3-4.el7

# Method 3: Using yum history (RHEL 7/CentOS 7)
# View history
yum history list
yum history info <transaction_id>

# Undo specific transaction
sudo yum history undo <transaction_id>

# Method 4: From local RPM cache or repo
# Install from DNF cache
sudo dnf install /var/cache/dnf/*/packages/package-version.rpm

# Download and install specific version
sudo dnf download --resolve package-1.2.3
sudo dnf install ./package-1.2.3.rpm

# Method 5: Using yum versionlock (RHEL 7/CentOS 7)
# Install plugin
sudo yum install yum-plugin-versionlock

# Lock package version
sudo yum versionlock add package
sudo yum versionlock delete package
yum versionlock list

# Method 6: Exclude from updates (RHEL 8+/Fedora)
echo "exclude=package" | sudo tee -a /etc/dnf/dnf.conf

# Or using DNF modules
sudo dnf module reset package
sudo dnf module enable package:stream
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

### Search package by keyword across all repos
```bash
# Debian/Ubuntu - detailed search
apt-cache search "web server"
apt-cache search "^python3-"  # Regex search
apt-cache search ~npython ~sweb  # Python web packages

# RHEL/CentOS - detailed search
dnf search python development
dnf repoquery --queryformat "%{NAME}" "*python*"
dnf provides "*libssl*"

# Search by description
dnf search --all "web server"
yum search all "database"
```

### Search for package that provides specific command
```bash
# Debian/Ubuntu
apt-file update
apt-file search curl
apt-file find /usr/bin/git

# What package owns installed file
dpkg -S /usr/bin/python3

# RHEL/CentOS
dnf provides /usr/bin/git
yum whatprovides "*curl"
dnf provides "command(not found)"

# Find what package provides shared library
dnf provides libssl.so.1.1
yum whatprovides libssl.so.10
```

### Downgrade to previous version
```bash
# Debian/Ubuntu - Easy downgrade
sudo apt install package=1.0.0-1  # Specific version
# Find version with: apt-cache policy package

# RHEL/CentOS - Easy downgrade
sudo dnf downgrade package
sudo yum downgrade package

# If downgrade fails due to dependencies
# Debian/Ubuntu
sudo aptitude install package=version  # Better handling

# RHEL/CentOS - with dependencies
sudo dnf downgrade --allowerasing package
```

### Prevent package from being upgraded
```bash
# Debian/Ubuntu
sudo apt-mark hold package
echo "package hold" | sudo dpkg --set-selections

# Check held packages
apt-mark showhold
dpkg --get-selections | grep hold

# RHEL/CentOS
sudo dnf versionlock add package
echo "exclude=package" | sudo tee -a /etc/dnf/dnf.conf

# Check versionlock
sudo dnf versionlock list
sudo dnf versionlock delete package
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
