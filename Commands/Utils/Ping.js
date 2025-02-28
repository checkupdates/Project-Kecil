const ownerID = "788520888395104266"

module.exports = {
    name: "ping",
    description: "Mengukur latensi bot.",
    execute: async (message) => {
        if (message.author.id !== ownerID) {
            message.reply('Kamu tidak memiliki akses ini!');
            return;
        }
        const msg = await message.reply("Pinging...");
        const ping = msg.createdTimestamp - message.createdTimestamp;
        msg.edit(`Pong! Latency is ${ping}ms.`);
    },
};
