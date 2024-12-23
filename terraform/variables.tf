variable "instance_type" {
  description = "EC2 instance type"
  type = string
}

variable "ami_id" {
  description = "AMI ID"
  type = string
}

variable "dockerhub_username" {
  description = "DockerHub username"
  type = string
}

variable "docker_image" {
  description = "Docker image"
  type = string
}