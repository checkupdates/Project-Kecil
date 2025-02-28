const Discord = require("discord.js-selfbot-v13");
const { RichPresence, CustomStatus, SpotifyRPC } = require('discord.js-selfbot-v13');
const fs = require("fs");
const fetch = require('node-fetch');
const clc = require("cli-color");
const pink = clc.xterm(198);
const c = require('./Config/Settings.json');
const RPConfig = require('./Config/RPC.json');
require('dotenv').config();
const path = require('path');
let repliedUsers = [];
if (fs.existsSync('repliedUsers.json')) {

    repliedUsers = JSON.parse(fs.readFileSync('repliedUsers.json'));

}


const client = new Discord.Client({
    checkUpdate: false,  // Menonaktifkan pengecekan pembaruan otomatis
});


// Set prefix custom sesuai keinginan, misalnya "!"

// Membuat koleksi untuk menyimpan comman
client.commands = new Discord.Collection();
client.commands = new Map(); // Menyimpan semua commands

const loadCommands = (dir) => {
    console.log(`Memuat commands dari: ${dir}`);
    const files = fs.readdirSync(dir, { withFileTypes: true });

    for (const file of files) {
        const fullPath = path.join(dir, file.name);

        if (file.isDirectory()) {
            loadCommands(fullPath); // Rekursif untuk subfolder
        } else if (file.name.endsWith('.js')) {
            try {
                delete require.cache[require.resolve(fullPath)]; // Hapus cache
                const command = require(fullPath);
                if (command.name) {
                    client.commands.set(command.name, command);
                } else {
                    console.warn(`Command diabaikan (tidak ada 'name'): ${file.name}`);
                }
            } catch (err) {
                console.error(`Error saat memuat ${file.name}:`, err.message);
            }
        } else {
            console.warn(`File diabaikan (bukan JS): ${file.name}`);
        }
    }
};

// Muat commands dari folder Commands
loadCommands(path.join(__dirname, 'Commands'));

client.on("ready", async () => {
    console.clear();
    console.log(pink(`[•] Success Log in to Selfbot`));
    console.log(pink(`[•] Log in as ${client.user.tag}`));
    console.log(pink(`[•] Prefix: ${c.prefix}`));
    
    const getExtendURL = await RichPresence.getExternal(
    client,
    RPConfig.AppID,
    RPConfig.LargeImage,
    RPConfig.SmallImage,
    RPConfig.SpoImage,// Required if the image you use is not in Discord
    );
    
    const extendUrl = await RichPresence.getExternal(
    client,
    RPConfig.AppID,
    RPConfig.SpoImage,
    )
    
    const RPCStatus = new RichPresence(client)
    .setApplicationId(RPConfig.AppID)
    .setType(RPConfig.Type)
    .setURL(RPConfig.Url)
    .setState(RPConfig.State)
    .setName(RPConfig.Name)
    .setDetails(RPConfig.Details)
    .setStartTimestamp(Date.now())
    .setEndTimestamp(Date.now() + 1_000 * (7 * 24 * 60 * 60 * 60))
    .setAssetsLargeImage(getExtendURL[0].external_asset_path)
    .setAssetsLargeText(RPConfig.LargeText)
    .setAssetsSmallImage(getExtendURL[1].external_asset_path)
    .setAssetsSmallText(RPConfig.SmallText)
    .addButton(RPConfig.FirstButtonName, RPConfig.FirstButtonLink)
    .addButton(RPConfig.SecondButtonName, RPConfig.SecondButtonLink);
    
    const spotify = new SpotifyRPC(client)
    .setAssetsLargeImage(extendUrl[0].external_asset_path)// Image ID
    .setAssetsLargeText(RPConfig.LargeText) // Album Name
    .setState(RPConfig.SpoState) // Artists
    .setDetails(RPConfig.SpoDetails) // Song name
    .setStartTimestamp(Date.now())
    .setEndTimestamp(Date.now() + 1_000 * (7 * 24 * 60 * 60 * 60)) // Song length = 2m56s
    .setSongId(extendUrl[0].external_asset_path) // Song ID
   // .setAlbumId('6AAmvxoPoDbJAwbatKwMb9') // Album ID
    // .setArtistIds('2j00CVYTPx6q9ANbmB2keb', '2nKGmC5Mc13ct02xAY8ccS')
   // https://open.spotify.com/track/667eE4CFfNtJloC6Lvmgrx?si=rvfJGXIyRyCkKwKOL1jEig
    .addButton("Listen Now!", "https://example.com");// Artist IDs

  client.user.setPresence({ activities: [RPCStatus] });
    
});

