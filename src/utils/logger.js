import _ from 'lodash'

export class Logger {

    constructor(config) {
        if(this.instance)return this.instance
        if(config && config.client)this.client = config.client;
        this.instance = this
    }

    debug(message) {
        console.log(message)
    }

    info(message) {        
        console.log(message);
        try {
            if(this.logChannel){
                this.logChannel.send(message);
            }else if(this.client && this.client.readyAt){
                this.logChannel = this.client.channels.cache.find(channel => channel.name == 'bot-logs')
            }
        }catch(e){
            console.log('PROBLEM OCCURED... Prevented server shutdown', e)
        }
    }
}

export default new Logger();