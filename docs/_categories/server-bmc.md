---
layout: category
title: Server BMC & iLO
icon: ti ti-server-2
color: #0066cc
description: Server BMC management - HP iLO, Dell iDRAC, Supermicro IPMI, Gigabyte IPMI, BIOS password reset.
---

## HP iLO (Integrated Lights-Out)

### iLO CLI via hponcfg

```bash
# Check iLO status
hponcfg

# Get iLO info
hponcfg -i

# Get iLO network settings
hponcfg -a | grep -i network

# Reset iLO
hponcfg -r

# Get iLO firmware version
hponcfg -g

# Update iLO firmware
hponcfg -f ilo_firmware.bin
```

### iLO via curl/REST API

```bash
# Get iLO system info
curl -k -u admin:password https://ilo-ip-address/redfish/v1/Systems/1

# Get power state
curl -k -u admin:password https://ilo-ip-address/redfish/v1/Systems/1 | jq '.PowerState'

# Power on server
curl -k -u admin:password -X POST -H 'Content-Type: application/json' \
  -d '{"Action": "Reset", "ResetType": "On"}' \
  https://ilo-ip-address/redfish/v1/Systems/1/Actions/ComputerSystem.Reset

# Power off server (force)
curl -k -u admin:password -X POST -H 'Content-Type: application/json' \
  -d '{"Action": "Reset", "ResetType": "ForceOff"}' \
  https://ilo-ip-address/redfish/v1/Systems/1/Actions/ComputerSystem.Reset

# Graceful shutdown
curl -k -u admin:password -X POST -H 'Content-Type: application/json' \
  -d '{"Action": "Reset", "ResetType": "GracefulShutdown"}' \
  https://ilo-ip-address/redfish/v1/Systems/1/Actions/ComputerSystem.Reset

# Restart server
curl -k -u admin:password -X POST -H 'Content-Type: application/json' \
  -d '{"Action": "Reset", "ResetType": "ForceRestart"}' \
  https://ilo-ip-address/redfish/v1/Systems/1/Actions/ComputerSystem.Reset
```

### HP iLO BIOS Password Reset

```bash
# Method 1: Using hponcfg (requires iLO access)
hponcfg -i << EOF
<ribcl VERSION="2.0">
  <login USER_LOGIN="admin" PASSWORD="current_password">
    <rib_info MODE="WRITE">
      <mod_global_settings>
        <reset_bios_password value="yes"/>
      </mod_global_settings>
    </rib_info>
  </login>
</ribcl>
EOF

# Method 2: Via iLO web interface
# 1. Access iLO web interface (https://ilo-ip-address)
# 2. Navigate to Administration > BIOS/Configuration
# 3. Look for "Reset BIOS Password" option
# 4. May require iLO administrator credentials

# Method 3: Physical access - Clear CMOS
# For HP ProLiant servers:
# - Locate the system maintenance switch (usually SW1)
# - Switch position 6 to ON for 10 seconds
# - Return switch to OFF position
# - Power on server

# Method 4: Remove CMOS battery
# - Power off server and disconnect power cord
# - Locate CMOS battery (CR2032 usually)
# - Remove battery for 30+ seconds
# - Reinstall battery and power on
```

### iLO User Management

```bash
# Add iLO user via hponcfg
hponcfg -i << EOF
<ribcl VERSION="2.0">
  <login USER_LOGIN="admin" PASSWORD="password">
    <user_info MODE="WRITE">
      <add_user>
        <user_login>newuser</user_login>
        <user_password>newpassword</user_password>
        <admin_privilege>yes</admin_privilege>
        <remote_cons_privilege>yes</remote_cons_privilege>
        <reset_server_privilege>yes</reset_server_privilege>
        <virtual_media_privilege>yes</virtual_media_privilege>
      </add_user>
    </user_info>
  </login>
</ribcl>
EOF

# List iLO users
hponcfg -i << EOF
<ribcl VERSION="2.0">
  <login USER_LOGIN="admin" PASSWORD="password">
    <user_info MODE="READ">
    </user_info>
  </login>
</ribcl>
EOF
```

### iLO Network Configuration

