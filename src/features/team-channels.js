import _ from 'lodash'
import log from '../utils/logger.js'

let channels = [
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

        if(channels.includes(channel.name)){

            if(channel.members.size == 0){
                log.debug(`  - Nobody is left in ${channel.name}`)
                if(channel.name != channels[0]){
                    log.info("Deleting channel " + channel.name)
                    channel.delete();
                }
            }
        }
    },

    userEnteredChannel : (channel, guild) => {

        if(channels.includes(channel.name)){

            // Check if the next name exists
            let currentChannelIndex = channels.indexOf(channel.name)
            
            log.debug(channel.name + " INDEX: " + currentChannelIndex)
            log.debug(guild.channels.cache)
            // if (guild.channels.cache.find(channel => channel.name == channels[currentChannelIndex + 1])) { 
            //     log.debug("CHANNEL " + channels[currentChannelIndex + 1] + " ALREADY EXISTS")
            // }else{
            //     log.debug("CHANNEL " + channels[currentChannelIndex + 1] + " DOES NOT EXISTS")
            // }
        }
    }
}
