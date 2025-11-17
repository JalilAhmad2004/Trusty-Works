pipeline {
    agent any

    environment {
        VERSION = "1.0.0"
    }

    stages {
        stage('Build') {
            steps {
                echo "Building version: ${env.VERSION}"
                // Here you can define commands for your build
            }
        }

        stage('Test') {
            when {
                branch 'main'
            }
            steps {
                echo 'Testing..'
                // Here you can define commands for your tests
            }
        }

        stage('Deploy') {
            steps {
                echo 'Deploying....'
                // Here you can define commands for your deployment
            }
        }
    }

    post {
        always {
            echo 'Pipeline completed!'
        }
    }
}
