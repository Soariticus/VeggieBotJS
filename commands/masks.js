const { SlashCommandBuilder } = require("@discordjs/builders");
const masks = require("../databases/masks.json");
const { MessageEmbed } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("masks")
    .setDescription("Gives a random mask"),
  async execute(interaction) {
    const mask_data = masks[Math.floor(Math.random() * masks.length)];

    const buildEmbed = new MessageEmbed()
      .setColor("RANDOM")
      .setTitle(mask_data[0])
      .setImage(mask_data[1])
      .setFooter("A command by 0lafe");

    await interaction.reply({ embeds: [buildEmbed] });
  },
};
