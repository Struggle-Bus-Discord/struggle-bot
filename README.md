# STRUGGLE BOT
Discord bot used for the struggle bus server

**NOTE:** Any pushes to this repo will automatically trigger the Jenkins build and restart the server.

## Local Development
Suggested Tools:
- Visual Studio Code
- Newest version of Node and npm
- Git cli

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
3. run `mv ecosystem.config.example.js ecosystem.config.cjs`
4. Edit the ecosystem config to include the proper token
5. run `pm2 startOrReload ecossystem.config.cjs`

TO monitor the bot run `pm2 monit`
