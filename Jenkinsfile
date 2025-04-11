pipeline {
    agent any

    stages {

        stage('Test Backend') {
            steps {
                dir('HeuresPlus') {
                    sh './mvnw test'
                }
            }
        }

        stage('Test Frontend') {
            steps {
                dir('heuresplusfrontend') {
                    sh 'npm install'
                    sh 'npm run test -- --watch=false --browsers=ChromeHeadless'
                }
            }
        }

        stage('Docker Build') {
            steps {
                sh 'docker build -t heuresplus-backend ./HeuresPlus'
                sh 'docker build -t heuresplus-frontend ./heuresplusfrontend'
            }
        }
    }
}
