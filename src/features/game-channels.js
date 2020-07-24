import _ from 'lodash'
import log from '../utils/logger.js'

const games = [
    {
        name: 'Call of Duty Modern Warfare',
        role: 'Call of Duty MW'
    },
    {
        name: 'Dauntless'
    },
    {
        name: 'Destiny 2'
    },
    {
        name: 'Fortnite'
    },
    {
        name: 'Grand Theft Auto 5'
    },
    {
        name: 'Minecraft'
    },
    {
        name: 'Rocket League'
    },
    {
        name: 'Sea of Thieves'
    },
    {
        name: 'Stardew Valley'
    }
]

// Set up some default properties
_.forEach(games, (game) => {
    if(!game['voiceChannel']){
        game.voiceChannel = game.name
    }
    if(!game['role']){
        game.role = game.name
    }
})

//log.info("Game configs found:")
//log.info(games)

export default {

    iniatalize : (guild) => {
        // TODO MAKE SURE WE ARE STUGGLE BUS
        log.debug(guild.channels.cache.find(channel => channel.name = 'Game Voice Channels'))

    },

    userLeftChannel : (channel) => {
        if(channel.parent.name.includes("Game Voice Channels")){
            if(channel.members.size == 0){
                log.debug(`  - Nobody is left in ${channel.name}`)

                let game = _.find(games, ['voiceChannel', channel.name])
                if(game){
                    log.info(`    - Removing public permissions from ${channel.name}`)
                    channel.updateOverwrite(channel.guild.roles.everyone, { VIEW_CHANNEL: false })
                }
            }
        }
    },

    userEnteredChannel : (channel) => {
        if(channel.parent.name.includes("Game Voice Channels")){
            let game = _.find(games, ['voiceChannel', channel.name])
            if(game){
                log.info(`  - Adding public permissions to ${channel.name}`)
                channel.updateOverwrite(channel.guild.roles.everyone, { VIEW_CHANNEL: true })
            }
        }
    }
}
