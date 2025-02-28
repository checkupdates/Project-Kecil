const truths = [
    "Apa rahasia terbesarmu?",
    "Siapa yang kamu sukai di antara teman-temanmu?",
    "Pernahkah kamu berbohong kepada orang tuamu? Jika ya, tentang apa?",
    "Apa yang paling kamu takuti?",
    "Apa pencapaian terbesarmu sejauh ini?",
    "Lebih suka dijemput naik mobil yang harganya murah atau naik motor mahal?",
    "Apakah kamu masih memiliki perasaan untuk salah satu mantanmu?",
    "Apa lima hal terbaru dalam riwayat pencarian di browser?",
    "Jika dapat uang Rp 1 miliar sekarang juga, hal pertama yang kamu mau beli apa?",
    "Jika kamu harus mengubah namamu, apa nama yang kamu inginkan?",
    "Menurutmu, jika ada virus mematikan dan menyebar di seluruh negeri, siapa di sini yang akan mati duluan dan siapa yang akan selamat? Kenapa?",
    "Peristiwa memalukan apa yang pernah terjadi di hidupmu?"
];

const dares = [
    "Kirim pesan dengan emotikon yang paling aneh.",
    "Tampilkan foto konyol yang ada di ponselmu.",
    "Lakukan tarian aneh selama 10 detik.",
    "Buat suara hewan dan rekam suaranya.",
    "Sebutkan nama belakang dari tiga orang temanmu.",
    "Hubungi seseorang yang sudah lama tidak kamu hubungi, namun orang tersebut penting untuk kamu!",
    "Tulis sebuah tulisan untuk dirimu sendiri dan bacakan di depan teman-teman kamu agar dapat selalu diingat!",
    "Beritahu perasaanmu kepada salah satu teman yang ada disini (dalam hal romantis)!",
    "Buatlah koreografi modern dance di depan teman-temanmu!",
    "Buat cerita dari 3 kata kunci yang teman-temanmu berikan!",
    "Telepon satu teman lawan jenis dan katakan bahwa dia adalah orang yang cantik atau ganteng yang pernah kamu temukan!",
    "Bernyanyilah lagu apapun dan tambahkan gerakan dance!",
    "Buat story pada media sosial dan pose dengan gaya yang lucu atau imut!",
    "Berikan handphonemu kepada temanmu dan biarkan dia mengirim pesan kepada siapapun di kontakmu sesuai yang dia inginkan!",
    "Cium kaos kaki milik salah satu dari orang dalam permainan ini!",
    "Katakan “aku cantik atau aku ganteng” dan biarkan temanmu membuat status atau posting mengenai dirimu!",
    "Katakan “guk” pada setiap akhir kalimat hingga giliran kamu kembali!",
    "Bertingkah seperti ayam hingga akhir giliran mu kembali!",
    "Tutup matamu kemudian tebak siapakah orang itu dengan meraba mukanya!",
    "Plank selama satu menit!"
];

module.exports = {
    name: "tod",
    description: "Truth Or Dare",
    execute: async (message) => {
        const choice = Math.random() < 0.5 ? 'truth' : 'dare';
        
        let response;
        if (choice === 'truth') {
            // Pilih pertanyaan kebenaran secara acak
            const randomTruth = truths[Math.floor(Math.random() * truths.length)];
            response = `Truth: **${randomTruth}**`;
        } else {
            // Pilih tantangan secara acak
            const randomDare = dares[Math.floor(Math.random() * dares.length)];
            response = `Dare: **${randomDare}**`;
        }
        
        // Kirim balasan
        await message.reply(response);
    },
};
