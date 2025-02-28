const { joinVoiceChannel, getVoiceConnection } = require("@discordjs/voice");

module.exports = {
    name: "join",
    description: "Memungkinkan bot bergabung ke voice channel di server mana pun hanya dengan ID channel.",
    ownerOnly: true,
    async execute(message, args) {
        if (!args[0]) {
            return message.channel.send("Format penggunaan: `!joinvoice <ID_channel>`");
        }

        const channelId = args[0];

        let channel = null;
        message.client.guilds.cache.forEach(guild => {
            const foundChannel = guild.channels.cache.get(channelId);
            if (foundChannel && foundChannel.type === "GUILD_VOICE") {
                channel = foundChannel;
            }
        });

        try {
            const connection = joinVoiceChannel({
                channelId: channel.id,
                guildId: channel.guild.id,
                adapterCreator: channel.guild.voiceAdapterCreator,
                selfMute: false,
                selfDeaf: true,
                selfVideo: true,
            });
            message.channel.send(`**SUKSES!** Anda sekarang berada di <#${channel.id}>`);

        } catch (error) {
            console.error("Error saat mencoba bergabung ke voice channel:", error);
            message.channel.send("Gagal bergabung ke voice channel. Pastikan bot memiliki izin.");
        }
    },
};
