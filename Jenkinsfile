node(){
  stage('Prepare'){
    checkout scm
  }
  
  stage('Build'){
    sh "npm install"
    sh "pm2 start src/bot.js"
  }
}
