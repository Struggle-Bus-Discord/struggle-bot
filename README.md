# struggle-bot
Discord bot used for struggle bus server

## Local Development
Suggested Tools:
- Visual Studio Cod

### Setup
1. Clone the repository to a folder of your choice.
   `git clone https://github.com/osugregor/struggle-bot.git`
2. Create a `.env` file with the following content:
   ```
   BOT_TOKEN=<REDACTED>
   ```
   Obviously replacing the bot token with one provided by greg.

One word of caution when running locally is you may want to stop the one on the main server

## Server Setup Instructions
1. Install NodeJS and NPM
2. Globally install pm2
3. run `pm2 ecosystem && mv ecosystem.config.js ecosystem.config.cjs`
4. Add the BOT_TOKEN to the env variables of the ecosystem
5. run `pm2 startOrReload ecossystem.config.cjs`

TO monitor the bot run `pm2 monit`
