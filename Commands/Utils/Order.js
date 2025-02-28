const fs = require('fs');
const crypto = require('crypto');
const c = require('../../Config/Settings.json');

// Harga rank per tier dan sub-rank
const rankPrices = {
    iron: [10000, 10000, 10000],
    silver: [25000, 25000, 25000],
    gold: [35000, 35000, 35000],
    platinum: [50000, 50000, 50000],
    diamond: [65000, 65000, 65000],
    ascendant: [110000, 110000, 110000],
    immortal: [250000, 250000, 250000],
    radiant: [950000],
};

// Fungsi menghitung harga berdasarkan rank
const calculatePrice = (start, end) => {
    const rankOrder = ['iron', 'silver', 'gold', 'platinum', 'diamond', 'ascendant', 'immortal', 'radiant'];
    const parseRank = (rank) => {
        const [tier, subRank] = rank.toLowerCase().split(' ');
        return { tier, subRank: parseInt(subRank, 10) - 1 };
    };

    const startRank = parseRank(start);
    const endRank = parseRank(end);

    const startIndex = rankOrder.indexOf(startRank.tier);
    const endIndex = rankOrder.indexOf(endRank.tier);

    if (
        startIndex === -1 ||
        endIndex === -1 ||
        startRank.subRank < 0 ||
        startRank.subRank > 2 ||
        endRank.subRank < 0 ||
        endRank.subRank > 2 ||
        startIndex > endIndex ||
        (startIndex === endIndex && startRank.subRank > endRank.subRank)
    ) {
        return null; // Invalid rank
    }

    let total = 0;

    for (let i = startIndex; i <= endIndex; i++) {
        const tier = rankOrder[i];
        const startSub = i === startIndex ? startRank.subRank : 0;
        const endSub = i === endIndex ? endRank.subRank : 2;

        for (let j = startSub; j <= endSub; j++) {
            total += rankPrices[tier][j];
        }
    }

    return total;
};

