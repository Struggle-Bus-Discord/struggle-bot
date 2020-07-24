module.exports = {
  apps : [{
    script: 'src/bot.js',
    watch: 'src/',
    env: {
      "BOT_TOKEN": "<REDACTED>",
    }
  }]
};
