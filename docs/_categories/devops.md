---
layout: category
title: DevOps & IaC
icon: ti ti-brand-git
color: #623ce4
description: Ansible, Terraform, Jenkins, and CI/CD commands.
---

## Ansible Basics

```bash
ansible all -m ping                    # Ping all hosts
ansible -i inventory all -m shell -a "uptime"  # Run command
ansible-playbook playbook.yml          # Run playbook
ansible-playbook playbook.yml -i inventory  # Specify inventory
ansible-playbook playbook.yml --check  # Dry run
ansible-playbook playbook.yml -v       # Verbose
ansible-vault encrypt file.yml         # Encrypt file
ansible-vault decrypt file.yml         # Decrypt file
```

## Ansible Modules

```bash
# Ad-hoc commands
ansible webservers -m apt -a "name=nginx state=present"  # Install package
ansible webservers -m service -a "name=nginx state=started"  # Start service
ansible all -m copy -a "src=file dest=/tmp/file"  # Copy file
ansible all -m file -a "path=/tmp/file state=absent"  # Delete file
ansible all -m user -a "name=user state=present"  # Create user
```

## Terraform Basics

```bash
terraform init                       # Initialize working directory
terraform plan                       # Show execution plan
terraform apply                      # Apply changes
terraform apply -auto-approve        # Apply without prompt
terraform destroy                    # Destroy infrastructure
terraform fmt                        # Format files
terraform validate                   # Validate syntax
terraform output                     # Show outputs
```

## Terraform State

```bash
terraform state list                 # List resources
terraform show                       # Show state
terraform pull                       # Pull state
terraform push                       # Push state
terraform import resource.id id      # Import resource
terraform state rm resource          # Remove from state
terraform taint resource             # Mark for recreation
terraform untaint resource           # Remove taint
```

## Jenkins CLI

```bash
jenkins-cli list-jobs                # List jobs
jenkins-cli build job                # Build job
jenkins-cli console job              # View console output
```

## Git Basics

```bash
git init                             # Initialize repo
git clone url                        # Clone repo
git add .                            # Stage all
git commit -m "message"              # Commit
git push                             # Push to remote
git pull                             # Pull from remote
git status                           # Show status
git log --oneline                    # Commit history
```

## Git Branching

```bash
git branch                           # List branches
git branch newbranch                 # Create branch
git checkout -b newbranch            # Create and checkout
git checkout branch                  # Switch branch
git merge branch                     # Merge branch
git branch -d branch                 # Delete branch
```

## Common Scenarios

### Ansible: Deploy application to servers
```bash
# Create inventory
cat > inventory << EOF
[webservers]
web1.example.com
web2.example.com

[dbservers]
db1.example.com
EOF

# Run playbook
ansible-playbook -i inventory deploy.yml

# Run with specific tags
ansible-playbook -i inventory deploy.yml --tags "deploy"

# Run on specific hosts
ansible-playbook -i inventory deploy.yml --limit webservers
```

### Ansible: Install and start service
```bash
# Ad-hoc commands
ansible all -m apt -a "name=nginx state=present" --become
ansible all -m service -a "name=nginx state=started" --become

# Or with playbook
cat > install_nginx.yml << EOF
---
- hosts: webservers
  become: yes
  tasks:
    - name: Install nginx
      apt:
        name: nginx
        state: present
    - name: Start nginx
      service:
        name: nginx
        state: started
EOF

ansible-playbook install_nginx.yml
```

### Terraform: Deploy AWS infrastructure
```hcl
# main.tf
terraform {
  required_providers {
    aws = {
      source = "hashicorp/aws"
    }
  }
}

provider "aws" {
  region = "us-east-1"
}

resource "aws_vpc" "main" {
  cidr_block = "10.0.0.0/16"
}

resource "aws_instance" "web" {
  ami           = "ami-0c55b159cbfafe1f0"
  instance_type = "t2.micro"
}
```

```bash
# Initialize and apply
terraform init
terraform plan
terraform apply
```

### Terraform: Use modules
```hcl
module "vpc" {
  source = "terraform-aws-modules/vpc/aws"

  name = "my-vpc"
  cidr = "10.0.0.0/16"

  azs             = ["us-east-1a", "us-east-1b"]
  private_subnets = ["10.0.1.0/24", "10.0.2.0/24"]
  public_subnets  = ["10.0.101.0/24", "10.0.102.0/24"]
}
```

### Git: Revert to previous commit
```bash
# Soft reset (keep changes)
git reset --soft HEAD~1

# Hard reset (lose changes)
git reset --hard HEAD~1

# Revert with new commit
git revert HEAD

# Reset to specific commit
git reset --hard abc1234
```

### Git: Resolve merge conflicts
```bash
# Start merge
git merge feature-branch

# Check conflicts
git status

# Edit conflicted files
# Search for <<<<<<<

# Mark as resolved
git add resolved-file

# Complete merge
git commit
```

### Terraform: Import existing resource
```bash
# Import EC2 instance
terraform import aws_instance.web i-1234567890abcdef0

# Import with module
terraform import module.vpc.aws_vpc.main vpc-abc123

# Import multiple resources
terraform import \
  aws_security_group.default sg-12345678
```

### Ansible: Use vault for secrets
```bash
# Create encrypted file
ansible-vault create secrets.yml

# Edit encrypted file
ansible-vault edit secrets.yml

# Rekey file
ansible-vault rekey secrets.yml

# Run playbook with vault
ansible-playbook playbook.yml --ask-vault-pass

# Or with password file
ansible-playbook playbook.yml --vault-password-file vault.pass
```

### Jenkins: Trigger job remotely
```bash
# Build with token
curl -X POST "http://jenkins/job/myjob/build?token=TOKEN"

# With parameters
curl -X POST "http://jenkins/job/myjob/buildWithParameters?PARAM=value"

# Check build status
curl "http://jenkins/job/myjob/lastBuild/api/json"
```

### Terraform: Manage workspaces
```bash
# List workspaces
terraform workspace list

# Create new workspace
terraform workspace new dev

# Switch workspace
terraform workspace select prod

# Show current workspace
terraform workspace show

# Delete workspace
terraform workspace delete dev
```
