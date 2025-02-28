module.exports = {
    name: 'tebakangka', // Nama command
    description: 'Permainan tebak angka dengan penyesuaian rentang angka dan multiplayer mode.',
    execute: async (message, args) => {
        // Validasi argumen untuk rentang angka
        let min = 1;
        let max = 100;

        if (args.length === 2) {
            const parsedMin = parseInt(args[0], 10);
            const parsedMax = parseInt(args[1], 10);
            if (!isNaN(parsedMin) && !isNaN(parsedMax) && parsedMin < parsedMax) {
                min = parsedMin;
                max = parsedMax;
            } else {
                return message.reply("Rentang angka tidak valid! Gunakan format `!tebakangka <min> <max>`. Contoh: `!tebakangka 1 500`.");
            }
        }

        const targetNumber = Math.floor(Math.random() * (max - min + 1)) + min;

        message.reply(`Saya telah memilih angka antara **${min}** hingga **${max}**. Semua orang bisa ikut bermain! Ketik angkanya di chat untuk menebak. Waktu: 30 detik.`);

        // Fungsi untuk mendeteksi tebakan pemain
        const filter = (m) => !isNaN(m.content) && m.channel.id === message.channel.id;
        const collector = message.channel.createMessageCollector({ filter, time: 30000 }); // 30 detik waktu maksimum

        let winner = null;

        collector.on('collect', (m) => {
            const userGuess = parseInt(m.content, 10);

            if (userGuess === targetNumber) {
                winner = m.author;
                message.channel.send(`🎉 Selamat **${m.author.displayName}**! Kamu berhasil menebak angka yang benar : **${targetNumber}**.`);
                collector.stop('found'); // Menghentikan permainan karena ada pemenang
            } else if (userGuess < targetNumber) {
                m.reply("Terlalu rendah! Coba lagi.");
            } else if (userGuess > targetNumber) {
                m.reply("Terlalu tinggi! Coba lagi.");
            }
        });

        collector.on('end', (collected, reason) => {
            if (reason !== 'found') {
                message.reply(`Waktu habis! Tidak ada yang berhasil menebak. Angka yang benar adalah **${targetNumber}**.`);
            }
        });
    },
};