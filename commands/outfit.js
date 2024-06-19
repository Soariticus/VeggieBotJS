const { SlashCommandBuilder } = require("@discordjs/builders");
const outfits = require("../databases/outfits.json");
const { MessageEmbed } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("outfit")
    .setDescription("Gives a random outfit"),
  async execute(interaction) {
    const outfit_data = outfits[Math.floor(Math.random() * outfits.length)];

    const buildEmbed = new MessageEmbed()
      .setColor("RANDOM")
      .setTitle(outfit_data[0])
      .setImage(outfit_data[1])
      .setFooter("A command by 0lafe");

    await interaction.reply({ embeds: [buildEmbed] });
  },
};
