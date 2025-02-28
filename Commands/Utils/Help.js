module.exports = {
    name: 'help',
    description: 'Menampilkan daftar command yang tersedia.',
    async execute(message, args) {
        const commandsByCategory = new Map();

        // Grupkan commands berdasarkan kategori
        message.client.commands.forEach((command) => {
            const category = command.category || 'Uncategorized'; // Default kategori jika tidak ada
            if (!commandsByCategory.has(category)) {
                commandsByCategory.set(category, []);
            }
            commandsByCategory.get(category).push(command);
        });

        // Buat pesan bantuan
        let helpMessage = '**📖 Daftar Command:**\n\n';

        commandsByCategory.forEach((commands, category) => {
            helpMessage += `**${category}**\n`;
            commands.forEach((command) => {
                helpMessage += `• \`${command.name}\`: ${command.description || 'Tidak ada deskripsi'}\n`;
            });
            helpMessage += '\n';
        });

        // Kirim pesan bantuan
        message.channel.send(helpMessage);
    },
};