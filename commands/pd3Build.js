const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("pd3_build")
    .setDescription("Will give you a randomized build for Payday 3"),
  async execute(interaction) {
    fieldArray = [
      {
        name: "WiP",
        value: "WiP",
        inline: true,
      },
    ];
    const buildEmbed = new MessageEmbed() // Building the embed
      .setColor("RANDOM")
      .setTitle("A completely random build")
      .setFooter("A command by 0lafe")
      .addFields(fieldArray);

    await interaction.reply({ embeds: [buildEmbed] }); // Returning embed
  },
};