```bash
# Set iLO IP via hponcfg
hponcfg -i << EOF
<ribcl VERSION="2.0">
  <login USER_LOGIN="admin" PASSWORD="password">
    <rib_info MODE="WRITE">
      <mod_network_settings>
        <ip_address>192.168.1.100</ip_address>
        <subnet_mask>255.255.255.0</subnet_mask>
        <gateway_ip>192.168.1.1</gateway_ip>
      </mod_network_settings>
    </rib_info>
  </login>
</ribcl>
EOF

# Set iLO DHCP
hponcfg -i << EOF
<ribcl VERSION="2.0">
  <login USER_LOGIN="admin" PASSWORD="password">
    <rib_info MODE="WRITE">
      <mod_network_settings>
        <dhcp_enable>YES</dhcp_enable>
      </mod_network_settings>
    </rib_info>
  </login>
</ribcl>
EOF
```

### iLO Health & Monitoring

```bash
# Get system health
curl -k -u admin:password https://ilo-ip-address/redfish/v1/Systems/1 | \
  jq '.Status.Health'

# Get temperature info
curl -k -u admin:password https://ilo-ip-address/redfish/v1/Chassis/1/Thermal

# Get power info
curl -k -u admin:password https://ilo-ip-address/redfish/v1/Chassis/1/Power

# Get fan info
curl -k -u admin:password https://ilo-ip-address/redfish/v1/Chassis/1/Thermal | \
  jq '.Fans'

# Get memory info
curl -k -u admin:password https://ilo-ip-address/redfish/v1/Systems/1/Memory

# Get processor info
curl -k -u admin:password https://ilo-ip-address/redfish/v1/Systems/1/Processors

# Get BIOS version
curl -k -u admin:password https://ilo-ip-address/redfish/v1/Systems/1/Bios

# Get iLO self-test results
curl -k -u admin:password https://ilo-ip-address/redfish/v1/Managers/1/SelfTestResults
```

---

## Dell iDRAC (Integrated Dell Remote Access Controller)

### iDRAC via racadm

```bash
# Get iDRAC info
racadm getsysinfo

# Get iDRAC network settings
racadm getniccfg

# Set iDRAC IP
racadm setniccfg -s 192.168.1.100 255.255.255.0 192.168.1.1

# Reset iDRAC
racadm racreset

# Hard reset iDRAC
racadm racreset hard

# Get iDRAC firmware version
racadm getsvctag
racadm get iDRAC.FirmwareVersion

# Update iDRAC firmware
racadm firmwareupdate -f update.d6
```

### iDRAC Power Control

```bash
# Power on server
racadm serveraction powerup

# Power off server (graceful)
racadm serveraction powerdown

# Force power off
racadm serveraction powercycle

# Hard reset
racadm serveraction hardreset

# Graceful shutdown
racadm serveraction graceshutdown

# Get power status
racadm serveraction powerstatus

# Power status (detailed)
racadm get System.Power.State
```

### Dell iDRAC BIOS Password Reset

```bash
# Method 1: Via racadm (requires iDRAC access)
racadm set iDRAC.Users.2.Password ""  # Clear user password
racadm set iDRAC.Users.2.Password "newpassword"  # Set new password

# Method 2: Reset BIOS password via iDRAC
racadm set BIOS.SysPassword ""  # Clear BIOS password

# Method 3: Export/import BIOS config (bypass password)
# Export config (may work without BIOS password)
racadm export -f backup.ini

# Import config to reset settings
racadm import -f backup.ini

# Method 4: Via iDRAC web interface
# 1. Access iDRAC (https://idrac-ip-address)
# 2. Go to iDRAC Settings > System BIOS
# 3. Select "Reset BIOS Settings" or "Load Defaults"
# 4. May prompt for iDRAC admin password (not BIOS password)

# Method 5: Physical access - Clear CMOS on Dell servers
# Dell PowerEdge servers:
# - Locate password jumper (usually PSWD)
# - Move jumper from pins 1-2 to pins 2-3
# - Wait 10 seconds
# - Return jumper to pins 1-2
# Alternative: Remove CMOS battery for 30+ seconds

# Method 6: Dell PSWD jumper (varies by model)
# On some Dell servers, there's a dedicated password clear jumper:
# - Power off server
# - Locate PSWD jumper on motherboard
# - Remove jumper cap
# - Power on server (BIOS password cleared)
# - Power off and replace jumper cap
```

### iDRAC User Management

