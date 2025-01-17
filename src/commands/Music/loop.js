const { Command } = require('../../structures/index.js');

class Loop extends Command {
    constructor(client) {
        super(client, {
            name: 'loop',
            description: {
                content: 'loop the current song or the queue',
                examples: ['loop', 'loop queue', 'loop song'],
                usage: 'loop',
            },
            category: 'general',
            aliases: ['loop'],
            cooldown: 3,
            args: false,
            player: {
                voice: true,
                dj: false,
                active: true,
                djPerm: null,
            },
            permissions: {
                dev: false,
                client: ['SendMessages', 'ViewChannel', 'EmbedLinks'],
                user: [],
            },
            slashCommand: true,
            options: [],
        });
    }
    async run(client, ctx) {
        const embed = client.embed().setColor(client.color.main);
        const player = client.queue.get(ctx.guild.id);
        switch (player.loop) {
            case 'off':
                player.loop = 'repeat';
                return await ctx.sendMessage({
                    embeds: [
                        embed.setDescription(`**Looping the song**`).setColor(client.color.main),
                    ],
                });
            case 'repeat':
                player.loop = 'queue';
                return await ctx.sendMessage({
                    embeds: [
                        embed.setDescription(`**Looping the queue**`).setColor(client.color.main),
                    ],
                });
            case 'queue':
                player.loop = 'off';
                return await ctx.sendMessage({
                    embeds: [
                        embed.setDescription(`**Looping is now off**`).setColor(client.color.main),
                    ],
                });
        }
    }
}


module.exports = Loop;