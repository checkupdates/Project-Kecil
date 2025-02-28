const fetch = require('node-fetch');

const API_KEY = '9e20aa035ef8539ee2dd3a1f66419cfb'; // Ganti dengan API Key OpenWeather Anda

module.exports = {
    name: 'weather',
    description: 'Menampilkan cuaca secara detail untuk lokasi di Indonesia',
    ownerOnly: false,
    async execute(message, args) {
        if (!args.length) {
            return message.reply("⚠️ Harap masukkan nama lokasi! Contoh: `!weather Jakarta` atau `!weather Jakarta -mobile`.");
        }

        // Periksa apakah pengguna meminta versi mobile
        const isMobile = args.includes('-mobile');
        if (isMobile) args.pop(); // Hapus flag -mobile dari args

        const location = args.join(" ");
        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(location)},ID&units=metric&appid=${API_KEY}`);
            const data = await response.json();

            if (data.cod !== 200 || !data.weather || !data.weather[0]) {
                return message.reply(`❌ Lokasi tidak ditemukan atau terjadi kesalahan.\n**Pesan Server:** ${data.message || 'Tidak diketahui'}`);
            }

            const weather = data.weather[0];
            const main = data.main;
            const wind = data.wind;
            const sys = data.sys;
            const coord = data.coord;

            const sunrise = new Date(sys.sunrise * 1000).toLocaleTimeString("id-ID", { timeZone: "Asia/Jakarta" });
            const sunset = new Date(sys.sunset * 1000).toLocaleTimeString("id-ID", { timeZone: "Asia/Jakarta" });

            if (isMobile) {
                // Output untuk mobile
                const mobileInfo = `
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
       Weather Report
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Lokasi   : ${data.name}, ${data.sys.country}
Suhu     : ${main.temp}°C
Angin    : ${wind.speed} m/s
Awan     : ${data.clouds.all}%
Kelembapan: ${main.humidity}%
Terbit   : ${sunrise}
Terbenam : ${sunset}
Deskripsi: ${weather.description.charAt(0).toUpperCase() + weather.description.slice(1)}
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                `;
                message.channel.send(mobileInfo);
            } else {
                // Output untuk desktop
                const desktopInfo = `
╭────────────────────────── WEATHER REPORT ───────────────────────────╮
│ Lokasi         : ${data.name}, ${data.sys.country}                             │
│ Koordinat      : Lat ${coord.lat}, Lon ${coord.lon}                            │
│ Suhu           : ${main.temp}°C (Feels Like: ${main.feels_like}°C)            │
│ Kelembapan     : ${main.humidity}%                                             │
│ Kecepatan Angin: ${wind.speed} m/s                                             │
│ Awan           : ${data.clouds.all}%                                           │
│ Tekanan Udara  : ${main.pressure} hPa                                          │
│ Deskripsi      : ${weather.description.charAt(0).toUpperCase() + weather.description.slice(1)} │
│ Matahari Terbit: ${sunrise}                                                    │
│ Matahari Terbenam: ${sunset}                                                   │
╰──────────────────────────────────────────────────────────────────────╯
Data diperbarui pada: ${new Date(data.dt * 1000).toLocaleString("id-ID", { timeZone: "Asia/Jakarta" })}
                `;
                message.channel.send(desktopInfo);
            }
        } catch (error) {
            console.error("Error:", error.message);
            message.reply("⚠️ Terjadi kesalahan saat mengambil data cuaca. Pastikan API Key Anda valid.");
        }
    },
};