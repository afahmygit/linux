---
layout: category
title: Monitoring & Logging
icon: ti ti-chart-line
color: #f46800
description: Prometheus, Grafana, and system monitoring commands.
---

## Prometheus Commands

```bash
prometheus --config.file=prometheus.yml     # Start Prometheus
promtool check config prometheus.yml        # Validate config
promtool query instant 'up{job="prometheus"}'  # Query metrics
```

## Prometheus Query Examples

```bash
# CPU usage rate
rate(cpu_seconds_total[5m])

# Request rate
rate(http_requests_total[5m])

# Memory usage
process_resident_memory_bytes{job="prometheus"}

# Disk usage
node_filesystem_avail_bytes{mountpoint="/"}

# Network traffic
rate(node_network_receive_bytes_total[5m])

# Service availability
up{job="my_service"}
```

## Grafana Commands

```bash
grafana-server                          # Start Grafana
grafana-cli plugins install plugin-name  # Install plugin
grafana-cli admin reset-admin-password  # Reset password
grafana-cli plugins ls                  # List plugins
grafana-cli plugins update-all          # Update plugins
```

## System Monitoring Tools

```bash
htop                    # Interactive process viewer
atop                    # Advanced monitoring
iotop                   # I/O monitoring
iftop                   # Network bandwidth
nethogs                 # Per-process network
vmstat 1                # VM statistics
iostat -x 1             # I/O statistics
mpstat -P ALL 1         # CPU statistics
sar                      # System activity reporter
```

## Log Management

```bash
journalctl              # View systemd logs
journalctl -f           # Follow logs
journalctl -u service   # Service logs
journalctl -b           # Since boot
journalctl --since today  # Today's logs
tail -f /var/log/syslog  # Follow log file
tail -100 file          # Last 100 lines
```

## Alert Management

```bash
# Prometheus alert rules
promtool check rules rules.yml  # Validate rules

# Check alert status
curl http://prometheus:9090/api/v1/alerts

# Check targets
curl http://prometheus:9090/api/v1/targets
```

## Common Scenarios

### Set up Prometheus monitoring
```yaml
# prometheus.yml
global:
  scrape_interval: 15s
  evaluation_interval: 15s

scrape_configs:
  - job_name: 'prometheus'
    static_configs:
      - targets: ['localhost:9090']

  - job_name: 'node'
    static_configs:
      - targets: ['localhost:9100']

  - job_name: 'docker'
    static_configs:
      - targets: ['localhost:9323']
```

```bash
# Validate and start
promtool check config prometheus.yml
prometheus --config.file=prometheus.yml
```

### Create Grafana dashboard
```bash
# Start Grafana
grafana-server

# Access http://localhost:3000
# Default: admin/admin

# Install plugins
grafana-cli plugins install grafana-piechart-panel
grafana-cli plugins install vonage-status-panel

# Restart to apply
systemctl restart grafana-server
```

### Monitor disk space with alert
```yaml
# alert_rules.yml
groups:
  - name: disk_alerts
    interval: 30s
    rules:
      - alert: HighDiskUsage
        expr: (node_filesystem_avail_bytes{mountpoint="/"} / node_filesystem_size_bytes{mountpoint="/"}) * 100 < 20
        for: 5m
        labels:
          severity: warning
        annotations:
          summary: "High disk usage on {% raw %}{{ $labels.instance }}{% endraw %}"
```

### Monitor Docker containers
```yaml
# docker-compose.yml for Prometheus
version: '3'
services:
  prometheus:
    image: prom/prometheus
    volumes:
      - ./prometheus.yml:/etc/prometheus/prometheus.yml
    ports:
      - "9090:9090"

  node-exporter:
    image: prom/node-exporter
    ports:
      - "9100:9100"

  cadvisor:
    image: gcr.io/cadvisor/cadvisor
    ports:
      - "8080:8080"
    volumes:
      - /:/rootfs:ro
      - /var/run:/var/run:ro
      - /sys:/sys:ro
      - /var/lib/docker/:/var/lib/docker:ro
```

### Query Prometheus for specific metrics
```bash
# Using promtool
promtool query instant 'rate(http_requests_total[5m])'

# Using API
curl 'http://localhost:9090/api/v1/query?query=up'

# Range query
curl 'http://localhost:9090/api/v1/query_range?query=rate(http_requests_total[5m])&start=2024-01-01T00:00:00Z&end=2024-01-01T01:00:00Z&step=1m'
```

### Set up log aggregation
```bash
# Using journalctl
journalctl -f -u myservice > /var/log/myservice.log &

# Rotate logs
logrotate -f /etc/logrotate.d/custom

# View logs for specific time
journalctl --since "1 hour ago" --until "30 minutes ago"
```

### Monitor application performance
```bash
# Using promtool
promtool query instant 'rate(http_request_duration_seconds_sum[5m]) / rate(http_request_duration_seconds_count[5m])'

# Check error rate
promtool query instant 'rate(http_requests_total{status=~"5.."}[5m])'

# Check request rate
promtool query instant 'sum(rate(http_requests_total[5m])) by (endpoint)'
```

### Exporter for custom metrics
```bash
# Node Exporter (system metrics)
node_exporter

# Blackbox Exporter (probes)
blackbox_exporter --config.file=config.yml

# MySQL Exporter
mysqld_exporter --config.my-cnf=.my.cnf

# PostgreSQL Exporter
postgres_exporter --web.listen-address=:9187
```

### Create Grafana datasource via API
```bash
# Create Prometheus datasource
curl -X POST \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Prometheus",
    "type": "prometheus",
    "url": "http://prometheus:9090",
    "access": "proxy",
    "isDefault": true
  }' \
  http://admin:admin@localhost:3000/api/datasources
```

### Monitor system with custom alerts
```bash
# Create alertmanager config
cat > alertmanager.yml << EOF
global:
  smtp_smarthost: 'localhost:25'
  from: 'alertmanager@example.com'

route:
  receiver: 'email'

receivers:
  - name: 'email'
    email_configs:
      - to: 'admin@example.com'
EOF

# Start alertmanager
alertmanager --config.file=alertmanager.yml
```
