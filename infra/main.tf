terraform {
  required_providers {
    aws = {
      source = "hashicorp/aws"
    }
  }

  required_version = ">= 1.2.0"
}

provider "aws" {
  region  = "eu-west-2"
  profile = "george"
}

module "storage" {
  source      = "./s3"
  bucket_name = "${var.app_name}-bucket"
}

module "lambda" {
  depends_on     = [module.storage]
  source         = "./lambda"
  function_name  = "${var.app_name}-api"
  storage_bucket = module.storage.bucket_name
  storage_key    = module.storage.object_key
}

module "api-gateway" {
  depends_on           = [module.lambda]
  source               = "./gateway"
  gateway_name         = "${var.app_name}-gateway"
  lambda_function_name = module.lambda.lambda_function_name
}