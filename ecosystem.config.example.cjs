module.exports = {
  apps : [{
    script: 'src/bot.js',
    node_args: "--experimental-modules",
    env: {
      "BOT_TOKEN": "<REDACTED>",
    }
  }]
};