```bash
# List users
racadm get iDRAC.Users

# Add user
racadm set iDRAC.Users.2.UserName "newuser"
racadm set iDRAC.Users.2.Password "newpassword"
racadm set iDRAC.Users.2.Privilege 0x1ff  # Full privileges

# Delete user
racadm set iDRAC.Users.2.UserName ""
racadm set iDRAC.Users.2.Password ""

# Enable/disable user
racadm set iDRAC.Users.2.Enable "Enabled"
racadm set iDRAC.Users.2.Enable "Disabled"
```

### iDRAC via IPMItool

```bash
# Check BMC info
ipmitool -I lanplus -H idrac-ip -U admin -P password mc info

# Power on
ipmitool -I lanplus -H idrac-ip -U admin -P password power on

# Power off
ipmitool -I lanplus -H idrac-ip -U admin -P password power off

# Power cycle
ipmitool -I lanplus -H idrac-ip -U admin -P password power cycle

# Power status
ipmitool -I lanplus -H idrac-ip -U admin -P password power status

# Reset BMC
ipmitool -I lanplus -H idrac-ip -U admin -P password mc reset cold

# Get sensor list
ipmitool -I lanplus -H idrac-ip -U admin -P password sensor list

# Get FRU info
ipmitool -I lanplus -H idrac-ip -U admin -P password fru list

# Get SEL (System Event Log)
ipmitool -I lanplus -H idrac-ip -U admin -P password sel list

# Clear SEL
ipmitool -I lanplus -H idrac-ip -U admin -P password sel clear
```

### iDRAC via Redfish API

```bash
# Get system info
curl -k -u root:password https://idrac-ip/redfish/v1/Systems/System.Embedded.1

# Power on
curl -k -u root:password -X POST \
  -H 'Content-Type: application/json' \
  -d '{"ResetType": "On"}' \
  https://idrac-ip/redfish/v1/Systems/System.Embedded.1/Actions/ComputerSystem.Reset

# Power off
curl -k -u root:password -X POST \
  -H 'Content-Type: application/json' \
  -d '{"ResetType": "ForceOff"}' \
  https://idrac-ip/redfish/v1/Systems/System.Embedded.1/Actions/ComputerSystem.Reset

# Get BMC info
curl -k -u root:password https://idrac-ip/redfish/v1/Managers/iDRAC.Embedded.1

# Reset iDRAC
curl -k -u root:password -X POST \
  -H 'Content-Type: application/json' \
  -d '{"ResetType": "GracefulRestart"}' \
  https://idrac-ip/redfish/v1/Managers/iDRAC.Embedded.1/Actions/Manager.Reset
```

---

## Supermicro IPMI

### Basic IPMI Commands

```bash
# Get BMC info
ipmitool mc info

# Get BMC device ID
ipmitool mc info

# Reset BMC (cold)
ipmitool mc reset cold

# Reset BMC (warm)
ipmitool mc reset warm

# Get LAN info
ipmitool lan print

# Set LAN IP
ipmitool lan set 1 ipaddr 192.168.1.100
ipmitool lan set 1 netmask 255.255.255.0
ipmitool lan set 1 defgw ipaddr 192.168.1.1

# Get user list
ipmitool user list 1

# Get channel info
ipmitool channel info 1
```

### Supermicro IPMI Power Control

```bash
# Power on
ipmitool power on

# Power off
ipmitool power off

# Power cycle
ipmitool power cycle

# Power reset (hard reset)
ipmitool power reset

# Power status
ipmitool power status

# Soft shutdown (ACPI)
ipmitool chassis power soft

# Get chassis status
ipmitool chassis status
```

### Supermicro BIOS Password Reset

