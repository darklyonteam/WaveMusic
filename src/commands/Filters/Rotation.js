const { Command } = require('../../structures/index.js');

class Rotation extends Command {
    constructor(client) {
        super(client, {
            name: 'rotation',
            description: {
                content: 'on/off rotation filter',
                examples: ['rotation'],
                usage: 'rotation',
            },
            category: 'filters',
            aliases: ['rt'],
            cooldown: 3,
            args: false,
            player: {
                voice: true,
                dj: true,
                active: true,
                djPerm: null,
            },
            permissions: {
                dev: false,
                client: ['SendMessages', 'ViewChannel', 'EmbedLinks'],
                user: ['ManageGuild'],
            },
            slashCommand: true,
            options: [],
        });
    }
    async run(client, ctx) {
        const player = client.queue.get(ctx.guild.id);
        if (player.filters.includes('rotation')) {
            player.player.setRotation();
            player.filters.splice(player.filters.indexOf('rotation'), 1);
            ctx.sendMessage({
                embeds: [
                    {
                        description: 'rotation filter has been disabled',
                        color: client.color.main,
                    },
                ],
            });
        }
        else {
            player.player.setRotation({ rotationHz: 0 });
            player.filters.push('rotation');
            ctx.sendMessage({
                embeds: [
                    {
                        description: 'rotation filter has been enabled',
                        color: client.color.main,
                    },
                ],
            });
        }
    }
}

module.exports = Rotation;