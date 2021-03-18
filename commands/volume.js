const { canModifyQueue } = require("../util/CnrXbotUtil");

module.exports = {
  name: "ses",
  aliases: ["ses"],
  description: "Şu anda çalan müziğin ses seviyesini değiştirin",
  execute(message, args) {
    const queue = message.client.queue.get(message.guild.id);

    if (!queue) return message.reply("Çalan müzik Yok.").catch(console.error);
    if (!canModifyQueue(message.member))
      return message.reply("önce bir ses kanalına katılmanız gerekir!").catch(console.error);

    if (!args[0]) return message.reply(`🔊 Mevcut Ses Düzeyi: **${queue.volume}%**`).catch(console.error);
    if (isNaN(args[0])) return message.reply("Lütfen ses seviyesini ayarlamak için bir sayı kullanın.").catch(console.error);
    if (parseInt(args[0]) > 100 || parseInt(args[0]) < 0)
      return message.reply("Ses Seviyesi Sınırı 0 - 100.").catch(console.error);

    queue.volume = args[0];
    queue.connection.dispatcher.setVolumeLogarithmic(args[0] / 100);

    return queue.textChannel.send(`Ses Seviyesi: **${args[0]}%**`).catch(console.error);
  }
};
