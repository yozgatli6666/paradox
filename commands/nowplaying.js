const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "np",
  description: "Şimdi çalan şarkıyı göster",
  execute(message) {
    const queue = message.client.queue.get(message.guild.id);
    if (!queue) return message.reply("Çalan Müzik Yok.").catch(console.error);
    const song = queue.songs[0];

    let nowPlaying = new MessageEmbed()
      .setTitle("Şimdi oynuyor")
      .setDescription(`${song.title}\n${song.url}`)
      .setColor("#F8AA2A")
      .setAuthor("Paradox BOT Müzik Sistemi")
      .setTimestamp();

    if (song.duration > 0) nowPlaying.setFooter(new Date(song.duration * 1000).toISOString().substr(11, 8));

    return message.channel.send(nowPlaying);
  }
};
