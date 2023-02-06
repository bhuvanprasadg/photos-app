pipeline{
  agent any
  environment{
    GITHUB_PROJECT_URL = "https://github.com/bhuvi-12/photos-app.git"
    GITHUB_CREDENTIALS = "repo-credentials"
    GITHUB_BRANCH = "master"
    AWS_ACCOUNT_ID = "347476671573"
    AWS_REGION = "us-east-1"
    AWS_JENKINS_CREDENTIALS_ID = "aws-credentials"
    AWS_ECR_IMAGE = "uat-bki-fe-test"
    AWS_EKS_CLUSTER_NAME = "uat-bki-eks-cluster"
    EKS_NAMESPACE = "uat-test"
    EKS_DEPLOYMENT_FILE = "deployment.yaml"
    EKS_DEPLOYMENT_NAME = "photosapplication-deployment"
    RUNNING_CONTAINER_NAME = "photos-application"
  }
  stages{
    stage('Code checkout'){
      script{
        git branch: "${GITHUB_BRANCH}", url: "${GITHUB_PROJECT_URL}", credentialsId: "${GITHUB_CREDENTIALS}"
      }
    }
    
    stage('Docker Image Build & Push to ECR'){
      script{
        BUILD_NUMBER = currentBuild.number
        IMAGE_VERSION = "v${BUILD_NUMBER}"
        docker.withRegistry(
            "https://${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com",
            "ecr:${AWS_REGION}:${AWS_JENKINS_CREDENTIALS_ID}") {
            def dockerImage = docker.build("${AWS_ECR_IMAGE}:${IMAGE_VERSION}")
            dockerImage.push()
      }
    }
    
    stage("Docker image scan"){
        sh "trivy --no-progress --severity HIGH,CRITICAL ${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/${AWS_ECR_IMAGE}:${IMAGE_VERSION}"
    }
    
    stage('Deploying ECR image to EKS cluster'){
      script{
        BUILD_NUMBER = currentBuild.number
        IMAGE_VERSION = "v${BUILD_NUMBER}"
        withAWS(credentials: "${AWS_JENKINS_CREDENTIALS_ID}", region: "${AWS_REGION}") {
              sh "aws eks update-kubeconfig --region ${AWS_REGION} --name ${AWS_EKS_CLUSTER_NAME}"
              sh "kubectl set image deployment.apps/${EKS_DEPLOYMENT_NAME} -n ${EKS_NAMESPACE} ${RUNNING_CONTAINER_NAME}=${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/${AWS_ECR_IMAGE}:${IMAGE_VERSION}"
              sh "kubectl rollout status deployment/${EKS_DEPLOYMENT_NAME} -n ${EKS_NAMESPACE}"
        }
      }
    }
  }
}
}
