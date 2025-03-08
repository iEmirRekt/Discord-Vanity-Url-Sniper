// https://discord.com/api/v9/guilds/{self.guild_id}/vanity-url
// https://discord.com/api/v9/invites/{self.vanity_url}?with_counts=true&with_expiration=true

const axios = require("axios");

async function checkVanityUrl(url) {
    axios({
        method: "get",
        url: `https://discord.com/api/v9/invites/${url}?with_counts=true&with_expiration=true`,
    }).then((response) => {
        console.log(response.data);
    }).catch((error) => {
        console.error(error);
    });
}