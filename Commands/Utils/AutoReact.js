const activeAutoReactListeners = new Map(); // Menyimpan listener untuk setiap channel

module.exports = {
    name: 'autoreact',
    description: 'Aktifkan atau nonaktifkan reaksi otomatis ke semua pesan di channel tertentu.',
    async execute(message, args) {
        const action = args[0]?.toLowerCase(); // `start` atau `stop`
        const emoji = args[1] || '👍'; // Emoji default
        const targetChannelId = args[2] || message.channel.id // ID channel target (default: channel tempat command dijalankan)

        const targetChannel = message.guild.channels.cache.get(targetChannelId);

        if (action === 'start') {
            if (activeAutoReactListeners.has(targetChannelId)) {
                return message.reply(`❌ Auto-react sudah aktif di channel <#${targetChannelId}>.`);
            }

            // Tambahkan listener untuk auto-react
            const onMessage = (msg) => {
                if (msg.channel.id === targetChannelId && !msg.author.bot) {
                    msg.react(emoji).catch(console.error);
                }
            };

            // Simpan listener ke dalam Map
            activeAutoReactListeners.set(targetChannelId, onMessage);
            message.client.on('messageCreate', onMessage);

            message.reply(`✅ Auto-react diaktifkan di channel <#${targetChannelId}> dengan emoji "${emoji}".`);
        } else if (action === 'stop') {

            // Hapus listener untuk channel target
            const onMessage = activeAutoReactListeners.get(targetChannelId);
            message.client.removeListener('messageCreate', onMessage);
            activeAutoReactListeners.delete(targetChannelId);

            message.reply(`✅ Auto-react dinonaktifkan di channel <#${targetChannelId}>.`);
        } else {
            return message.reply('❌ Harap gunakan `start` atau `stop`. Contoh: `!autoreact start 👍 <channelId>` atau `!autoreact stop <channelId>`.');
        }
    },
};