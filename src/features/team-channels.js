import _ from 'lodash'
import log from '../utils/logger.js'

let channelNames = [
    'Alpha Squad',
    'Bravo Squad',
    'Charlie Squad',
    'Delta Squad',
    'Echo Squad',
    'Foxtrot Squad',
    'Golf Squad',
    'Hotel Squad',
    'India Squad',
    'Juliet Squad',
    'Kilo Squad',
    'Lima Squad',
    'Mike Squad',
    'November Squad',
    'Oscar Squad',
    'Papa Squad',
    'Quebec Squad',
    'Romeo Squad',
    'Sierra Squad',
    'Tango Squad',
    'Uniform Squad',
    'Victor Squad',
    'Whiskey Squad',
    'Xray Squad',
    'Yankee Squad',
    'Zulu Squad'
]

export default {

    iniatalize : async (guild) => {
        let gameVoiceCategory = guild.channels.cache.find(channel => channel.name.includes('Game Voice Channels'))
        let voiceChannel = gameVoiceCategory.children.find(channel => channel.name == channelNames[0])

        if(!voiceChannel){
            log.debug("Creating game channel: " + channelNames[0])
            await guild.channels.create(channelNames[0], {
                type: 'voice',
                bitrate: 128000,
                parent: gameVoiceCategory,
            })
        }else{
            await voiceChannel.edit({
                bitrate: 128000
            })
        }
    },

    userLeftChannel : (channel) => {

        // If they left a team channel
        if(channelNames.includes(channel.name)){

            // And no one is left
            if(channel.members.size == 0){
                
                // In reverse direction
                for (var i = channelNames.length - 1; i >= 0; i--) {
                    
                    let currentChannelName = channelNames[i]
                    let previousChannelName = channelNames[i-1]
                    if(currentChannelName && previousChannelName){

                        let currentChannel = channel.parent.children.find(channel => channel.name == currentChannelName)

                        // If the current channel doesnt exist, try the next
                        if(!currentChannel)continue;

                        let previousChannel = channel.parent.children.find(channel => channel.name == previousChannelName)

                        // Else if this and the previous channel are zero, delete it
                        if(currentChannel.members.size == 0 && previousChannel.members.size == 0){
                            log.info("Deleting channel " + currentChannel.name)
                            currentChannel.delete()
                        }else{
                            break;
                        }
                    }
                }
            }
        }
    },

    userEnteredChannel : (channel) => {

        if(channelNames.includes(channel.name)){

            let nextChannelName = channelNames[channelNames.indexOf(channel.name) + 1]
            if(nextChannelName){

                let nextChannel = channel.guild.channels.cache.find(channel => channel.name == nextChannelName)
                if (!nextChannel){
                    log.debug("Creating new voice channel: " + nextChannelName)
                    channel.clone({
                        name: nextChannelName,
                        position: channel.position + 1
                    })
                }
            }
        }
    }
}
