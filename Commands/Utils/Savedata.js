const fs = require('fs');

module.exports = {
    name: 'partycode',
    description: 'Menyimpan data dari argumen ke file JSON.',
    ownerOnly: true,
    execute: async (message, args) => {
        if (!args.length) {
            return message.reply("Harap masukkan data untuk disimpan! Contoh: `!savedata nama=John umur=25`");
        }
        const data = {};
        args.forEach(arg => {
            const [key, value] = arg.split('=');
            if (key && value) {
                data[key] = value;
            }
        });
        if (Object.keys(data).length === 0) {
            return message.reply("Argumen tidak valid. Pastikan menggunakan format `key=value`.");
        }
        const filePath = '././Config/ValorantPartyCode.json';

        let existingData = {};
        if (fs.existsSync(filePath)) {
            existingData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        }

        Object.assign(existingData, data);
        
        fs.writeFileSync(filePath, JSON.stringify(existingData, null, 2));

        message.reply("Saved!");
    },
};