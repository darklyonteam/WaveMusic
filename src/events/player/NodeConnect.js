const { Event } = require('../../structures/index.js');

class NodeConnect extends Event {
    constructor(client, file) {
        super(client, file, {
            name: 'nodeConnect',
        });
    }

    async run(node) {
        this.client.logger.success(`Node ${node.name} is ready!`);
        const data = await this.client.prisma.stay.findMany();
        if (!data) return;

        for (const main of data) {
            const index = data.indexOf(main);
            setTimeout(async () => {
                const guild = this.client.guilds.cache.get(main.guildId);
                if (!guild) return;

                const channel = guild.channels.cache.get(main.textId);
                if (!channel) return;

                const vc = guild.channels.cache.get(main.voiceId);
                if (!vc) return;

                await this.client.queue.create(guild, vc, channel);
            }, index * 1000);
        }
    }
}

module.exports = NodeConnect;
