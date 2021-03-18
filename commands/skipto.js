const { canModifyQueue } = require("../util/CnrXbotUtil");

module.exports = {
  name: "geç",
  aliases: ["g"],
  description: "Seçili sıra numarasına atla",
  execute(message, args) {
    if (!args.length) return message.reply(`Kullanım: ${message.client.prefix}${module.exports.name} <Sıra Numarası>`);

    const queue = message.client.queue.get(message.guild.id);
    if (!queue) return message.channel.send("Kuyruk Yok.").catch(console.error);
    if (!canModifyQueue(message.member)) return;

    queue.playing = true;
    queue.songs = queue.songs.slice(args[0] - 2);
    queue.connection.dispatcher.end();
    queue.textChannel.send(`${message.author} ⏭ Geçildi ${args[0] - 1} songs`).catch(console.error);
  }
};
