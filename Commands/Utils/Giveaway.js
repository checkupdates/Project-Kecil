const ms = require('ms'); // Instal pustaka "ms" untuk parsing durasi waktu

module.exports = {
    name: 'giveaway',
    description: 'Mulai giveaway dengan beberapa pemenang dan countdown real-time di output durasi.',
    async execute(message, args) {
        const action = args[0]?.toLowerCase(); // `start` atau `end`

        if (action === 'start') {
            const durationInput = args[1]; // Durasi (contoh: 1m, 30s)
            const winnersCount = parseInt(args[2], 10); // Jumlah pemenang
            const prize = args.slice(3).join(' '); // Hadiah giveaway

            if (!durationInput || isNaN(winnersCount) || !prize) {
                return message.reply(
                    '❌ Harap berikan durasi, jumlah pemenang, dan hadiah giveaway.\nContoh: `!giveaway start 1m 2 Nitro Classic`'
                );
            }

            // Konversi durasi ke milidetik
            const totalDuration = ms(durationInput);
            if (!totalDuration) {
                return message.reply('❌ Format durasi tidak valid. Gunakan format seperti `1m`, `30s`, atau `2h`.');
            }

            let timeLeft = totalDuration; // Waktu tersisa
            const initialMessage = await message.channel.send(`
**═══════════════════════════════**
**GIVEAWAY DIMULAI!**
**═══════════════════════════════**

🎁 **Hadiah**: ${prize}
🏆 **Jumlah Pemenang**: ${winnersCount}
⏳ **Durasi**: ${ms(timeLeft, { long: true })}

➡️ **Cara Berpartisipasi**:
Reaksi dengan 🎉 pada pesan ini!

**═══════════════════════════════**`);

            // Tambahkan reaksi ke pesan giveaway
            await initialMessage.react('🎉');

            // Simpan peserta
            const participants = new Set();

            // Kolektor reaksi
            const collector = initialMessage.createReactionCollector({
                filter: (reaction, user) => reaction.emoji.name === '🎉' && !user.bot,
                time: totalDuration,
            });

            collector.on('collect', (reaction, user) => {
                participants.add(user.id);
            });

            // Countdown real-time (update langsung bagian durasi)
            const countdownInterval = setInterval(async () => {
                timeLeft -= 10000; // Update setiap 10 detik
                if (timeLeft > 0) {
                    const updatedContent = `
**═══════════════════════════════**
**GIVEAWAY DIMULAI!**
**═══════════════════════════════**

🎁 **Hadiah**: ${prize}
🏆 **Jumlah Pemenang**: ${winnersCount}
⏳ **Durasi**: ${ms(timeLeft, { long: true })}

➡️ **Cara Berpartisipasi**:
Reaksi dengan 🎉 pada pesan ini!

**═══════════════════════════════**`;
                    await initialMessage.edit(updatedContent);
                } else {
                    clearInterval(countdownInterval);
                }
            }, 10000);

            collector.on('end', async () => {
                clearInterval(countdownInterval); // Hentikan countdown

                if (participants.size === 0) {
                    return message.channel.send(`
**═══════════════════════════════**
**GIVEAWAY SELESAI!**
**═══════════════════════════════**

Tidak ada yang berpartisipasi dalam giveaway.

**═══════════════════════════════**`);
                }

                // Pilih pemenang secara acak
                const winners = [];
                const participantsArray = Array.from(participants);

                for (let i = 0; i < Math.min(winnersCount, participantsArray.length); i++) {
                    const winnerIndex = Math.floor(Math.random() * participantsArray.length);
                    winners.push(participantsArray.splice(winnerIndex, 1)[0]);
                }

                const winnersMention = winners.map((id) => `<@${id}>`).join(', ');

                message.channel.send(`
**════════════════════════════════════**
**GIVEAWAY SELESAI!**
**════════════════════════════════════**

🎁 **Hadiah**: ${prize}
🏆 **Pemenang**: ${winnersMention}

Terima kasih kepada semua yang telah berpartisipasi!

**════════════════════════════════════**`);
            });
        } else if (action === 'end') {
            return message.reply('❌ Giveaway hanya dapat dihentikan secara otomatis setelah durasi selesai.');
        } else {
            return message.reply(
                '❌ Perintah tidak valid. Gunakan:\n`!giveaway start <durasi> <jumlah pemenang> <hadiah>` untuk memulai giveaway.'
            );
        }
    },
};