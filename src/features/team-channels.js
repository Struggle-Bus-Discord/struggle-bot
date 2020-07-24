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

    userLeftChannel : (channel) => {

        if(channelNames.includes(channel.name)){

            if(channel.members.size == 0){
                
                let allChannels = channel.parent.children
                log.debug(allChannels.size)
                for (var i = allChannels.size - 1; i >= 0; i--) {

                    log.debug("Checking item " + i)
                    let currentChannel = allChannels[i]
                    log.debug(currentChannel)
                    let previousChannel = allChannels[i-1]
                    log.debug(previousChannel)

                    if(currentChannel && previousChannel){
                        log.debug("current: " + currentChannel.name + ":" + currentChannel.members.size)
                        log.debug("previous: " + previousChannel.name + ":" + previousChannel.members.size)

                        if(currentChannel.members.size == 0 && previousChannel.members.size == 0){
                            log.info("Deleting channel " + channel.name)
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
                        name: nextChannelName
                    })
                }
            }
        }
    }
}
