const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");

const prim = require("../databases/primaries.json");
const sec = require("../databases/secondaries.json");
const armor = require("../databases/armor.json");
const deployable = require("../databases/deployable.json");
const perk = require("../databases/perk.json");
const throwable = require("../databases/throwables.json");
const perkWithThrowable = require("../databases/perksWithThrowable.json");
var perkWithThrowableArray = [];

for (x in perkWithThrowable) {
  perkWithThrowableArray.push(perkWithThrowable[x]["name"]);
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName("build")
    .setDescription("Will give you a randomized build."),
  async execute(interaction) {
    var ranPrim = prim[Math.floor(Math.random() * prim.length)]; // Get a random weapon/armor/deploy/etc
    var ranSec = sec[Math.floor(Math.random() * sec.length)];
    var ranArmor = armor[Math.floor(Math.random() * armor.length)];
    var ranDeployable =
      deployable[Math.floor(Math.random() * deployable.length)];
    var ranPerk = perk[Math.floor(Math.random() * perk.length)];
    var ranThrowable = throwable[Math.floor(Math.random() * throwable.length)];
    var processedThrowable = {
      name: "Throwable",
      value: ranThrowable["name"],
      inline: true,
    }; // We turn throwable into a dictionary in advance

    var fieldArray = [
      // All of the dictionaries get slapped into an array
      {
        name: "Primary",
        value: `${ranPrim["type"]}: ${ranPrim["name"]}`,
        inline: true,
      },
      {
        name: "Secondary",
        value: `${ranSec["type"]}: ${ranSec["name"]}`,
        inline: true,
      },
      { name: "Armor", value: ranArmor["name"], inline: true },
      { name: "Perkdeck", value: ranPerk["name"], inline: true },
      { name: "Deployable", value: ranDeployable["name"], inline: true },
    ];

    var uniqueThrow = false; // By default, we assume it is not a unique throwable
    for (var i = 0; i < perkWithThrowableArray.length; i++) {
      if (ranPerk["name"] == perkWithThrowableArray[i]) {
        // If the perkdeck has a unique throwable, we make the uniqueThrow var true
        uniqueThrow = true;
      }
    }
    if (uniqueThrow == false) {
      // Only if the perk deck doesn't have a unique throwable do we add it to the array
      fieldArray.push(processedThrowable);
    }

    const buildEmbed = new MessageEmbed() // Building the embed
      .setColor("RANDOM")
      .setTitle("A completely random build")
      .setFooter("A bot by Soariticus#0666")
      .addFields(fieldArray);

    await interaction.reply({ embeds: [buildEmbed] }); // Returning embed
  },
};
