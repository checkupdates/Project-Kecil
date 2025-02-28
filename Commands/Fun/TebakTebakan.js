module.exports = {
    name: 'tebakbenda', // Nama command
    description: 'Permainan tebak-tebakan tentang benda.',
    execute: async (message) => {
        // Daftar tebak-tebakan benda (deskripsi dan jawaban)
        const riddles = [
            { description: "Saya ada di kamar, biasanya berisi bulu lembut. Apa saya?", answer: "Bantal" },
            { description: "Saya selalu menemani, berguna saat gelap. Apa saya?", answer: "Lampu" },
            { description: "Saya di dapur, sering digunakan untuk memanaskan makanan. Apa saya?", answer: "Kompor" },
            { description: "Saya bisa menunjukkan waktu. Apa saya?", answer: "Jam" },
            { description: "Saya bisa dipakai untuk berjalan lebih cepat di kota. Apa saya?", answer: "Sepeda" },
            { description: "Saya sering digunakan untuk menyimpan uang. Apa saya?", answer: "Dompet" },
            { description: "Saya ada di atas kepala untuk melindungi dari hujan. Apa saya?", answer: "Payung" },
            { description: "Saya bisa diisi air, berguna untuk mandi. Apa saya?", answer: "Ember" },
            { description: "Saya ada di sekolah, digunakan untuk menulis di papan. Apa saya?", answer: "Spidol" },
            { description: "Saya kecil dan membantu kamu membuka pintu. Apa saya?", answer: "Kunci" },
            { description: "Saya sering digunakan untuk membersihkan lantai. Apa saya?", answer: "Sapu" },
            { description: "Saya ada di dapur, digunakan untuk memotong. Apa saya?", answer: "Pisau" },
            { description: "Saya digunakan untuk menghapus tulisan di papan tulis. Apa saya?", answer: "Penghapus" },
            { description: "Saya digunakan untuk duduk. Apa saya?", answer: "Kursi" },
            { description: "Saya ada di ruang tamu, digunakan untuk bersantai. Apa saya?", answer: "Sofa" },
            { description: "Saya kecil, bulat, dan manis. Apa saya?", answer: "Permen" },
            { description: "Saya berisi air dan bisa diminum. Apa saya?", answer: "Botol" },
            { description: "Saya bisa digunakan untuk menyisir rambut. Apa saya?", answer: "Sisir" },
            { description: "Saya digunakan untuk melindungi kaki. Apa saya?", answer: "Sepatu" },
            { description: "Saya berguna saat kamu ingin berkemah. Apa saya?", answer: "Tenda" },
            { description: "Saya bisa membantu kamu membersihkan gigi. Apa saya?", answer: "Sikat gigi" },
            { description: "Saya digunakan untuk memotong kertas. Apa saya?", answer: "Gunting" },
            { description: "Saya digunakan untuk makan sup. Apa saya?", answer: "Sendok" },
            { description: "Saya digunakan untuk menyimpan makanan. Apa saya?", answer: "Lemari es" },
            { description: "Saya keras dan berisi grafit, digunakan untuk menulis. Apa saya?", answer: "Pensil" },
            { description: "Saya kecil, panas, dan digunakan untuk memasak air. Apa saya?", answer: "Kompor listrik" },
            { description: "Saya membantu kamu berbicara dengan orang jauh. Apa saya?", answer: "Telepon" },
            { description: "Saya besar dan memiliki layar, digunakan untuk menonton. Apa saya?", answer: "Televisi" },
            { description: "Saya digunakan untuk tidur. Apa saya?", answer: "Kasur" },
            { description: "Saya membantu kamu membawa banyak barang saat bepergian. Apa saya?", answer: "Tas" },
            { description: "Saya kecil dan digunakan untuk memperbesar suara. Apa saya?", answer: "Mikrofon" },
            { description: "Saya membantu kamu mengukur waktu memasak. Apa saya?", answer: "Timer" },
            { description: "Saya ada di ruang kerja, digunakan untuk membaca dokumen. Apa saya?", answer: "Meja" },
            { description: "Saya besar, beroda, dan membantu kamu bepergian. Apa saya?", answer: "Mobil" },
            { description: "Saya digunakan untuk mencetak dokumen. Apa saya?", answer: "Printer" },
            { description: "Saya ada di kamar mandi, membantu kamu membersihkan badan. Apa saya?", answer: "Sabun" },
            { description: "Saya ada di langit, digunakan untuk penerangan saat malam. Apa saya?", answer: "Bulan" },
            { description: "Saya keras, kecil, dan digunakan untuk memaku. Apa saya?", answer: "Paku" },
            { description: "Saya panjang dan digunakan untuk mengukur. Apa saya?", answer: "Meteran" },
            { description: "Saya sering diputar untuk mendengarkan lagu. Apa saya?", answer: "Radio" },
            { description: "Saya digunakan untuk memotong kuku. Apa saya?", answer: "Gunting kuku" },
            { description: "Saya kecil dan membantu membuka kaleng. Apa saya?", answer: "Pembuka kaleng" },
            { description: "Saya ada di dapur, digunakan untuk memasak nasi. Apa saya?", answer: "Penanak nasi" },
            { description: "Saya kecil, panas, dan digunakan untuk menata rambut. Apa saya?", answer: "Catokan" },
            { description: "Saya membantu kamu membuat jus. Apa saya?", answer: "Blender" },
            { description: "Saya ada di kantor, digunakan untuk memindai dokumen. Apa saya?", answer: "Scanner" },
            { description: "Saya digunakan untuk membawa makanan dari dapur ke meja makan. Apa saya?", answer: "Nampan" },
            { description: "Saya digunakan untuk membersihkan kaca. Apa saya?", answer: "Lap kaca" },
            { description: "Saya bulat, besar, dan digunakan untuk bermain bola. Apa saya?", answer: "Bola sepak" }
        ];

        // Pilih tebak-tebakan secara acak
        const randomRiddle = riddles[Math.floor(Math.random() * riddles.length)];

        // Kirim deskripsi benda ke pengguna
        await message.reply(`Deskripsi: **${randomRiddle.description}**\nCoba tebak benda apa saya!`);

        // Tunggu jawaban dari pengguna
        const filter = (response) =>
            response.author.id === message.author.id && !response.author.bot && message.author.id !== client.user.id; // Filter untuk hanya pengguna yang memulai permainan
        const collector = message.channel.createMessageCollector({ filter, time: 30000 }); // 30 detik waktu maksimum

        collector.on('collect', (response) => {
            if (response.content.toLowerCase() === randomRiddle.answer.toLowerCase()) {
                response.reply("🎉 Benar! Kamu Pintar!");
                collector.stop('answered');
            } else {
                response.reply("❌ Salah! Kamu Bodoh!.");
            }
        });

        collector.on('end', (collected, reason) => {
            if (reason !== 'answered') {
                message.reply(`Waktu habis! Jawaban yang benar adalah: **${randomRiddle.answer}**.`);
            }
        });
    },
};