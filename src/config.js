require("dotenv").config();

module.exports = {
  token: process.env.TOKEN || 'MTE5MjQ1NzM1Mjc4MDIwMjA0NA.G2AmJq.mKukd6flwHeenAZXw5Rr9oPVu4qwLmFTPZkNdU', // your discord bot token
  prefix: process.env.PREFIX || '/', // bot prefix
  ownerID: process.env.OWNERID || ['1153172663838195724'], //your discord id
  SpotifyID: process.env.SPOTIFYID || 'cb41529dc3bd4d8f8a240dbee0fff4e8', // spotify client id
  SpotifySecret: process.env.SPOTIFYSECRET || 'bcca82f42930498aa385a8289fdf276b', // spotify client secret
  mongourl: process.env.MONGO_URI || 'mongodb+srv://aromaxdev:diwasatreya@youtube.rn0v74r.mongodb.net/?retryWrites=true&w=majority', // MongoDb URL
  embedColor: process.env.COlOR || '#2B2928', // embed colour
  logs: process.env.LOGS || '976061600987504690', // Discord channel id 
  links: {
    support: process.env.SUPPORT || 'https://discord.gg/dDwA7wUX',
    invite: process.env.INVITE || 'https://discord.com/api/oauth2/authorize?client_id=1192457352780202044&permissions=0&scope=bot+applications.commands',
    vote: process.env.VOTE || 'https://aromaxdev.xyz/discord',
    bg: process.env.BG || 'https://media.discordapp.net/attachments/1028936089555193887/1029023341312487505/musicplayer-home.png'
  },

  nodes: [
    {
      url: process.env.NODE_URL || 'lavalink.lexnet.cc:443',
      name: process.env.NODE_NAME || 'lavalink.lexnet.cc',
      auth: process.env.NODE_AUTH || 'lexn3tl@val!nk',
      secure: parseBoolean(process.env.NODE_SECURE || 'true'),
    },
  ],
};

function parseBoolean(value){
    if (typeof(value) === 'string'){
        value = value.trim().toLowerCase();
    }
    switch(value){
        case true:
        case "true":
            return true;
        default:
            return false;
    }
}