```bash
# Method 1: Via IPMI (Supermicro specific)
# Some Supermicro boards support BIOS password reset via IPMI
ipmitool raw 0x3a 0x01  # Attempts BMC reset, may affect BIOS

# Method 2: Via Supermicro IPMI view
# 1. Access IPMI web interface (https://ipmi-ip)
# 2. Go to Maintenance > BIOS Reset
# 3. Select "Reset BIOS to Factory Defaults"
# 4. Apply changes

# Method 3: Physical access - Clear CMOS (Supermicro boards)
# Location varies by board model:

# X9/X10/X11 series:
# - Locate jumper JPB1 or "CMOS Clear" jumper
# - Move jumper from pins 1-2 to pins 2-3
# - Wait 10 seconds, return to pins 1-2

# Alternatively (common on most Supermicro boards):
# - Power off server
# - Locate SW1 or "CMOS Clear" button/jumper near battery
# - Press and hold for 10+ seconds (if button)
# - Or move jumper, wait 10 seconds, return to original position

# Method 4: Remove CMOS battery
# - Power off and unplug server
# - Locate CR2032 battery near bottom edge
# - Remove battery for 30-60 seconds
# - Reinstall battery and power on

# Method 5: Via IPMI raw commands (model-specific)
# Some Supermicro boards support these commands:
ipmitool raw 0x06 0x40  # May trigger BIOS reset on some models
ipmitool raw 0x0a 0x45 0x01  # Another model-specific command

# Method 6: Use supermicroCfg utility
# Supermicro provides Windows/Linux tools
supermicroCfg /resetbios  # Reset BIOS to defaults
```

### Supermicro User Management

```bash
# Set user password
ipmitool user set password 2 newpassword

# Set username
ipmitool user set name 2 newuser

# Enable user
ipmitool user enable 2

# Get user info
ipmitool user list 1

# Set user privilege (2=User, 4=Operator, 5=Admin)
ipmitool user priv 2 4 1
```

### Supermicro IPMI via Web Interface

```bash
# Default Supermicro IPMI credentials:
# Username: ADMIN
# Password: ADMIN
# (Check manual, varies by firmware version)

# Access via browser:
https://ipmi-ip-address

# Common paths:
# - System > BIOS > Reset BIOS
# - Maintenance > Unit Maintenance > Restore Default Configuration
# - Platform > BIOS Configuration
```

### Supermicro Fan Control

```bash
# Get fan speed
ipmitool sensor reading "Fan1"

# Set fan mode (Full speed)
ipmitool raw 0x30 0x45 0x01 0x01

# Set fan mode (Optimal)
ipmitool raw 0x30 0x45 0x01 0x00

# Get CPU temp
ipmitool sensor | grep -i temp

# Set threshold (model-specific)
ipmitool sensor thresh "CPU1 Temp" upper 80
```

---

## Gigabyte BMC/IPMI

### Gigabyte BMC Commands

```bash
# Get BMC info
ipmitool mc info

# Get system info
ipmitool fru

# Power control (same as standard IPMI)
ipmitool power on
ipmitool power off
ipmitool power status

# Get sensor readings
ipmitool sensor list

# Get SEL (System Event Log)
ipmitool sel list
ipmitool sel elist  # Extended list
```

### Gigabyte BIOS Password Reset

```bash
# Method 1: Via Gigabyte BMC web interface
# 1. Access BMC web interface (https://bmc-ip-address)
# 2. Navigate to System > BIOS Settings
# 3. Look for "Reset BIOS Settings" or "Clear CMOS"
# 4. Apply settings and reboot

# Method 2: Physical access - Clear CMOS on Gigabyte server boards
# Gigabyte server boards typically have CMOS clear options:

# Motherboard jumper:
# - Locate "CLRTC" or "CLR_CMOS" jumper
# - Move jumper from pins 1-2 to pins 2-3
# - Wait 10 seconds, return to pins 1-2

# CMOS clear button:
# - Some models have a red "CLR_CMOS" button
# - Press and hold for 5-10 seconds with power off but cable connected

# Method 3: Remove CMOS battery
# - Power off and unplug server
# - Locate CR2032 battery
# - Remove for 30-60 seconds
# - Reinstall and power on

# Method 4: Via IPMI (model-specific)
# Some Gigabyte models support BMC-triggered CMOS clear:
ipmitool raw 0x06 0x40  # May work on some models

# Method 5: Gigabyte-specific BMC commands
# Check vendor documentation for model-specific commands
# Access via SSH or web interface for model-specific options
```

### Gigabyte BMC via SSH

```bash
# SSH to BMC (default credentials vary)
ssh admin@bmc-ip-address

# Common default credentials:
# - admin/admin
# - root/admin
# - ADMIN/ADMIN

# Once in BMC CLI:
# reset system  # Reset system
# reset bios    # Reset BIOS (on some models)
# help          # List available commands
```

---

## Generic IPMI Commands

### IPMItool Basics

