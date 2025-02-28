const { tasks } = require("./Collect"); // Impor objek `tasks` dari file `collect.js`

module.exports = {
    name: "cstop",
    description: "Menghentikan semua tugas pengiriman pesan otomatis di channel tertentu.",
    ownerOnly: true,

    async execute(message, args) {
        const [channelId] = args;

        if (!channelId) {
            return message.reply("Gunakan: `z.stop <channelid>`");
        }

        // Periksa apakah ada tugas aktif untuk channel tersebut
        if (!tasks.has(channelId) || tasks.get(channelId).length === 0) {
            return message.reply(`Tidak ada tugas pengiriman pesan otomatis yang aktif di channel <#${channelId}>.`);
        }

        // Hentikan semua tugas untuk channel ini
        tasks.get(channelId).forEach((task) => clearInterval(task));
        tasks.delete(channelId); // Hapus semua tugas dari daftar

        return message.reply(`Semua tugas pengiriman pesan otomatis dihentikan untuk channel <#${channelId}>.`);
    }
};