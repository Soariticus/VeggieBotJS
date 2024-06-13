const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("link_account")
    .setDescription(
      "A link to authenticate with payday-2-charts.herokuapp.com. Allows some cool stuff"
    ),
  async execute(interaction) {
    const buildEmbed = new MessageEmbed() // Building the embed
      .setColor("RANDOM")
      .setTitle("Link to authenticate")
      .setFooter("A command by 0lafe")
      .addFields([
        {
          name: "URL:",
          value:
            "https://discord.com/oauth2/authorize?client_id=1191088437206470686&response_type=code&redirect_uri=https%3A%2F%2Fpayday-2-charts.herokuapp.com%2Foauth&scope=identify+connections",
          inline: true,
        },
      ]);

    await interaction.reply({ embeds: [buildEmbed], ephemeral: true }); // Returning embed
  },
};
