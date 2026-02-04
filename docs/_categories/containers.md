---
layout: category
title: Containers
icon: ti ti-container
color: #2496ed
description: Docker, Kubernetes, K3s, and container orchestration commands.
---

## Docker Basics

```bash
docker images                  # List images
docker ps                      # List running containers
docker ps -a                   # All containers
docker pull image              # Pull image
docker run image               # Run container
docker run -d image            # Run in background
docker run -it image sh        # Interactive shell
docker stop container          # Stop container
docker rm container            # Remove container
docker rmi image               # Remove image
```

## Docker Container Management

```bash
docker exec -it container sh   # Access container shell
docker logs container          # View logs
docker logs -f container       # Follow logs
docker inspect container       # Container details
docker stats                   # Live resource stats
docker top container           # Container processes
docker diff container          # Filesystem changes
docker cp file container:/path # Copy to container
docker cp container:/path file # Copy from container
```

## Docker Build & Images

```bash
docker build -t name .         # Build image
docker build -t name:tag .     # Build with tag
docker tag image newname       # Tag image
docker push image             # Push to registry
docker commit container image  # Save as image
docker history image          # Image layers
docker export container > file # Export container
docker import file            # Import container
```

## Docker Network & Volumes

```bash
docker network ls             # List networks
docker network create net     # Create network
docker network connect net container  # Connect to network
docker volume ls              # List volumes
docker volume create vol      # Create volume
docker volume rm vol          # Remove volume
```

## Docker Compose

```bash
docker-compose up             # Start services
docker-compose up -d          # Start in background
docker-compose down           # Stop and remove
docker-compose ps             # List services
docker-compose logs           # View logs
docker-compose logs -f        # Follow logs
docker-compose exec service sh  # Access service
docker-compose build          # Rebuild services
docker-compose pull           # Pull images
```

## Kubernetes Basics

```bash
kubectl get all               # List all resources
kubectl get pods              # List pods
kubectl get svc               # List services
kubectl get deployments       # List deployments
kubectl describe pod podname  # Pod details
kubectl logs podname          # View logs
kubectl logs -f podname       # Follow logs
kubectl exec -it podname sh   # Access pod shell
```

## Kubernetes Apply & Delete

```bash
kubectl apply -f file.yaml    # Apply manifest
kubectl delete -f file.yaml   # Delete from manifest
kubectl delete pod podname    # Delete pod
kubectl delete svc svcname    # Delete service
kubectl delete -n ns all      # Delete all in namespace
```

## Kubernetes Scale & Rollout

```bash
kubectl scale deployment/dep --replicas=3  # Scale deployment
kubectl rollout status deployment/dep      # Check rollout
kubectl rollout history deployment/dep     # Rollout history
kubectl rollout undo deployment/dep        # Undo rollout
kubectl set image deployment/dep container=image  # Update image
```

## K3s Commands

```bash
k3s server                   # Start K3s server
k3s agent                    # Start K3s agent
k3s kubectl get nodes       # List nodes
k3s uninstall.sh            # Uninstall K3s
```

## Common Scenarios

### Run Docker container with volume mount
```bash
# Run with volume
docker run -d -v /host:/container image

# Run with named volume
docker run -d -v volname:/path image

# Read-only volume
docker run -d -v /host:/container:ro image

# Multiple volumes
docker run -d \
  -v /host1:/cont1 \
  -v /host2:/cont2 \
  image
```

### Access Docker container shell
```bash
# For containers with shell
docker exec -it container bash
docker exec -it container sh

# Run single command
docker exec container ls /app

# Run as specific user
docker exec -u user container sh
```

### View Docker container logs
```bash
# View logs
docker logs container

# Follow logs
docker logs -f container

# Last 100 lines
docker logs --tail 100 container

# With timestamps
docker logs -t container

# Since specific time
docker logs --since 1h container
```

### Deploy to Kubernetes
```bash
# Apply from directory
kubectl apply -f k8s/

# Apply specific file
kubectl apply -f deployment.yaml

# Check rollout status
kubectl rollout status deployment/myapp

# Get pods with watch
kubectl get pods -w

# Port forward to local
kubectl port-forward pod/mypod 8080:80
```

### Debug Kubernetes pod issues
```bash
# Describe pod
kubectl describe pod podname

# View logs
kubectl logs podname

# View logs for specific container
kubectl logs podname -c containername

# View previous container logs
kubectl logs podname --previous

# Access shell
kubectl exec -it podname sh
```

### Build and push Docker image
```bash
# Build image
docker build -t username/app:latest .

# Tag for registry
docker tag username/app:latest registry/app:latest

# Push to registry
docker push registry/app:latest

# Or in one command
docker build -t registry/app:latest . && \
docker push registry/app:latest
```

### Clean up Docker resources
```bash
# Remove stopped containers
docker container prune

# Remove unused images
docker image prune -a

# Remove unused volumes
docker volume prune

# Remove everything unused
docker system prune -a

# Remove specific container
docker rm -f container

# Remove specific image
docker rmi -f image
```

### Scale Kubernetes deployment
```bash
# Scale to 3 replicas
kubectl scale deployment/myapp --replicas=3

# Scale down to 1
kubectl scale deployment/myapp --replicas=1

# Scale multiple deployments
kubectl scale deployment/dep1 deployment/dep2 --replicas=3

# Auto-scaling (HPA)
kubectl autoscale deployment/myapp --min=2 --max=10 --cpu-percent=80
```

### Create Docker Compose service
```yaml
version: '3.8'
services:
  web:
    image: nginx:latest
    ports:
      - "80:80"
    volumes:
      - ./html:/usr/share/nginx/html
    restart: unless-stopped

  db:
    image: postgres:14
    environment:
      POSTGRES_PASSWORD: secret
    volumes:
      - dbdata:/var/lib/postgresql/data
    restart: unless-stopped

volumes:
  dbdata:
```

### Connect Docker containers with network
```bash
# Create network
docker network create mynet

# Run containers on network
docker run -d --net mynet --name db postgres
docker run -d --net mynet --name web nginx

# Connect existing container
docker network connect mynet existing_container

# Disconnect
docker network disconnect mynet container

# Inspect network
docker network inspect mynet
```
