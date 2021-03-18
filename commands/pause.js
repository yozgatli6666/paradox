const { canModifyQueue } = require("../util/CnrXbotUtil");

module.exports = {
  name: "duraklat",
  description: "Şu anda çalan müziği duraklat",
  execute(message) {
    const queue = message.client.queue.get(message.guild.id);
    if (!queue) return message.reply("Çalan Müzik Yok.").catch(console.error);
    if (!canModifyQueue(message.member)) return;

    if (queue.playing) {
      queue.playing = false;
      queue.connection.dispatcher.pause(true);
      return queue.textChannel.send(`${message.author} ⏸ paused the music.`).catch(console.error);
    }
  }
};
