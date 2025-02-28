const fs = require("fs");
const path = require("path");

// Menggunakan __dirname untuk memastikan jalur absolut
const settingsPath = path.join(__dirname, "../../Config/Settings.json");
let settings;

try {
    settings = require(settingsPath);
} catch (error) {
    console.error("Error: Tidak dapat menemukan file Settings.json. Pastikan file tersebut ada di folder Config.");
    process.exit(1); // Menghentikan bot jika Settings.json tidak ditemukan
}

module.exports = {
    name: "prefix",
    description: "Mengubah prefix bot (Hanya untuk owner)",

    execute(message, args) {

        if (!args[0]) {
            return message.channel.send("Format penggunaan: `!prefix <prefix_baru>`");
        }

        const newPrefix = args[0];
        settings.prefix = newPrefix;

        fs.writeFile(settingsPath, JSON.stringify(settings, null, 4), (err) => {
            if (err) {
                console.error("Gagal mengubah prefix:", err);
                return message.channel.send("Gagal mengubah prefix.");
            }
            message.channel.send(`Prefix berhasil diubah menjadi: **${newPrefix}**`);
        });
    }
};
