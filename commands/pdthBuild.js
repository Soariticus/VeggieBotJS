const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");

const data = require("../databases/pdth.json");

Array.prototype.random = function () {
  return this[Math.floor(Math.random() * this.length)];
};

module.exports = {
  data: new SlashCommandBuilder()
    .setName("pdth_build")
    .setDescription("Will give you a randomized build for Payday the Heist."),
  async execute(interaction) {
    fieldArray = [
      {
        name: "Primary",
        value: data["primaries"].random(),
        inline: true,
      },
      {
        name: "Secondary",
        value: data["secondaries"].random(),
        inline: true,
      },
      {
        name: "Handgun",
        value: data["handguns"].random(),
        inline: true,
      },
      { name: "Deployable", value: data["deployables"].random(), inline: true },
      { name: "Equipment", value: data["equipments"].random(), inline: true },
      {
        name: "Crew Bonus",
        value: data["crew_bonuses"].random(),
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
