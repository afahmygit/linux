---
layout: category
title: GPU & AI
icon: ti ti-brand-cuda
color: #76b900
description: NVIDIA GPU management, AI tools, CUDA, Slurm, Conda, Spack, and Environment Modules.
---

## NVIDIA GPU Management

### nvidia-smi - GPU Monitoring

```bash
# Basic GPU info
nvidia-smi

# Continuous monitoring (refresh every 2 seconds)
nvidia-smi dmon

# Watch GPU stats continuously
watch -n 1 nvidia-smi

# Detailed GPU info
nvidia-smi -q

# Query specific info
nvidia-smi -q -d TEMPERATURE
nvidia-smi -q -d MEMORY
nvidia-smi -q -d UTILIZATION
nvidia-smi -q -d CLOCK
nvidia-smi -q -d PARENT

# List all GPUs
nvidia-smi -L

# GPU statistics in CSV format
nvidia-smi --query-gpu=index,name,temperature.gpu,utilization.gpu,utilization.memory,memory.total,memory.used,memory.free --format=csv

# Loop query for scripts
nvidia-smi --query-gpu=utilization.gpu --format=csv,noheader,nounits
```

### GPU Process Management

```bash
# List processes using GPU
nvidia-smi pmon -c 1

# Show detailed process info
nvidia-smi pmon -s um -c 1

# Kill process by GPU PID
kill -9 <pid>

# Find GPU processes
fuser -v /dev/nvidia*
```

### NVIDIA Driver & CUDA

```bash
# Check NVIDIA driver version
nvidia-smi

# Check CUDA version
nvcc --version
cat /usr/local/cuda/version.txt  # Legacy

# List all CUDA versions
ls -la /usr/local/ | grep cuda

# Set CUDA version (add to .bashrc)
export PATH=/usr/local/cuda-12.1/bin:$PATH
export LD_LIBRARY_PATH=/usr/local/cuda-12.1/lib64:$LD_LIBRARY_PATH

# Update CUDA alternatives
sudo update-alternatives --config cuda

# Rebuild NVIDIA kernel module (DKMS)
sudo dkms install nvidia/$(nvidia-smi | grep Driver | awk '{print $3}')
```

### GPU Persistence & Power Management

```bash
# Enable persistence mode (recommended for servers)
sudo nvidia-smi -pm 1

# Set power limit
sudo nvidia-smi -pl 250  # Set to 250W

# Set power management mode
sudo nvidia-smi -pm 1  # Enable
sudo nvidia-smi -pm 0  # Disable

# Set GPU clock limits
sudo nvidia-smi -ac 5001,1593  # Memory, Graphics clocks

# Reset GPU
nvidia-smi -r  # Reset all GPUs
nvidia-smi -i 0 -r  # Reset specific GPU

# Enable ECC mode
sudo nvidia-smi -e 1  # Enable
sudo nvidia-smi -e 0  # Disable

# Clear ECC errors
sudo nvidia-smi -e 0
sudo nvidia-smi -e 1
```

### GPU Performance Tuning

```bash
# Set compute mode
sudo nvidia-smi -c 0  # Default
sudo nvidia-smi -c 1  # Exclusive Thread (single process)
sudo nvidia-smi -c 2  # Prohibited
sudo nvidia-smi -c 3  # Exclusive Process (single context per GPU)

# Set graphics clock to maximum
sudo nvidia-smi -lgc 1800,1800

# Disable auto boost
sudo nvidia-smi -auto 0

# Force maximum performance
sudo nvidia-smi -acp 0

# Check GPU topology
nvidia-smi topo -m
```

### NVIDIA NCCL & Multi-GPU

```bash
# Check NCCL version
python -c "import torch; print(torch.cuda.nccl.version())"

# Test NCCL between GPUs
horovodrun -np 4 python train.py

# Check GPU affinity
nvidia-smi topo -m

# Set CUDA visible devices
export CUDA_VISIBLE_DEVICES=0,1  # Use GPUs 0 and 1
export CUDA_VISIBLE_DEVICES=2,3  # Use GPUs 2 and 3
```

---

## Conda - Package & Environment Manager

### Basic Commands

```bash
# Check conda version
conda --version

# Update conda
conda update conda
conda update --all

# Create new environment
conda create -n myenv python=3.11

# Activate environment
conda activate myenv

# Deactivate environment
conda deactivate

# List environments
conda env list
conda info --envs

# Remove environment
conda env remove -n myenv
```

### Package Management

```bash
# Install package
conda install numpy
conda install numpy=1.24.0  # Specific version
conda install numpy pandas matplotlib  # Multiple packages

# Install from specific channel
conda install -c conda-forge package
conda install -c nvidia package

# List installed packages
conda list

# Search for packages
conda search tensorflow
conda search tensorflow=2.12  # Specific version

# Update package
conda update numpy
conda update --all  # Update all

# Remove package
conda remove numpy

# Clear cache
conda clean --all
```

