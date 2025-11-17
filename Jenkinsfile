pipeline {
    agent any

    tools {
        maven 'Maven3'
    }

    environment {
        VERSION = "1.0.0"
    }

    stages {
        stage('Build') {
            steps {
                echo "Building version: ${env.VERSION}"
                // On Windows, use bat instead of sh
                bat "mvn -version"
            }
        }

        stage('Test') {
            when {
                branch 'main'
            }
            steps {
                echo 'Testing..'
            }
        }

        stage('Deploy') {
            steps {
                echo 'Deploying....'
            }
        }
    }

    post {
        always {
            echo 'Pipeline completed!'
        }
    }
}
