module.exports = {
    name: 'roulette',
    description: 'Mainkan roulette dan lihat apakah Anda menang atau kalah.',

    async execute(message, args) {
        // Validasi input
        if (args.length === 0) {
            return message.reply(
                '⚠️ Format: `.roulette <bet>`\nContoh: `.roulette red`, `.roulette 7`, `.roulette black`.'
            );
        }

        const bet = args[0].toLowerCase(); // Taruhan pengguna (angka atau warna)
        const rouletteNumbers = Array.from({ length: 37 }, (_, i) => i); // Angka 0-36
        const colors = {
            red: [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36],
            black: [2, 4, 6, 8, 10, 11, 13, 15, 17, 20, 22, 24, 26, 28, 29, 31, 33, 35],
            green: [0],
        };

        // Putar roda roulette
        const spin = rouletteNumbers[Math.floor(Math.random() * rouletteNumbers.length)];
        const spinColor = Object.keys(colors).find((color) => colors[color].includes(spin));

        // Evaluasi hasil
        let resultMessage = `🎡 Roulette berhenti di angka **${spin}** (${spinColor.toUpperCase()})!\n`;

        if (bet === spin.toString()) {
            // Taruhan angka
            resultMessage += `🎉 Selamat! Anda menang dengan taruhan angka **${spin}**!`;
        } else if (bet === spinColor) {
            // Taruhan warna
            resultMessage += `🎉 Selamat! Anda menang dengan taruhan warna **${spinColor.toUpperCase()}**!`;
        } else {
            // Kalah
            resultMessage += `😢 Maaf, Anda kalah.`;
        }

        // Kirim hasil
        return message.channel.send(resultMessage);
    },
};