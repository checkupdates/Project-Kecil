const tasks = new Map(); // Menyimpan semua tugas aktif (per channel dan pesan)

// Ekspor `tasks` agar dapat diakses oleh file lain
module.exports = {
    name: "collect",
    description: "Mengirimkan pesan otomatis ke channel tertentu pada interval waktu tertentu.",
    ownerOnly: true,
    tasks, // Ekspor objek `tasks` untuk file lain,

    async execute(message, args) {
        const client = message.client;

        if (args.length < 3) {
            return message.reply("Format salah! Gunakan: `z.collect <channelid> <detik/menit/jam/hari> <pesan>`");
        }

        const [channelId, timeInput, ...messageParts] = args;
        const targetMessage = messageParts.join(" ");
        const channel = client.channels.cache.get(channelId);

        if (!channel) {
            return message.reply("Channel ID tidak valid!");
        }

        const timeValue = parseInt(timeInput);
        const timeUnit = timeInput.replace(/[0-9]/g, "").toLowerCase();
        let intervalMs;

        // Konversi waktu ke milidetik
        switch (timeUnit) {
            case "d":
            case "hari":
                intervalMs = timeValue * 24 * 60 * 60 * 1000;
                break;
            case "h":
            case "jam":
                intervalMs = timeValue * 60 * 60 * 1000;
                break;
            case "m":
            case "menit":
                intervalMs = timeValue * 60 * 1000;
                break;
            case "s":
            case "detik":
                intervalMs = timeValue * 1000;
                break;
            default:
                return message.reply("Unit waktu tidak valid! Gunakan `detik`, `menit`, `jam`, atau `hari`.");
        }

        if (!tasks.has(channelId)) {
            tasks.set(channelId, []); // Jika belum ada, buat daftar tugas untuk channel ini
        }

        // Tambahkan tugas baru ke daftar
        const task = setInterval(() => {
            channel.send(targetMessage).catch(err => {
                console.error(`Gagal mengirim pesan di channel ${channelId}:`, err);
            });
        }, intervalMs);

        tasks.get(channelId).push(task);

        message.reply(`Tugas baru dimulai! Pesan: "${targetMessage}" akan dikirim ke <#${channelId}> setiap ${timeValue} ${timeUnit}.`);
    }
};