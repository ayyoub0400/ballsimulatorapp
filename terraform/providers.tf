# Terraform AWS Provider Configuration
terraform {
  cloud {
    organization = "ballsimulator"
    workspaces {
      name = "ballsimulatorapp"
    }
  }

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.0"
    }
  }
}

# Configure AWS Provider
provider "aws" {
  region = "us-east-1" # Choose your preferred region
}