module.exports = {
    name: 'order',
    description: 'Mengelola data order (tambah, edit, hapus, hapus semua, lihat)',
    execute: async (message, args) => {
        const filePath = '././Data/SaveOrders.json';
        const subCommand = args[0]?.toLowerCase();
        const inputArgs = args.slice(1).join(' ');

        if (!subCommand) {
            return message.reply(
                `Gunakan perintah berikut:
                \`\`\`
!order add <Item> | <Rank Awal> | <Rank Tujuan> | <Tanggal Order> | <Addon>
!order edit <Order ID> | <Item> | <Rank Awal> | <Rank Tujuan> | <Tanggal Order> | <Addon>
!order delete <Order ID>
!order deleteall
!order view [Order ID]
                \`\`\``
            );
        }

        let orders = [];
        if (fs.existsSync(filePath)) {
            orders = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        }

        // ADD ORDER
        if (subCommand === 'add') {
            const [item, rankStart, rankEnd, orderDate, addon] = inputArgs.split(',').map((x) => x.trim());
            if (!item || !rankStart || !rankEnd || !orderDate || !addon) {
                return message.reply(`Format tidak lengkap! Gunakan format: 
                \`\`\`
                !order add <Item> | <Rank Awal> | <Rank Tujuan> | <Tanggal Order> | <Addon>
                \`\`\``);
            }

            const price = calculatePrice(rankStart, rankEnd);
            if (price === null) {
                return message.reply("Rank tidak valid! Gunakan format seperti : `Iron 1`, `Silver 2`, dst.");
            }

            const orderId = `#QUIET${crypto.randomBytes(1).toString('hex').toUpperCase()}`;
            const newOrder = {
                orderId,
                item,
                rankStart,
                rankEnd,
                nominal: `Rp${price.toLocaleString('id-ID')}`,
                orderDate,
                addon,
            };

            orders.push(newOrder);
            fs.writeFileSync(filePath, JSON.stringify(orders, null, 2));

            return message.reply(`Order berhasil ditambahkan:
=========================
**ORDER ID**: ${orderId}
**Item**: ${item}
**Rank Awal**: ${rankStart}
**Rank Tujuan**: ${rankEnd}
**Nominal**: Rp${price.toLocaleString('id-ID')}
**Tanggal Order**: ${orderDate}
**Addon**: ${addon}
=========================`);
        }

        // EDIT ORDER
        if (subCommand === 'edit') {
          if (message.author.id !== c.ownerID) {
            return message.channel.send("NO PERMISSION! hanya **OWNER QuietStore** yang dapat menjalankan command ini!");
        }
            const [orderId, item, rankStart, rankEnd, orderDate, addon] = inputArgs.split('|').map((x) => x.trim());
            if (!orderId || !item || !rankStart || !rankEnd || !orderDate || !addon) {
                return message.reply("Format tidak lengkap! Gunakan format: `!order edit <Order ID> | <Item> | <Rank Awal> | <Rank Tujuan> | <Tanggal Order> | <Addon>`");
            }

            const orderIndex = orders.findIndex((order) => order.orderId === orderId);
            if (orderIndex === -1) {
                return message.reply(`Order dengan ID "${orderId}" tidak ditemukan.`);
            }

            const price = calculatePrice(rankStart, rankEnd);
            if (price === null) {
                return message.reply("Rank tidak valid! Gunakan format seperti `Iron 1`, `Silver 2`, dst.");
            }

            orders[orderIndex] = {
                orderId,
                item,
                rankStart,
                rankEnd,
                nominal: `Rp${price.toLocaleString('id-ID')}`,
                orderDate,
                addon,
            };

            fs.writeFileSync(filePath, JSON.stringify(orders, null, 2));

            return message.reply(`Order berhasil diperbarui:
=========================
**ORDER ID**: ${orderId}
**Item**: ${item}
**Rank Awal**: ${rankStart}
**Rank Tujuan**: ${rankEnd}
**Nominal**: Rp${price.toLocaleString('id-ID')}
**Tanggal Order**: ${orderDate}
**Addon**: ${addon}
=========================`);
        }

        // DELETE ORDER
        if (subCommand === 'delete') {
          if (message.author.id !== c.ownerID) {
            return message.channel.send("NO PERMISSION! hanya **OWNER QuietStore** yang dapat menjalankan command ini!");
        }
            const orderId = inputArgs.trim();
            if (!orderId) {
                return message.reply("Harap masukkan Order ID untuk menghapus. Contoh: `!order delete #QUIET01`");
            }

            const orderIndex = orders.findIndex((order) => order.orderId === orderId);
            if (orderIndex === -1) {
                return message.reply(`Order dengan ID "${orderId}" tidak ditemukan.`);
            }

            const [deletedOrder] = orders.splice(orderIndex, 1);
            fs.writeFileSync(filePath, JSON.stringify(orders, null, 2));

            return message.reply(`Order dengan ID "${orderId}" berhasil dihapus:\n**Item**: ${deletedOrder.item}\n**Nominal**: ${deletedOrder.nominal}`);
        }

        // DELETE ALL ORDERS
        if (subCommand === 'deleteall') {
          if (message.author.id !== c.ownerID) {
            return message.channel.send("NO PERMISSION! hanya **OWNER QuietStore** yang dapat menjalankan command ini!");
        }
            fs.writeFileSync(filePath, JSON.stringify([], null, 2));
            return message.reply("Semua order berhasil dihapus.");
        }

        // VIEW ORDER
        if (subCommand === 'view') {
          if (message.author.id !== c.ownerID) {
            return message.channel.send("NO PERMISSION! hanya **OWNER QuietStore** yang dapat menjalankan command ini!");
        }
            const orderId = inputArgs.trim();

            if (orderId) {
                const order = orders.find((order) => order.orderId === orderId);
                if (!order) {
                    return message.reply(`Order dengan ID "${orderId}" tidak ditemukan.`);
                }

                return message.reply(`Detail Order:
=========================
**ORDER ID**: ${order.orderId}
**Item**: ${order.item}
**Rank Awal**: ${order.rankStart}
**Rank Tujuan**: ${order.rankEnd}
**Nominal**: ${order.nominal}
**Tanggal Order**: ${order.orderDate}
**Addon**: ${order.addon}
=========================`);
            }

            if (orders.length === 0) {
                return message.reply("Belum ada order yang tersimpan.");
            }

            const orderList = orders.map(
                (order) => `**ORDER ID**: ${order.orderId} | **Item**: ${order.item} | **Nominal**: ${order.nominal}`
            ).join('\n');

            return message.reply(`Daftar Order:
==========================
${orderList}
==========================`);
        }
    },
};