```bash
# Local IPMI access
ipmitool mc info
ipmitool sensor list
ipmitool fru list

# Remote IPMI access
ipmitool -I lanplus -H ipmi-ip -U admin -P password command

# Common commands:
ipmitool -I lanplus -H ipmi-ip -U admin -P password mc info
ipmitool -I lanplus -H ipmi-ip -U admin -P password power status
ipmitool -I lanplus -H ipmi-ip -U admin -P password sensor list
```

### IPMI SOL (Serial Over LAN)

```bash
# Activate SOL console
ipmitool -I lanplus -H ipmi-ip -U admin -P password sol activate

# Deactivate SOL
ipmitool -I lanplus -H ipmi-ip -U admin -P password sol deactivate

# SOL with specific settings
ipmitool -I lanplus -H ipmi-ip -U admin -P password \
  -e ~ sol activate  # Use ~ as escape character
```

### IPMI Event Logs

```bash
# View System Event Log
ipmitool sel list
ipmitool sel elist  # Extended format

# View SEL info
ipmitool sel info

# Clear SEL
ipmitool sel clear

# Delete specific entry
ipmitool sel delete <entry_id>

# Get SEL time
ipmitool sel time get

# Set SEL time
ipmitool sel time set "01/01/2024 00:00:00"
```

### IPMI Sensor Monitoring

```bash
# List all sensors
ipmitool sensor list

# Get specific sensor
ipmitool sensor reading "CPU1 Temp"

# Get sensor thresholds
ipmitool sensor thresh "CPU1 Temp"

# Set sensor threshold
ipmitool sensor thresh "CPU1 Temp" upper 85
ipmitool sensor thresh "CPU1 Temp" lower 10

# Monitor specific sensor
watch -n 1 'ipmitool sensor reading "CPU1 Temp"'
```

### IPMI Chassis Control

```bash
# Chassis status
ipmitool chassis status

# Chassis power cycle
ipmitool chassis power cycle

# Chassis power reset
ipmitool chassis power reset

# Boot to BIOS
ipmitool chassis bootdev bios
ipmitool chassis power cycle

# Boot from PXE
ipmitool chassis bootdev pxe
ipmitool chassis power cycle

# Boot from disk
ipmitool chassis bootdev disk
ipmitool chassis power cycle

# Get boot flags
ipmitool chassis bootparam get 5

# Set boot flags
ipmitool chassis bootparam set bootflag force_pxe
```

---

## Redfish API (Universal BMC Interface)

### Basic Redfish Commands

```bash
# Get root Redfish service
curl -k -u admin:password https://bmc-ip/redfish/v1/

# Get system info
curl -k -u admin:password https://bmc-ip/redfish/v1/Systems/1
curl -k -u admin:password https://bmc-ip/redfish/v1/Systems/1 | jq '.'

# Get BMC/Manager info
curl -k -u admin:password https://bmc-ip/redfish/v1/Managers/1

# Get chassis info
curl -k -u admin:password https://bmc-ip/redfish/v1/Chassis/1

# Get power state
curl -k -u admin:password https://bmc-ip/redfish/v1/Systems/1 | jq '.PowerState'

# Reset system (restart)
curl -k -u admin:password -X POST \
  -H 'Content-Type: application/json' \
  -d '{"ResetType": "ForceRestart"}' \
  https://bmc-ip/redfish/v1/Systems/1/Actions/ComputerSystem.Reset

# Power on
curl -k -u admin:password -X POST \
  -H 'Content-Type: application/json' \
  -d '{"ResetType": "On"}' \
  https://bmc-ip/redfish/v1/Systems/1/Actions/ComputerSystem.Reset

# Power off
curl -k -u admin:password -X POST \
  -H 'Content-Type: application/json' \
  -d '{"ResetType": "ForceOff"}' \
  https://bmc-ip/redfish/v1/Systems/1/Actions/ComputerSystem.Reset
```

### Redfish BIOS Management

