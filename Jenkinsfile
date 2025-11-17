pipeline {
    agent any

    tools {
        maven 'Maven3'
    }

    environment {
        VERSION = "1.0.0"
    }

    parameters {
        booleanParam(
            name: 'executeTests',
            defaultValue: true,
            description: 'If true, run the Test stage'
        )
    }

    stages {
        stage('Build') {
            steps {
                echo "Building version: ${env.VERSION}"
                bat "mvn -version"
            }
        }

        stage('Test') {
            when {
                allOf {
                    branch 'main'
                    expression { params.executeTests }
                }
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
