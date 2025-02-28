module.exports = {
    name: 'purgeall',
    description: 'Menghapus semua pesan Anda sendiri di DM hingga tidak ada pesan yang tersisa',

    async execute(message) {
        if (message.channel.type !== 'DM') {
            return message.reply('⚠️ Command ini hanya bisa digunakan di DM.');
        }

        let totalDeleted = 0;

        try {
            let lastMessageId = null;

            while (true) {
                // Ambil maksimal 100 pesan per permintaan
                const messages = await message.channel.messages.fetch({
                    limit: 100,
                    before: lastMessageId, // Ambil pesan sebelum ID terakhir
                });

                if (messages.size === 0) break; // Tidak ada pesan lagi untuk dihapus

                const myMessages = messages.filter((msg) => msg.author.id === message.author.id);

                for (const msg of myMessages.values()) {
                    try {
                        await msg.delete(); // Hapus pesan
                        totalDeleted++;
                    } catch (error) {
                        console.log(`Gagal menghapus pesan ${msg.id}: ${error.message}`);
                    }
                }

                lastMessageId = messages.last()?.id; // Simpan ID terakhir
                if (!lastMessageId) break; // Tidak ada lagi pesan
            }

            await message.channel.send(`✅ Semua pesan Anda telah dihapus (${totalDeleted} pesan).`);
        } catch (error) {
            console.error(`Error: ${error.message}`);
            return message.channel.send('❌ Terjadi kesalahan saat mencoba menghapus pesan.');
        }
    },
};