### Environment Management

```bash
# Export environment to file
conda env export > environment.yml

# Create environment from file
conda env create -f environment.yml

# Update environment from file
conda env update -f environment.yml

# List packages in environment
conda list -n myenv

# Clone environment
conda create --clone myenv --name myenv-copy

# Export to requirements.txt
conda list --export > requirements.txt

# Install from requirements.txt
conda install --file requirements.txt
```

### Conda Channels

```bash
# Add channels
conda config --add channels conda-forge
conda config --add channels nvidia

# List channels
conda config --show channels

# Remove channel
conda config --remove channels channel_name

# Set channel priority
conda config --set channel_priority strict
```

### Common AI/ML Packages

```bash
# PyTorch with CUDA
conda install pytorch torchvision torchaudio pytorch-cuda=12.1 -c pytorch -c nvidia

# TensorFlow
conda install tensorflow-gpu

# Jupyter & tools
conda install jupyter ipykernel matplotlib seaborn pandas scikit-learn

# CUDA toolkit
conda install cuda -c nvidia

# cuDNN
conda install cudnn -c conda-forge
```

---

## Environment Modules (Lmod)

### Basic Module Commands

```bash
# List available modules
module avail
module av

# List loaded modules
module list

# Show module info
module show module_name
module whatis module_name

# Load module
module load module_name
module load module_name/version

# Unload module
module unload module_name

# Reload module
module reload module_name

# Swap modules
module swap old_module new_module

# Purge all modules
module purge

# Save collection
module save mycollection

# Restore collection
module restore mycollection

# List saved collections
module savelist
```

### Module Search & Discovery

```bash
# Search for modules
module spider keyword

# Get detailed info about module
module spider module_name
module spider module_name/version

# Find all versions
module spider module_name

# Check dependencies
module show module_name
```

### Common Module Scenarios

```bash
# Load CUDA and cuDNN
module load cuda/12.1
module load cudnn/8.9

# Load compiler with MPI
module load gcc/12.2.0
module load openmpi/4.1.4

# Load Python with packages
module load python/3.11
module load py-scipy/1.11

# Load complete software stack
module purge
module load gcc/12.2.0 cuda/12.1 openmpi/4.1.4
```

---

## Spack - Package Manager for HPC

### Basic Spack Commands

```bash
# Check Spack version
spack --version

# Update Spack
spack self-update

# Find packages
spack list
spack list keyword

# Package info
spack info package_name
spack show package_name

# Install package
spack install package_name
spack install package_name@version  # Specific version

# Install with variants
spack install package_name+cuda
spack install package_name~mpi
spack install package_name+cuda+mpi cuda_arch=80

# Find installed packages
spack find
spack find package_name
```

### Spack Environment Management

```bash
# Create environment
spack env create myenv
spack env activate myenv

# Install in environment
spack install package_name

# List environment specs
spack find

# Deactivate environment
spack env deactivate

# Remove environment
spack env remove -y myenv

# List environments
spack env list
```

### Spack Module Management

```bash
# Generate module files
spack module tcl loads  # Tcl modules
spack module lmod loads  # Lmod modules

# Find module files
spack module find package_name

# Refresh module files
spack module refresh -y

# Setup modules
spack module loads module_name
```

### Common Spack Packages

```bash
# Install CUDA-aware MPI
spack install openmpi@4.1.4+cuda

# Install Python with specific version
spack install python@3.11

# Install Deep Learning packages
spack install py-pytorch+cuda
spack install py-tensorflow-gpu

# Install compilers
spack install gcc@12.2.0
spack install llvm@16

# Install with specific variants
spack install hdf5+mpi+fortran
```

---

## Slurm - Workload Manager

### Cluster Information

```bash
# View cluster state
sinfo

# Detailed node info
sinfo -N -l

# View partitions
sinfo -s

# View job queues
squeue

# View job details
scontrol show job <job_id>

# View node details
scontrol show node <node_name>
scontrol show nodes  # All nodes

# View partition info
scontrol show partition <partition_name>
```

### Job Submission

```bash
# Basic job submission
sbatch job_script.sh

# Interactive job
srun --pty bash

# Allocate resources and run command
salloc --nodes=2 --ntasks-per-node=4

# Submit with immediate execution
sbatch --immediate job_script.sh

# Submit to specific partition
sbatch -p gpu job_script.sh

# Submit with QoS
sbatch -q highpriority job_script.sh
```

### Job Script Examples

```bash
#!/bin/bash
#SBATCH --job-name=myjob           # Job name
#SBATCH --nodes=2                   # Number of nodes
#SBATCH --ntasks-per-node=4        # Tasks per node
#SBATCH --cpus-per-task=2          # CPU cores per task
#SBATCH --mem=32G                   # Memory per node
#SBATCH --time=04:00:00            # Walltime (HH:MM:SS)
#SBATCH --partition=gpu            # Partition name
#SBATCH --gres=gpu:4               # Number of GPUs
#SBATCH --output=job_%j.out        # Output file (%j = job ID)
#SBATCH --error=job_%j.err         # Error file

# Load modules
module load cuda/12.1
module load python/3.11

# Run commands
echo "Job started on $(hostname)"
srun python train.py
```

