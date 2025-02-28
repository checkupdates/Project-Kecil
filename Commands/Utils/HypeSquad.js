const axios = require('axios');

module.exports = {
    name: 'hypesquad',
    description: 'Mengubah Hypesquad badge di akun Anda.',
    async execute(message, args) {
        const houses = {
            bravery: 1,
            brilliance: 2,
            balance: 3,
        };

        const house = args[0]?.toLowerCase(); // bravery, brilliance, atau balance

        if (!house || !houses[house]) {
            return message.reply(
                '❌ Harap gunakan perintah dengan salah satu opsi berikut:\n`!changehypesquad bravery`\n`!changehypesquad brilliance`\n`!changehypesquad balance`'
            );
        }

        try {
            const response = await axios.post(
                'https://discord.com/api/v9/hypesquad/online',
                { house_id: houses[house] },
                {
                    headers: {
                        Authorization: message.client.token, // Token selfbot
                    },
                }
            );

            if (response.status === 204) {
                message.reply(`✅ Hypesquad badge berhasil diubah ke **${house.charAt(0).toUpperCase() + house.slice(1)}**.`);
            } else {
                message.reply('❌ Terjadi kesalahan saat mencoba mengubah Hypesquad badge.');
            }
        } catch (error) {
            console.error(error);
            message.reply('❌ Tidak dapat mengubah Hypesquad badge. Pastikan akun Anda memenuhi syarat.');
        }
    },
};