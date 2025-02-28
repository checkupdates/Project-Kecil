module.exports = {
  name: "purge",
  description: "Menghapus pesan yang anda inginkan",
  ownerOnly: true,
  async execute(message, args) {
    if (!message.guild) {
            return message.reply('Command hanya dapat digunakan di server!');
        }
    
    if (args.length !== 1 || isNaN(args[0])) {
            return message.reply('Harap masukkan angka dengan benar!');
        }
    
    const amount = parseInt(args[0]);
        if (amount <= 0 || amount > 101) {
            return message.reply('Harap masukkan angka dengan benar dari 1 - 100');
        }
    
    try {
      let deletedCount = 0;
      const messages = await message.channel.messages.fetch({ limit: amount + 1 });
      for (const msg of messages.values()) {
        if (msg.deletable) {
          await msg.delete();
          deletedCount++;
          await new Promise(resolve => setTimeout(resolve, 200)); 
        }
      }
      
      const succesDeleted = `**${deletedCount} PESAN BERHASI DIHAPUS!!= **
\`\`\`
IMPORTANT: Ini hanya akan menghapus pesan anda sendiri jika tidak mempunyai akses [MENAGE_MESSAGE]\`\`\``;
      
      await message.channel.send(succesDeleted);
    } catch (error) {
      console.log("EROR SAAT MENJALANKAN COMMAND: ", error);
    }
  },
};