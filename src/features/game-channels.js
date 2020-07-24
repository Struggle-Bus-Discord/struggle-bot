import _ from 'lodash'
import log from '../utils/logger.js'

const startAfterChannel = 'General'
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

export default {

    iniatalize : async (guild) => {
        let gameVoiceCategory = guild.channels.cache.find(channel => channel.name.includes('Game Voice Channels'))
        let gameVoiceChannels = gameVoiceCategory.children
        let positionOffset = gameVoiceChannels.find(channel => channel.name == startAfterChannel).position

        for (let i = 0; i < games.length; i++) {
            let game = games[i]
            let voiceChannel = gameVoiceChannels.find(channel => channel.name == game.name)
            let gameRole = guild.roles.cache.find(role => role.name == game.role)

            let commonProperties = {
                bitrate: 128000,
                position: positionOffset + 1 + i,
                permissionOverwrites: [
                    {
                        id: guild.roles.everyone,
                        deny: ['VIEW_CHANNEL']
                    },
                    {
                        id: gameRole,
                        allow: ['VIEW_CHANNEL']
                    }
                ]
            }

            if(!voiceChannel){
                log.debug("Creating game channel: " + game.name + ' tied to role ' + gameRole.name)
                await guild.channels.create(game.name, _.merge({
                    type: 'voice',
                    parent: gameVoiceCategory,
                }, commonProperties))
            }else{
                await voiceChannel.edit(commonProperties)
            }
        };
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
