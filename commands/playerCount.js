const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("playercount")
    .setDescription("Displays the current player counts for all payday titles"),
  async execute(interaction) {
    const games = [
      { name: "Payday: The Heist", id: 24240 },
      { name: "Payday 2", id: 218620 },
      { name: "Payday 3", id: 1272080 },
      { name: "Crime Boss: Rockay City", id: 2933080 },
    ];

    let fieldArray;
    try {
      fieldArray = await Promise.all(
        games.map(async (game) => {
          const response = await fetch(
            `https://api.steampowered.com/ISteamUserStats/GetNumberOfCurrentPlayers/v1/?appid=${game.id}`
          );
          const data = await response.json();
          return {
            name: game.name,
            value: data.response.player_count.toString(),
          };
        })
      );
    } catch {
      fieldArray = [
        { name: "Error", value: "Something went wrong, try again" },
      ];
    }

    const buildEmbed = new MessageEmbed()
      .setColor("RANDOM")
      .setTitle("Payday Player Counts")
      .addFields(fieldArray)
      .setFooter("A command by 0lafe");

    await interaction.reply({ embeds: [buildEmbed] });
  },
};
