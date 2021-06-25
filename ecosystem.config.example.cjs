module.exports = {
  apps : [{
    script: 'src/bot.js',
    env: {
      NODE_ENV: 'development',
      "BOT_TOKEN": "<REDACTED>",
    },
    env_production: {
      NODE_ENV: 'production'
    }
    
  }]
};
