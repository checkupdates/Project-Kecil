module.exports = {
    name: "userinfo",
    description: "Menampilkan informasi detail tentang pengguna.",
    async execute(message, args) {
        // Ambil pengguna dari mention atau ID, atau gunakan pengirim pesan
        let user =
            message.mentions.users.first() ||
            (args[0] ? await message.client.users.fetch(args[0]).catch(() => null) : message.author);

        if (!user) {
            return message.reply("❌ Pengguna tidak ditemukan. Pastikan ID atau mention benar.");
        }

        // Ambil anggota guild jika digunakan di server
        let member = null;
        if (message.guild) {
            member = message.guild.members.cache.get(user.id) || await message.guild.members.fetch(user.id).catch(() => null);
        }

        // Informasi dasar pengguna
        let info = `\`\`\`yaml
📋 Informasi Pengguna:
- Tag          : ${user.tag}
- ID           : ${user.id}
- Username     : ${user.username}
- Discriminator: #${user.discriminator}
- Bot          : ${user.bot ? "Ya" : "Tidak"}
- Dibuat pada  : ${new Date(user.createdTimestamp).toLocaleString()}\n`;

        // Informasi tambahan jika pengguna adalah anggota guild
        if (member) {
            info += `\n👤 Informasi Anggota Guild:
- Nickname     : ${member.nickname || "Tidak Ada"}
- Bergabung pada: ${new Date(member.joinedTimestamp).toLocaleString()}
- Peran        : ${(member.roles.cache.map(role => role.name).join(", ") || "Tidak Ada")}
- Warna Peran  : ${member.displayHexColor}
- Status       : ${member.presence?.status || "Offline"}\n`;

            if (member.premiumSince) {
                info += `- Boost Sejak   : ${new Date(member.premiumSinceTimestamp).toLocaleString()}\n`;
            }
        }

        info += `\`\`\``;

        // Kirim pesan
        message.reply(info);
    },
};