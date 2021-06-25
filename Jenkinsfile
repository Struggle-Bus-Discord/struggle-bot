node(){
  stage('Prepare'){
    sh "ls -la"
    checkout scm
  }
  
  stage('Build'){
    sh "npm install"
    sh "ls -la"
    sh "pm2 startOrReload ecosystem.config.cjs"
  }
}
