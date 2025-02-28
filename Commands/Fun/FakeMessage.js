module.exports = {
    name: 'fakemessage',
    description: 'Buat pesan palsu dari nama pengguna tertentu.',
    async execute(message, args) {
        const [username, ...text] = args;
        if (!username || !text.length) return message.reply('⚠️ Format: `.fakemessage <username> <pesan>`');

        const fakeMessage = text.join(' ');
        await message.channel.send({
            content: fakeMessage,
            username: username,
        });
    },
};