const { MessageAttachment } = require("discord.js-selfbot-v13");

module.exports = {
    name: "pic",
    description: "Mengambil gambar profil dari pengguna yang di-mention.",
    execute: async (message) => {
        // Mengecek apakah ada mention pengguna
        const user = message.mentions.users.first();
        if (!user) {
            return message.reply("Mohon mention pengguna yang ingin diambil gambar profilnya.");
        }
        
        // Mendapatkan URL avatar dalam format PNG
        const avatarURL = user.displayAvatarURL({ format: "png", size: 1024 });
        
        // Membuat attachment gambar
        const attachment = new MessageAttachment(avatarURL, `${user.username}_profile_picture.png`);
        
        // Mengirim avatar sebagai attachment
        await message.reply({
            content: `**BERHASIL!**! Berikut adalah gambar profil dari **${user.displayName}**`,
            files: [attachment],
        });
    },
};
