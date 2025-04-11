pipeline {
    agent any

    environment {
        DOCKERHUB_CREDENTIALS = credentials('dockerhub-creds')
        DB_URL = 'jdbc:mysql://db:3306/heuresPlusDB'
        VERSION = "${env.BUILD_ID}"
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', 
                url: 'https://github.com/ayhem/Devops.git',
                credentialsId: 'github-credentials'
            }
        }

        stage('Build Backend') {
            steps {
                dir('HeuresPlus') {
                    sh 'mvn clean package -DskipTests'
                    archiveArtifacts artifacts: 'target/*.jar', fingerprint: true
                }
            }
        }

        stage('Test Backend') {
            steps {
                dir('HeuresPlus') {
                    sh 'mvn test'
                    junit 'target/surefire-reports/**/*.xml'
                    archiveArtifacts artifacts: 'target/surefire-reports/**/*.*', fingerprint: true
                }
            }
        }

        stage('Build Frontend') {
            steps {
                dir('heuresplusfrontend') {
                    sh 'npm install'
                    sh 'npm run build'
                    archiveArtifacts artifacts: 'build/**/*', fingerprint: true
                }
            }
        }

        stage('Build Docker Images') {
            steps {
                script {
                    // Backend image
                    docker.build("ayhem/heuresplus-backend:${VERSION}", './HeuresPlus').push()
                    
                    // Frontend image
                    docker.build("ayhem/heuresplus-frontend:${VERSION}", './heuresplusfrontend').push()
                    
                    // Tag latest
                    docker.withRegistry('https://registry.hub.docker.com', 'dockerhub-creds') {
                        docker.image("ayhem/heuresplus-backend:${VERSION}").push('latest')
                        docker.image("ayhem/heuresplus-frontend:${VERSION}").push('latest')
                    }
                }
            }
        }

        stage('Deploy to Staging') {
            when {
                branch 'main'
            }
            steps {
                sshPublisher(
                    publishers: [
                        sshPublisherDesc(
                            configName: 'staging-server',
                            transfers: [
                                sshTransfer(
                                    execCommand: """
                                    docker pull ayhem/heuresplus-backend:${VERSION}
                                    docker pull ayhem/heuresplus-frontend:${VERSION}
                                    docker-compose -f docker-compose.yml down
                                    docker-compose -f docker-compose.yml up -d
                                    """
                                )
                            ],
                            usePromotionTimestamp: true
                        )
                    ]
                )
            }
        }

        stage('Run Integration Tests') {
            steps {
                dir('HeuresPlus') {
                    sh 'mvn verify -DskipUnitTests=true'
                    junit 'target/failsafe-reports/**/*.xml'
                }
            }
        }

        stage('Deploy to Production') {
            when {
                branch 'production'
            }
            steps {
                timeout(time: 15, unit: 'MINUTES') {
                    input message: 'Approuver le déploiement en production?', ok: 'Déployer'
                }
                sshPublisher(
                    publishers: [
                        sshPublisherDesc(
                            configName: 'production-server',
                            transfers: [
                                sshTransfer(
                                    execCommand: """
                                    docker pull ayhem/heuresplus-backend:${VERSION}
                                    docker pull ayhem/heuresplus-frontend:${VERSION}
                                    docker-compose -f docker-compose.prod.yml down
                                    docker-compose -f docker-compose.prod.yml up -d
                                    """
                                )
                            ],
                            usePromotionTimestamp: true
                        )
                    ]
                )
            }
        }
    }

    post {
        always {
            cleanWs()
        }
        success {
            slackSend channel: '#devops',
                     color: 'good',
                     message: "Build ${env.BUILD_NUMBER} réussi - ${env.JOB_NAME}"
        }
        failure {
            slackSend channel: '#devops',
                     color: 'danger',
                     message: "Build ${env.BUILD_NUMBER} échoué - ${env.JOB_NAME}"
        }
    }
}
