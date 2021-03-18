const { canModifyQueue } = require("../util/CnrXbotUtil");

module.exports = {
  name: "kaldır",
  description: "Sıradan Müziği Kaldır",
  execute(message, args) {
    const queue = message.client.queue.get(message.guild.id);
    if (!queue) return message.channel.send("Kuyruk yok.").catch(console.error);
    if (!canModifyQueue(message.member)) return;
    
    if (!args.length) return message.reply(`Kullan: ${message.client.prefix}remove <Sıra Numarası>`);
    if (isNaN(args[0])) return message.reply(`Kullan: ${message.client.prefix}remove <Sıra Numarası>`);

    const song = queue.songs.splice(args[0] - 1, 1);
    queue.textChannel.send(`${message.author} ❌ Kaldırıldı **${song[0].title}** Sır.`);
  }
};
