const { canModifyQueue } = require("../util/CnrXbotUtil");

module.exports = {
  name: "atla",
  aliases: ["geç"],
  description: "Şu anda çalan şarkıyı atla",
  execute(message) {
    const queue = message.client.queue.get(message.guild.id);
    if (!queue)
      return message.reply("senin için atlayabileceğim hiçbir şey yok.").catch(console.error);
    if (!canModifyQueue(message.member)) return;

    queue.playing = true;
    queue.connection.dispatcher.end();
    queue.textChannel.send(`${message.author} ⏭ şarkıyı atladı`).catch(console.error);
  }
};
