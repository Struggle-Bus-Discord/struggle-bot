# struggle-bot
Discord bot used for struggle bus server

## Server Setup Instructions
1. Install NodeJS and NPM
2. Globally install pm2
3. run `pm2 ecosystem && mv ecosystem.config.js ecosystem.config.cjs`
4. Add the BOT_TOKEN to the env variables of the ecosystem
5. run `pm2 startOrReload ecossystem.config.cjs`

TO monitor the bot run `pm2 monit`
