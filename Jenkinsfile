pipeline {
    agent any

    stages {
        stage('Clone') {
            steps {
                git 'https://github.com/ayhemnouira/Devops.git'
            }
        }

        stage('Test Backend') {
            steps {
                dir('backend') {
                    sh './mvnw test'
                }
            }
        }

        stage('Test Frontend') {
            steps {
                dir('frontend') {
                    sh 'npm install'
                    sh 'npm run test -- --watch=false --browsers=ChromeHeadless'
                }
            }
        }

        stage('Docker Build') {
            steps {
                sh 'docker build -t heuresplus-backend ./backend'
                sh 'docker build -t heuresplus-frontend ./frontend'
            }
        }
    }
}
