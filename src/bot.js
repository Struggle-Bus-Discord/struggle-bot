import dotenv from 'dotenv'
import _ from 'lodash'
import * as Discord from 'discord.js'
import { Logger } from './utils/logger.js'
import GameChannels from './features/game-channels.js'
import TeamChannels from './features/team-channels.js'

dotenv.config()

let client = new Discord.Client()

let log = new Logger({client:client})

// when the client is ready, run this code
// this event will only trigger one time after logging in
client.on('ready', () => {

    log.info("Connected as " + client.user.tag)
    client.user.setActivity("with My Balls")
    log.debug("I am connected to the following guilds:")
    client.guilds.cache.forEach(async (guild) => {
        log.debug(`  - ${guild.name}`)
        await GameChannels.iniatalize(guild)
        await TeamChannels.iniatalize(guild)
    });

})

client.on('message', message => {

    let memberDisplayName = message.member ? message.member.displayName : 'Unknown'
    log.debug(`Message Recieved from ${memberDisplayName} in ${message.channel.name}: ${message.content}`)

    if (message.content === '!ping') {
        // send back "Pong." to the channel the message was sent in
        message.channel.send('Pong.');
        log.info("Ponged - Info Log")
        log.debug("Ponged - Debug Log")
    }

    if (message.content == '!clear' && message.channel.name == 'bot-logs'){
        async function clear() {
            do {
                await message.channel.bulkDelete(100, true);
            }
            while(message.channel.messages.cache.size >= 2);
        }
        clear()
    }
});

client.on("voiceStateUpdate", function(oldMember, newMember){

    // Check if any users are left in the old channel
    // If no users are left, we remove the public permissions
    if(oldMember && oldMember.channel){
        log.debug(`${oldMember.member.displayName} Left ${oldMember.channel.name}`)
        GameChannels.userLeftChannel(oldMember.channel)
        TeamChannels.userLeftChannel(oldMember.channel)
    }

    // The new channel, we add the public permissions
    if(newMember && newMember.channel){
        log.debug(`${newMember.member.displayName} Joined ${newMember.channel.name}`)        
        GameChannels.userEnteredChannel(newMember.channel)
        TeamChannels.userEnteredChannel(newMember.channel)
    }

});

// login to Discord with your app's token
client.login(process.env.BOT_TOKEN)
