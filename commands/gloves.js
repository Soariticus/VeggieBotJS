const { SlashCommandBuilder } = require("@discordjs/builders");
const gloves = require("../databases/gloves.json");
const { MessageEmbed } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("gloves")
    .setDescription("Gives a random pair of gloves"),
  async execute(interaction) {
    const glove_data = gloves[Math.floor(Math.random() * gloves.length)];

    const buildEmbed = new MessageEmbed()
      .setColor("RANDOM")
      .setTitle(glove_data[0])
      .setImage(glove_data[1])
      .setFooter("A command by 0lafe");

    await interaction.reply({ embeds: [buildEmbed] });
  },
};
