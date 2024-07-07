const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("Provides help on each command"),
  async execute(interaction) {
    const fieldData = [
      {
        name: "personalizedBuild",
        value: "Provides a build with weapons you rarely use",
        inline: true,
      },
    ];

    const buildEmbed = new MessageEmbed()
      .setColor("RANDOM")
      .addFields(fieldData)
      .setFooter("A command by 0lafe");

    await interaction.reply({ embeds: [buildEmbed], ephemeral: true });
  },
};
