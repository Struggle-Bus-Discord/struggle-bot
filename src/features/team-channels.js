import _ from 'lodash'
import log from '../utils/logger.js'

let channelNames = [
    'Alpha Team',
    'Bravo Team',
    'Charlie Team',
    'Delta Team',
    'Echo Team',
    'Foxtrot Team',
    'Golf Team',
    'Hotel Team',
    'India Team',
    'Juliet Team',
    'Kilo Team',
    'Lima Team',
    'Mike Team',
    'November Team',
    'Oscar Team',
    'Papa Team'
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
                bitrate: 128000,
                position: gameVoiceCategory.children.size + 1
            })
        }
    },

    userLeftChannel : (channel) => {

        if(channelNames.includes(channel.name)){

            if(channel.members.size == 0){
                
                let allChannels = channel.parent.children
                for (var i = channelNames.length - 1; i >= 0; i--) {
                    
                    let currentChannelName = channelNames[i]
                    let previousChannelName = channelNames[i-1]
                    //log.debug("Checking item " + i + " " + currentChannelName + " " + previousChannelName)

                    if(currentChannelName && previousChannelName){

                        let currentChannel = allChannels.find(channel => channel.name == currentChannelName)
                        let previousChannel = allChannels.find(channel => channel.name == previousChannelName)

                        //log.debug("current: " + currentChannel.name + ":" + currentChannel.members.size)
                        //log.debug("previous: " + previousChannel.name + ":" + previousChannel.members.size)

                        if(currentChannel.members.size == 0 && previousChannel.members.size == 0){
                            log.info("Deleting channel " + currentChannel.name)
                            //currentChannel.delete()
                        }else{
                            //break;
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
                        name: nextChannelName
                    })
                }
            }
        }
    }
}
