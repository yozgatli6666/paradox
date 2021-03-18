const { canModifyQueue } = require("../util/CnrXbotUtil");

module.exports = {
  name: "devam",
  aliases: ["devam"],
  description: "Duraklatılan En Son Müziği devam ettir",
  execute(message) {
    const queue = message.client.queue.get(message.guild.id);
    if (!queue) return message.reply("Sırada Mevcut Müzik Yok.").catch(console.error);
    if (!canModifyQueue(message.member)) return;

    if (!queue.playing) {
      queue.playing = true;
      queue.connection.dispatcher.resume();
      return queue.textChannel.send(`${message.author} ▶ Müziği yeniden başlattı!`).catch(console.error);
    }

    return message.reply("Sıradaki Müzik Duraklatılmamış.").catch(console.error);
  }
};
