node(){
  stage('Prepare'){
    sh "ls -la"
    checkout scm
    sh "ls -la"
  }
  
  stage('Build'){
    sh "npm install"
    sh "pm2 startOrReload ecossystem.config.cjs"
  }
}
