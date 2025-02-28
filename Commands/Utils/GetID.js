module.exports = {
    name: "getid",
    description: "Mendapatkan ID dari sebuah channel.",
    ownerOnly: true,

    async execute(message, args) {
        // Jika argumen tidak diberikan, gunakan channel tempat pesan dikirim
        if (args.length === 0) {
            return message.reply(`ID dari channel ini adalah: \`${message.channel.id}\``);
        }

        // Jika channel disebutkan melalui argumen
        const channelMention = args[0];

        // Mengecek apakah argumen berupa mention channel
        const channelIdMatch = channelMention.match(/^<#(\d+)>$/);

        if (channelIdMatch) {
            const channelId = channelIdMatch[1];
            return message.reply(`ID dari channel ${channelMention} adalah: \`${channelId}\``);
        } else {
            return message.reply("Format salah! Gunakan command tanpa argumen untuk mendapatkan ID channel saat ini, atau mention channel untuk mendapatkan ID-nya.");
        }
    }
};