```bash
# Get BIOS settings
curl -k -u admin:password https://bmc-ip/redfish/v1/Systems/1/Bios

# Get BIOS attribute
curl -k -u admin:password https://bmc-ip/redfish/v1/Systems/1/Bios/Settings

# Reset BIOS to defaults (may bypass password)
curl -k -u admin:password -X POST \
  -H 'Content-Type: application/json' \
  -d '{"ResetType": "ResetAll"}' \
  https://bmc-ip/redfish/v1/Systems/1/Bios/Actions/Bios.ResetBios

# Set BIOS attribute
curl -k -u admin:password -X PATCH \
  -H 'Content-Type: application/json' \
  -d '{"Attributes": {"BootMode": "Uefi"}}' \
  https://bmc-ip/redfish/v1/Systems/1/Bios/Settings
```

---

## Common BIOS Password Reset Procedures

### Physical CMOS Clear (Universal)

```bash
# WARNING: Only perform with proper authorization!

# Procedure for most servers:
# 1. Power off server completely (unplug power cables)
# 2. Open server chassis
# 3. Locate CMOS battery (CR2032 coin cell)
# 4. Remove battery for 30-60 seconds
# 5. Reinstall battery
# 6. Close chassis, reconnect power
# 7. Power on and configure BIOS

# Note: This clears:
# - BIOS passwords
# - BIOS settings (returns to defaults)
# - System time/date
# - RAID configuration (on some systems)
```

### CMOS Clear Jumper Locations

```bash
# HP ProLiant:
# - Switch SW1, position 6 (maintenance switch)
# - Jumper labeled "PWD" or "PSWD"

# Dell PowerEdge:
# - Jumper PSWD (varies by model)
# - Some models use switch block

# Supermicro:
# - Jumper JPB1 or JBAT1
# - SW1 button on some boards
# - "CMOS Clear" clearly labeled

# Gigabyte:
# - Jumper CLRTC or CLR_CMOS
# - Red button on some models

# General:
# - Always consult service manual first!
# - Document original configuration before clearing
# - Re-configure after CMOS clear
```

### Server-Specific Resources

```bash
# HP:
# - HPE Support: https://support.hpe.com
# - Manuals: iLO User Guide, Server Maintenance Guide

# Dell:
# - Dell Support: https://www.dell.com/support
# - Manuals: iDRAC User Guide, Service Manual

# Supermicro:
# - Supermicro Support: https://www.supermicro.com
# - Manuals: IPMI User Guide, Motherboard Manual

# Gigabyte:
# - Gigabyte Support: https://www.gigabyte.com
# - Server motherboard manuals

# Always verify:
# - Model-specific procedures
# - Warranty implications
# - Authorization requirements
# - Data backup before changes
```

---

## BMC Troubleshooting

### BMC/iLO/iDRAC Connectivity Issues

```bash
# Check network connectivity
ping ipmi-ip-address
telnet ipmi-ip-address 443  # HTTPS
telnet ipmi-ip-address 623  # IPMI

# Reset BMC network
ipmitool -I lanplus -H ipmi-ip -U admin -P password mc reset cold

# Check IPMI service status
systemctl status ipmi
systemctl start ipmi
systemctl enable ipmi

# Load IPMI modules
modprobe ipmi_devintf
modprobe ipmi_msghandler
modprobe ipmi_si
```

### Common Issues & Solutions

```bash
# Issue: "Unable to establish LAN session"
# Solution: Check credentials, enable IPMI over LAN

# Issue: "Permission denied"
# Solution: Check user privileges, use correct user level

# Issue: BMC not responding
# Solution: Cold reset BMC, check network, verify power

# Issue: "Connection timeout"
# Solution: Check firewall, IPMI port 623/443 must be open

# Reset BMC to factory defaults (last resort)
# HP: hponcfg -r
# Dell: racadm racreset
# Supermicro: ipmitool mc reset cold
```

### Firewall Configuration for BMC/IPMI

```bash
# firewalld (RHEL/CentOS/Fedora)
firewall-cmd --add-port=623/udp --permanent  # IPMI
firewall-cmd --add-port=443/tcp --permanent  # HTTPS
firewall-cmd --add-port=5900/tcp --permanent  # VNC/Console
firewall-cmd --reload

# UFW (Ubuntu/Debian)
ufw allow 623/udp
ufw allow 443/tcp
ufw allow 5900/tcp
ufw reload

# iptables
iptables -A INPUT -p udp --dport 623 -j ACCEPT
iptables -A INPUT -p tcp --dport 443 -j ACCEPT
iptables -A INPUT -p tcp --dport 5900 -j ACCEPT
```
