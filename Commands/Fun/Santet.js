module.exports = {
    name: "santet",
    description: "Santet Seseorang!",
    async execute(message, args) {
        // Pastikan bahwa argumen teks diberikan
        if (args.length === 0) {
            return message.channel.send("Format penggunaan: `!santet <mention> | <jenis barang>`");
        }
        
        const input = args.join(" ");
        
        const [victim, barang] = input.split("|").map(arg => arg.trim());
        
        if (!victim || !barang ) {
          return mesaage.reply(`Harap masukkan format dengan benar!
Format: !santet <korban> | <jenis barang>`);
        }
       
        let currentFrame = 0;
        const frames = [
          `**[•] WARNING!** Anda menggunakan fitur santet!`,
          `**[•] WARNING!** Harap gunakan dengan bijak!`,
          `**[•] WARNING!** Sedang menyantet korban...`,
          `**10% Loading...**
          █▒▒▒▒▒▒▒▒▒ `,
          `**30% Loading...**
          ███▒▒▒▒▒▒▒`,
          `**50% Loading...**
          █████▒▒▒▒▒`,
          `**70% Loading...**
          ███████▒▒▒`,
          `**100% Loading...**
          ██████████`,
          `**Loading Sukses! Harap Tunggu Sebentar!**
          ██████████`,
          `**BERHASIL!**
> Korban ${victim} berhasil di **SANTET!**
> Pelaku Mengirim **${barang}!**`
          ]
          
        const delays = [
          1000,
          2000,
          2000,
          2000,
          1000,
          1000,
          1000,
          1000,
          1000,
          3000,
          3000,
          ]

        const animatedMessage = await message.channel.send(frames[currentFrame]);

        const animate = () => {
            currentFrame++;
            if (currentFrame >= frames.length) {
                return;
            }
            
            setTimeout(() => {
              animatedMessage.edit(frames[currentFrame]);
              animate();
            }, delays[currentFrame])
        };
        animate();
    },
};
