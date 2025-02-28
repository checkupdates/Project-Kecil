module.exports = {
    name: "serverinfo",
    description: "Menampilkan informasi detail tentang server.",
    async execute(message) {
        // Pastikan command hanya bisa digunakan di server
        if (!message.guild) {
            return message.reply("❌ Command ini hanya dapat digunakan di server.");
        }

        // Ambil data server
        const guild = message.guild;

        // Hitung jumlah anggota
        const memberCount = guild.memberCount;
        const botCount = guild.members.cache.filter(member => member.user.bot).size;
        const userCount = memberCount - botCount;

        // Hitung jumlah saluran berdasarkan tipe
        const textChannels = guild.channels.cache.filter(ch => ch.type === "GUILD_TEXT").size;
        const voiceChannels = guild.channels.cache.filter(ch => ch.type === "GUILD_VOICE").size;
        const categories = guild.channels.cache.filter(ch => ch.type === "GUILD_CATEGORY").size;

        // Informasi dasar server
        const info = `\`\`\`yaml
📋 Informasi Server:
- Nama Server   : ${guild.name}
- ID Server     : ${guild.id}
- Pemilik       : ${await guild.fetchOwner().then(owner => owner.user.tag)}
- Dibuat pada   : ${new Date(guild.createdTimestamp).toLocaleString()}
- Region        : ${guild.preferredLocale}
- Level Boost   : ${guild.premiumTier ? `Level ${guild.premiumTier}` : "Tidak Ada"}
- Jumlah Boost  : ${guild.premiumSubscriptionCount || 0}

👥 Anggota:
- Total Anggota : ${memberCount}
- Anggota       : ${userCount}
- Bot           : ${botCount}

📜 Saluran:
- Total Saluran : ${guild.channels.cache.size}
  • Teks       : ${textChannels}
  • Suara      : ${voiceChannels}
  • Kategori   : ${categories}

🏷️ Peran:
- Total Peran   : ${guild.roles.cache.size}

🎨 Ikon Server:
${guild.iconURL({ dynamic: true, size: 1024 }) ? guild.iconURL({ dynamic: true, size: 1024 }) : "Tidak Ada"}
\`\`\``;

        // Kirim pesan
        message.reply(info);
    },
};