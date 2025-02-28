module.exports = {
    name: "cname",
    description: "Mengubah nickname Anda di server saat ini",
    ownerOnly: true,
    async execute(message, args) {
        // Memastikan bahwa command dijalankan di dalam server
        if (!message.guild) {
            return message.channel.send("Command ini hanya bisa dijalankan di dalam server.");
        }

        // Mengecek apakah nickname baru diberikan sebagai argumen
        if (!args[0]) {
            return message.channel.send("Format penggunaan: `!cname <nickname_baru>`");
        }

        const newNickname = args.join(" ");

        try {
            // Mengubah nickname user di server saat ini
            await message.guild.members.me.setNickname(newNickname);
            message.channel.send(`Nickname Berhasil Diubah!
Nickname: **${newNickname}**
Server: **${message.guild.name}**`);
        } catch (error) {
            console.error("Gagal mengubah nickname:", error);
            message.channel.send("Gagal mengubah nickname. Pastikan bot memiliki izin yang diperlukan di server ini.");
        }
    },
};
