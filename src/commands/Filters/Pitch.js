const { ApplicationCommandOptionType } = require('discord.js');
const { Command } = require('../../structures/index.js');

class Pitch extends Command {
    constructor(client) {
        super(client, {
            name: 'pitch',
            description: {
                content: 'on/off the pitch filter',
                examples: ['pitch 1'],
                usage: 'pitch <number>',
            },
            category: 'filters',
            aliases: ['ph'],
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
                    name: 'number',
                    description: 'The number you want to set the pitch to',
                    type: ApplicationCommandOptionType.Integer,
                    required: true,
                },
            ],
        });
    }
    async run(client, ctx, args) {
        const player = client.queue.get(ctx.guild.id);
        const number = Number(args[0]);
        if (isNaN(number))
            return await ctx.sendMessage({
                embeds: [
                    {
                        description: 'Please provide a valid number',
                        color: client.color.red,
                    },
                ],
            });
        if (number > 5 || number < 1)
            return await ctx.sendMessage({
                embeds: [
                    {
                        description: 'Please provide a number between 1 and 5',
                        color: client.color.red,
                    },
                ],
            });
        player.player.setTimescale({ pitch: number, rate: 1, speed: 1 });
        return await ctx.sendMessage({
            embeds: [
                {
                    description: `Pitch has been set to ${number}`,
                    color: client.color.main,
                },
            ],
        });
    }
}

module.exports = Pitch;