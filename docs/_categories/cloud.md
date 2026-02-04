---
layout: category
title: Cloud Services
icon: ti ti-cloud
color: #ff9900
description: AWS, Azure, and GCP CLI commands for cloud infrastructure management.
---

## AWS CLI Basics

```bash
aws configure                  # Configure credentials
aws ec2 describe-instances     # List EC2 instances
aws s3 ls                      # List S3 buckets
aws s3 ls s3://bucket/         # List bucket contents
aws iam list-users             # List IAM users
aws lambda list-functions      # List Lambda functions
```

## AWS EC2 Commands

```bash
aws ec2 run-instances --image-id ami-xxx --instance-type t2.micro
aws ec2 describe-instances --instance-ids i-xxx
aws ec2 start-instances --instance-ids i-xxx
aws ec2 stop-instances --instance-ids i-xxx
aws ec2 terminate-instances --instance-ids i-xxx
aws ec2 create-volume --size 10 --region us-east-1
aws ec2 describe-volumes
```

## AWS S3 Commands

```bash
aws s3 mb s3://bucket-name               # Create bucket
aws s3 rb s3://bucket-name               # Remove bucket
aws s3 ls s3://bucket-name               # List bucket
aws s3 cp file.txt s3://bucket/          # Copy to S3
aws s3 cp s3://bucket/file.txt .         # Copy from S3
aws s3 sync ./dir s3://bucket/           # Sync directory
aws s3 rm s3://bucket/file.txt           # Delete file
aws s3 rm s3://bucket --recursive        # Delete all
```

## Azure CLI Basics

```bash
az login                       # Login to Azure
az account show                # Show current account
az account list                # List all accounts
az account set --subscription "sub-name"  # Set subscription
```

## Azure VM Commands

```bash
az vm create -g RG -n vmName --image UbuntuLTS
az vm list -g RG
az vm show -g RG -n vmName
az vm start -g RG -n vmName
az vm stop -g RG -n vmName
az vm deallocate -g RG -n vmName
az vm delete -g RG -n vmName
az vm list-sizes --location eastus
```

## Azure Storage Commands

```bash
az storage account create -g RG -n accountName
az storage container create --name container --account-name account
az storage blob upload -f file -c container -n blob --account-name account
az storage blob list -c container --account-name account
az storage blob delete -n blob -c container --account-name account
```

## GCP CLI Basics

```bash
gcloud auth login              # Authenticate
gcloud config set project PROJECT_ID  # Set project
gcloud config list             # List config
gcloud projects list           # List projects
```

## GCP Compute Commands

```bash
gcloud compute instances create vm-name --zone=us-central1-a
gcloud compute instances list
gcloud compute instances start vm-name --zone=us-central1-a
gcloud compute instances stop vm-name --zone=us-central1-a
gcloud compute instances delete vm-name --zone=us-central1-a
gcloud compute machine-types list --zone=us-central1-a
```

## Common Scenarios

### AWS: Launch EC2 instance with key pair
```bash
# Create key pair
aws ec2 create-key-pair --key-name mykey --query 'KeyMaterial' --output text > mykey.pem
chmod 400 mykey.pem

# Launch instance
aws ec2 run-instances \
  --image-id ami-0c55b159cbfafe1f0 \
  --instance-type t2.micro \
  --key-name mykey \
  --security-group-ids sg-xxx \
  --subnet-id subnet-xxx

# SSH to instance
ssh -i mykey.pem ec2-user@public-ip
```

### AWS: Sync files to S3
```bash
# Sync directory to S3
aws s3 sync ./local-dir s3://bucket/path/

# Sync with delete (remove remote files not in local)
aws s3 sync ./local-dir s3://bucket/path/ --delete

# Sync specific files
aws s3 cp ./file.txt s3://bucket/path/

# Sync from S3 to local
aws s3 sync s3://bucket/path/ ./local-dir
```

### Azure: Create VM with public IP
```bash
# Create resource group
az group create -n myResourceGroup -l eastus

# Create VM with public IP
az vm create \
  -g myResourceGroup \
  -n myVM \
  --image UbuntuLTS \
  --admin-username azureuser \
  --generate-ssh-keys

# Open port 80
az vm open-port -g myResourceGroup -n myVM --port 80

# SSH to VM
ssh azureuser@public-ip
```

### GCP: Create Compute Engine instance
```bash
# Set project
gcloud config set project my-project-id

# Create instance
gcloud compute instances create my-instance \
  --zone=us-central1-a \
  --machine-type=e2-medium \
  --image-family=ubuntu-2004-lts \
  --image-project=ubuntu-os-cloud \
  --boot-disk-size=10GB

# SSH to instance
gcloud compute ssh my-instance --zone=us-central1-a
```

### AWS: List instances with specific tag
```bash
# Using JMESPath query
aws ec2 describe-instances \
  --filters "Name=tag:Environment,Values=production" \
  --query 'Reservations[].Instances[].[InstanceId,Tags[?Key==`Name`].Value|[0]]' \
  --output table
```

### Azure: Create storage account and container
```bash
# Create resource group
az group create -n myRG -l eastus

# Create storage account
az storage account create \
  -g myRG \
  -n mystorageaccount123 \
  -l eastus \
  --sku Standard_LRS

# Get account key
KEY=$(az storage account keys list -g myRG -n mystorageaccount123 --query '[0].value' -o tsv)

# Create container
az storage container create \
  --name mycontainer \
  --account-name mystorageaccount123 \
  --account-key $KEY
```

### GCP: Create Cloud Storage bucket
```bash
# Create bucket
gsutil mb gs://my-unique-bucket-name

# List buckets
gsutil ls

# Copy file to bucket
gsutil cp file.txt gs://my-unique-bucket-name/

# Sync directory
gsutil -m rsync -r ./dir gs://my-unique-bucket-name/

# Set ACL
gsutil acl ch -u user@email:READ gs://my-unique-bucket-name/file.txt
```

### AWS: Manage Lambda functions
```bash
# List functions
aws lambda list-functions

# Invoke function
aws lambda invoke \
  --function-name my-function \
  --payload '{"key":"value"}' \
  response.json

# Update function code
aws lambda update-function-code \
  --function-name my-function \
  --zip-file fileb://deployment.zip

# Get function logs
aws logs tail /aws/lambda/my-function --follow
```

### Azure: Manage AKS cluster
```bash
# Create resource group
az group create -n myRG -l eastus

# Create AKS cluster
az aks create -g myRG -n myAKSCluster --node-count 2

# Get credentials
az aks get-credentials -g myRG -n myAKSCluster

# List nodes
kubectl get nodes

# Scale node pool
az aks scale -g myRG -n myAKSCluster --node-count 3
```

### GCP: Create GKE cluster
```bash
# Create cluster
gcloud container clusters create my-cluster \
  --zone=us-central1-a \
  --num-nodes=2 \
  --machine-type=e2-medium

# Get credentials
gcloud container clusters get-credentials my-cluster \
  --zone=us-central1-a

# List nodes
kubectl get nodes

# Resize cluster
gcloud container clusters resize my-cluster \
  --zone=us-central1-a \
  --node-pool=default-pool \
  --num-nodes=3
```
