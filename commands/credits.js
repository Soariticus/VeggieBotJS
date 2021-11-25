const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('credits')
		.setDescription('Gives credits.'),
	async execute(interaction) {
		
		const buildEmbed = new MessageEmbed()
			.setColor("RANDOM")
			.setTitle("Credits")
			.setDescription("Thanks for showing <3")
			.setFooter("A bot by Soariticus#0666")
			.addFields(
				{ name: "Developer", value: "Soariticus#0666", inline: true },
				{ name: "Special thanks to", value: "Bay1k#1799", inline: true},
				{ name: "Rewritten on", value: "28/9/2021", inline: true},
				{ name: "Website", value: "https://soaritic.us", inline: true},
				{ name: "Want VeggieBot in your server?", value: "Message Soariticus#0666", inline:true },
			);
		
		await interaction.reply({embeds: [buildEmbed]});

	},
};