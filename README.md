# DevOps Project: Full CI/CD Pipeline Implementation

## Project Overview
This project demonstrates a comprehensive DevOps workflow, showcasing the implementation of a Continuous Integration and Continuous Deployment (CI/CD) pipeline using industry-standard tools and cloud technologies.

## DevOps Technologies Stack
- **Version Control**: GitHub
- **CI/CD**: GitHub Actions
- **Containerization**: Docker
- **Container Security**: Trivy
- **Container Registry**: Docker Hub
- **Infrastructure as Code**: Terraform
- **Infrastructure Scanning**: Checkov
- **Cloud Provider**: AWS
- **Network Infrastructure**: AWS VPC
- **Compute**: AWS EC2
- **Web Server**: Nginx

## Pipeline Architecture
The project implements a full DevOps lifecycle:
1. **Source Control**: 
   - Code hosted on GitHub
   - Version controlled with Git
   - Branching and pull request workflows

2. **Continuous Integration**:
   - Automated builds using GitHub Actions
   - Code quality checks
   - Automated testing
   - Security scanning with Trivy

3. **Containerisation**:
   - Dockerised application
   - Optimised container images
   - Pushed to Docker Hub

4. **Infrastructure Provisioning**:
   - Terraform for infrastructure as code
   - Automated AWS VPC and EC2 instance creation
   - Checkov for infrastructure security scanning

5. **Deployment**:
   - Nginx server hosting
   - Automated deployment to AWS EC2 using Docker Image

## Key Learning Objectives
- Implement end-to-end CI/CD pipeline
- Understand cloud infrastructure management
- Learn container security best practices
- Automate deployment workflows
- Gain hands-on experience with DevOps tools

## Prerequisites
- GitHub Account
- AWS Account
- Docker
- Terraform
- Basic understanding of cloud and DevOps concepts


### Workflow Details

The GitHub Actions workflow does the following:

1. Builds the Docker image
2. Scans the image for vulnerabilities using Trivy
3. Runs container linting with Dockle
4. Pushes the image to Docker Hub (on main/master branch)
5. Creates a GitHub Release

### Security Scanning

- **Trivy**: Scans for OS and library vulnerabilities
- **Checkov**: Scans .tf files for misconfigurations

## Project Structure
```
ballsimulatorapp/
├── .github/
│   └── workflows/
│       └── ci-cd.yml
├── app/
│   ├── static/
│   │   ├── css/
│   │   └── js/
│   ├── templates/
│   │   └── index.html
│   └── app.py
├── infrastructure/
│   ├── main.tf
│   ├── variables.tf
│   └── outputs.tf
├── .gitignore
├── Dockerfile
├── README.md
└── requirements.txt
```

For detailed setup instructions, refer to the documentation in each component's directory.