### GPU Jobs

```bash
# Allocate specific GPU type
sbatch --gres=gpu:a100:1 job.sh
sbatch --gres=gpu:v100:2 job.sh
sbatch --gres=gpu:rtx3090:4 job.sh

# Allocate GPUs with constraints
sbatch --constraint="gpu&a100" job.sh

# Interactive GPU job
srun --gres=gpu:1 --pty bash

# GPU node with specific features
sbatch --constraint="gpu&hbm100" job.sh
```

### Job Monitoring & Control

```bash
# View all jobs
squeue -u $USER

# View all jobs in detail
squeue -o "%.18i %.9P %.8j %.8u %.2t %.10M %.6D %R"

# View running jobs
squeue -t R

# View pending jobs with reasons
squeue -t PD

# Cancel job
scancel <job_id>

# Cancel all user jobs
scancel -u $USER

# Hold job
scontrol hold <job_id>

# Release job
scontrol release <job_id>

# Requeue job
scontrol requeue <job_id>

# Update job priority
scontrol update jobid=<job_id> priority=1000
```

### Job Statistics & Accounting

```bash
# Job history
sacct

# Detailed job info
sacct -j <job_id> --format=JobID,JobName,Partition,State,ExitCode,Elapsed,REQMEM,MAXRSS

# User job statistics
sacct -u $USER

# Job efficiency
sacct -j <job_id> --format=JobID,AllocCPUS,State,ExitCode,Elapsed,UserCPU,SystemCPU

# Pending job reasons
squeue -t PD -o "%.18i %.9P %.8j %.8u %.2t %.10M %.6D %R"

# Available resources
sinfo -o "%P %a %l %D %N %t"

# Node utilization
sinfo -N -o "%N %C %m %G"
```

### Advanced Slurm Commands

```bash
# Array jobs
sbatch --array=1-100 job.sh  # 100 jobs
sbatch --array=1-10%4 job.sh  # Max 4 concurrent
sbatch --array=0-15:4 job.sh  # Steps of 4

# Dependency jobs
sbatch --dependency=afterok:12345:12346 job.sh  # After jobs complete
sbatch --dependency=afterany:12345 job.sh  # After job finishes (any state)

# Reservation jobs
sbatch --reservation=reserved_name job.sh

# Exclusive node allocation
sbatch --exclusive job.sh

# Job steps within job
srun --ntasks=1 hostname  # Run on 1 task
srun --ntasks-per-node=4 ./my_program  # Run on 4 tasks per node
```

### Slurm Troubleshooting

```bash
# Check node status
sinfo -N -l

# Check why job is pending
squeue -j <job_id>

# Check job environment
scontrol show job <job_id>

# Diagnose failed job
sacct -j <job_id> --format=JobID,State,ExitCode,DerivedExitCode

# Check node features
scontrol show node -d | grep -i feature

# Test job allocation
srun --pty bash

# View job logs
cat job_<job_id>.out
cat job_<job_id>.err
```

### Common Slurm Environment Variables

```bash
# In job scripts, use these variables:
$SLURM_JOB_ID         # Job ID
$SLURM_JOB_NAME       # Job name
$SLURM_NODELIST       # Allocated nodes
$SLURM_NNODES         # Number of nodes
$SLURM_NTASKS         # Total tasks
$SLURM_CPUS_PER_TASK  # CPUs per task
$SLURM_SUBMIT_DIR     # Submit directory
$SLURM_ARRAY_TASK_ID  # Array task ID

# Example usage
echo "Running on $SLURM_NNODES nodes: $SLURM_NODELIST"
echo "Job ID: $SLURM_JOB_ID"
```

---

## Python GPU Memory Management

```bash
# Monitor GPU memory with Python
nvidia-smi --query-gpu=memory.used,memory.free --format=csv,noheader,nounits

# Clear GPU memory (requires killing processes)
pkill -9 python

# Set memory fraction in PyTorch
import torch
torch.cuda.set_per_process_memory_fraction(0.8)  # Use 80% of GPU memory

# Monitor memory in TensorFlow
import tensorflow as tf
tf.config.experimental.get_memory_info('GPU:0')
```

---

## ROCm (AMD GPU Support)

```bash
# Check ROCm version
rocminfo
rocm-smi

# GPU monitoring
rocm-smi --showuse
rocm-smi --showmem
rocm-smi --showtemp
rocm-smi --showpower

# Set power limit
rocm-smi --setpoweroverdrive 250

# Monitor continuously
watch -n 1 rocm-smi
```
