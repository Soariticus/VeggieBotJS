const { SlashCommandBuilder } = require('@discordjs/builders');
const heists = require("../databases/heists.json");
const { MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('stealthheist')
		.setDescription('Gives a random (stealth-able) heist.'),
	async execute(interaction) {

		var heist = heists[Math.floor(Math.random() * heists.length)];
		while (heist['type'] == "loud"){
			heist = heists[Math.floor(Math.random() * heists.length)];
		}


		const buildEmbed = new MessageEmbed()
			.setColor("RANDOM")
			.setTitle(heist['name'])
			.setDescription("Good luck!")
			.setFooter("A bot by Soariticus#0666")

		await interaction.reply({embeds: [buildEmbed]});
	},
};