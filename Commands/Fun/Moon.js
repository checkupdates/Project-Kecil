module.exports = {
    name: "moon",
    description: "Membuat animasi teks dengan mengedit pesan secara berkala.",
    execute: async (message) => {
        // Teks yang akan dianimasikan
        const frames = [
            "🌑",
            "🌒",
            "🌓",
            "🌔",
            "🌕",
            "🌖",
            "🌗",
            "🌘",
            "🌑",
            "🌒",
        ];

        // Mengirim pesan awal
        let sentMessage = await message.channel.send(frames[0]);

        // Menjalankan loop animasi
        let i = 0;
        const interval = 700; // Kecepatan animasi (500ms per frame)

        const animationInterval = setInterval(async () => {
            i = (i + 1) % frames.length; // Mengulang frame jika mencapai akhir
            try {
                await sentMessage.edit(frames[i]); // Mengedit pesan dengan frame baru
            } catch (error) {
                console.error("Gagal mengedit pesan:", error);
                clearInterval(animationInterval); // Hentikan animasi jika ada kesalahan
            }
        }, interval);

        // Hentikan animasi setelah beberapa detik
        setTimeout(() => {
            clearInterval(animationInterval);
        }, frames.length * interval * 2); // Durasi total animasi (dalam contoh ini 10 detik)
    },
};
