const fs = require("fs");
const config = require("../config.json");

module.exports = {
  name: "kısaltma",
  description: "Bot mesajlarının Kısaltma Aç / Kapat",
  execute(message) {
    config.PRUNING = !config.PRUNING;

    fs.writeFile("./config.json", JSON.stringify(config, null, 2), (err) => {
      if (err) {
        console.log(err);
        return message.channel.send("Dosyaya yazılırken bir hata oluştu.").catch(console.error);
      }

      return message.channel
        .send(`Mesaj kısaltma ${config.PRUNING ? "**enabled**" : "**disabled**"}`)
        .catch(console.error);
    });
  }
};
