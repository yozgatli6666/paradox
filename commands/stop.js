const { canModifyQueue } = require("../util/CnrXbotUtil");


module.exports = {
  name: "durdur",
  description: "En Son Çalan Müziği Kapat / durdur",
  execute(message) {
    const queue = message.client.queue.get(message.guild.id);
    
    if (!queue) return message.reply("Çalan Müzik Yok.").catch(console.error);
    if (!canModifyQueue(message.member)) return;

    queue.songs = [];
    queue.connection.dispatcher.end();
    queue.textChannel.send(`${message.author} ⏹ Müziği durdurdu!`).catch(console.error);
  }
};
