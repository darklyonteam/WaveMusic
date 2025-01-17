const { ApplicationCommandOptionType } = require('discord.js');
const { Command } = require('../../structures/index.js');

class Speed extends Command {
    constructor(client) {
        super(client, {
            name: 'speed',
            description: {
                content: 'Sets the speed of the song',
                examples: ['speed 1.5'],
                usage: 'speed <number>',
            },
            category: 'filters',
            aliases: ['speed'],
            cooldown: 3,
            args: true,
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
            options: [
                {
                    name: 'speed',
                    description: 'The speed you want to set',
                    type: ApplicationCommandOptionType.Integer,
                    required: true,
                },
            ],
        });
    }
    async run(client, ctx, args) {
        const player = client.queue.get(ctx.guild.id);
        const speed = Number(args[0]);
        if (isNaN(speed))
            return await ctx.sendMessage({
                embeds: [
                    {
                        description: 'Please provide a valid number',
                        color: client.color.red,
                    },
                ],
            });
        if (speed < 0.5 || speed > 5)
            return await ctx.sendMessage({
                embeds: [
                    {
                        description: 'Please provide a number between 0.5 and 5',
                        color: client.color.red,
                    },
                ],
            });
        player.player.setTimescale({ speed: speed });
        return await ctx.sendMessage({
            embeds: [
                {
                    description: `Speed has been set to ${speed}`,
                    color: client.color.main,
                },
            ],
        });
    }
}

module.exports = Speed;