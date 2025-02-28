const { getVoiceConnection } = require("@discordjs/voice");

module.exports = {
    name: "leave",
    description: "Membuat bot keluar dari voice channel.",
    ownerOnly: true,
    async execute(message) {
        const connection = getVoiceConnection(message.guild.id);

        // Cek apakah bot ada di voice channel
        if (!connection) {
            return message.channel.send("Bot tidak berada di voice channel manapun.");
        }

        try {
            connection.destroy();
            message.channel.send("> Disconnected!");
        } catch (error) {
            console.error("Error saat mencoba keluar dari voice channel:", error);
            message.channel.send("Gagal keluar dari voice channel.");
        }
    },
};
