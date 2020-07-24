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

let deletedChannels = []

export default {

    userLeftChannel : (channel) => {

        if(channels.includes(channel.name)){

            if(channel.members.size == 0){
                log.debug(`  - Nobody is left in ${channel.name}`)
                if(channel.name != channels[0]){
                    log.info("Deleting channel " + channel.name)
                    channel.delete();
                }

                // Loop through and delete all empty but the last

            }
        }
    },

    userEnteredChannel : (channel) => {

        if(channels.includes(channel.name)){

            // Check if the next name exists
            let currentChannelIndex = channels.indexOf(channel.name)
            
            log.debug(channel.name + " INDEX: " + currentChannelIndex)
            let nextChannelName = channels[currentChannelIndex + 1]
            if (channel.guild.channels.cache.find(channel => channel.name == nextChannelName)) { 
                log.debug("CHANNEL " + nextChannelName + " ALREADY EXISTS")
            }else{
                log.debug("CHANNEL " + nextChannelName + " DOES NOT EXISTS")
                channel.clone({
                    name: nextChannelName
                })
            }
        }
    }
}
