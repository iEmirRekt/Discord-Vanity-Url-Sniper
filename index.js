// https://discord.com/api/v9/guilds/{self.guild_id}/vanity-url
// https://discord.com/api/v9/invites/{self.vanity_url}?with_counts=true&with_expiration=true

const axios = require("axios");
const { vanity_url, guild_id, token } = require("./config");
const { chrome } = require('user-agents-generator');

class Sniper {
    constructor() {
        this.vanity_url = vanity_url;      
        this.guild_id = guild_id;
        this.token = token;

        this.headers = {"authorization": this.token, "user-agent": chrome()};
        
        this.payload = {"code": this.vanity_url};
    }

    checkVanityUrl(url) {
        axios({
            method: "get",
            url: `https://discord.com/api/v9/invites/${url}?with_counts=true&with_expiration=true`
        }).then((response) => {
            if(response.data) {
                return false
            }
        }).catch(() => {
            return true
        });
    }

    request(url) {
        axios({
            method: "post",
            url: `https://discord.com/api/v9/guilds/${url}/vanity-url`,
            headers: this.headers,
            data: this.payload
        }).then((response) => {
            if(response.data) {
                console.log(response.data)
            }
        }).catch((error) => {
            console.log(error)
        });
    }

    start() {
        if (this.checkVanityUrl(this.vanity_url)) {
            this.request(this.vanity_url)
        }
    }
}

setInterval(async () => {
    const sniper = new Sniper();
    await sniper.start();
}, 5000);