client.on("messageCreate", async (message) => {
    let gudInt;
    const saveData = './Config/VPartyCode.json';
    const data = JSON.parse(fs.readFileSync(saveData, 'utf8'));
    const formattedData = Object.entries(data)
        .map(([key, value]) => `${key} : **${value}**`)
        .join("\n");
        
    
    function delay(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    }
        
    if (message.content.startsWith("en.") && message.author.id === c.ownerID) {
      const cEncrypt = message.content.slice(3).trim();
      
      if (message.content.startsWith("EN : ")) return;
      
      const encrypt = Buffer.from(cEncrypt).toString("Base64");
      
      channel.message.send(encrypt)
      
      try {
        await message.delete();
      } catch (error) {
        console.error("Menghapus gagal")
      }
    }
    
    if (message.content == 'pl.' && message.author.id === c.ownerID ) {
        try {
            const gudInt = setInterval(() => {
                message.channel.sendTyping();
            }, 5000)
            
            setTimeout(() => {
                clearInverval(gudInt);
                console.log("DONE")
            }, 604800000)
        } catch (error) {
            console.error("ERROR : ", error)
        }
    }
    
    if (message.channel.type === 'DM' && !message.author.bot && message.author.id !== client.user.id) {
        // Cek apakah pengguna sudah pernah mendapat balasan
        if (!repliedUsers.includes(message.author.id)) {
            // Balas pesan!
            message.reply(`Hi **${message.author.displayName}**! Terima Kasih telah menghubungi **QuietStore**
Ada yang bisa dibantu?
**1. Boosting Valorant**
**2. Party Code & Link Server Discord**
**3. All Commands**
Jika ingin live chat dengan admin, silahkan ketik **LiveQuiet**, Terima Kasih!`);

            // Tambahkan ID pengguna ke daftar pengguna yang sudah mendapat balasan
            repliedUsers.push(message.author.id);

            // Simpan daftar pengguna ke file JSON
            fs.writeFileSync('repliedUsers.json', JSON.stringify(repliedUsers));
        }
    }
    
    if (message.channel.type === 'DM' && !message.author.bot && message.author.id !== client.user.id && message.content == 'LiveQuiet') {
      message.reply(`Hi **${message.author.displayName}**!, Sekarang anda sedang berada di **Live Chat**`)
    }
    
    if (message.channel.type === 'DM' && !message.author.bot && message.author.id !== client.user.id && message.content == '1') {
        // Kirim balasan ke pesan pertam
        message.reply(`
Silahkan isi ketik **FORMAT** dibawah ini!

\`\`\`
xorder add Valorant Boosting Account, <Rank Awal>, <Rank Tujuan>, <Tanggal Order>, <Addon>

Contoh :
xorder add Valorant Boosting Account, Silver, Ascendant 3, 01-11-2024, No Addon
\`\`\`

Terima Kasih!
Jika sudah mengisi **FORMAT**, harap tranfer sesuai Nominal yang tertera!
dan jangan lupa sertakan bukti transfer!
`);
    }
    
    if (message.channel.type === 'DM' && !message.author.bot && message.author.id !== client.user.id && message.content == '2') {

        // Kirim balasan ke pesan pertama

        message.reply(`Link Voice & Party Code Berhasil Dibuat! 
Link : [JOIN HERE](https://bit.ly/VALOJOKI)
Party ${formattedData}
        `);

    }
    
    if (message.channel.type === 'DM' && !message.author.bot && message.author.id !== client.user.id && message.content == '3') {
        message.reply(`Ketik xhelp untuk menampilkan daftar command!`)
    }
    // Memastikan pesan berasal dari bot sendiri
    const prefix = c.prefix;

    // Memeriksa jika pesan dimulai dengan prefix yang ditentukan
    if (!message.content.startsWith(prefix)) return;
    
    const args = message.content.slice(prefix.length
    ).trim().split(" ");
    const commandName = args.shift().toLowerCase();
    // Mengecek jika command ada dalam koleksi command
    if (client.commands.has(commandName)) {
        const command = client.commands.get(commandName);
        if (command.ownerOnly && message.author.id !== c.ownerID) {
            return message.channel.send("NO PERMISSION! hanya **OWNER QuietStore** yang dapat menjalankan command ini!");
        }
        try {
            await command.execute(message, args);
        } catch (error) {
            console.error(error);
            message.channel.send("Terjadi kesalahan saat menjalankan command.");
        }
    }
});

// Login dengan token bot kamu
const keepAlive = require("./server.js");
keepAlive();
client.login(process.env.token);
