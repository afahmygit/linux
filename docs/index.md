---
layout: home
title: AF Linux - Linux & DevOps Commands Reference
---

## Quick Start

Use the search bar above (or press <kbd>Ctrl+K</kbd>) to quickly find commands. Or browse categories below.

## Featured Commands

### System Information
```bash
uname -a    # Display system information
uptime      # Show system uptime
free -h     # Memory usage
df -h       # Disk space usage
```

### Docker Quick Commands
```bash
docker ps           # List running containers
docker images       # List images
docker exec -it <container> sh  # Access container shell
docker logs -f <container>     # Follow container logs
```

### ZFS Quick Commands
```bash
zpool status          # Show pool status
zfs list              # List datasets
zfs snapshot pool/fs@snap  # Create snapshot
```

## About This Reference

This is a comprehensive collection of essential Linux commands and DevOps tools reference. It covers:
- **Core Linux**: File management, processes, users, permissions
- **Storage**: ZFS, LVM, Btrfs filesystems
- **Containers**: Docker, Kubernetes, K3s
- **Cloud**: AWS, Azure, GCP CLIs
- **DevOps**: Ansible, Terraform, CI/CD tools
- **Monitoring**: Prometheus, Grafana
