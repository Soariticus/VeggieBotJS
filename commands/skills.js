const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

const skills = require("../databases/skills.json");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('skills')
		.setDescription('Gives you 3 forced and 3 banned skills.'),

		async execute(interaction) {

			var skill1 = skills[Math.floor(Math.random() * skills.length)];
			var skill2 = skills[Math.floor(Math.random() * skills.length)];
			var skill3 = skills[Math.floor(Math.random() * skills.length)];

			var skill4 = skills[Math.floor(Math.random() * skills.length)];
			var skill5 = skills[Math.floor(Math.random() * skills.length)];
			var skill6 = skills[Math.floor(Math.random() * skills.length)];

			const buildEmbed = new MessageEmbed()
				.setColor("RANDOM")
				.setTitle("Forced & Banned Skills")
				.setDescription("If a skill is both forced and banned, it cancels out and you're free to take/ignore it. If a skill is forced twice, this means forced ace. " + 
					"If a skill is banned twice, you're lucky, you have 1 less banned skill. ")
				.setFooter("A bot by Soariticus#0666")
				.addFields(

					{ name: "-----", value: "-----"},

					{ name: "Forced Skills", value: "These skills MUST be taken."},
					{ name: "Forced Perk 1", value: `${skill1['tree']}: ${skill1['name']}`, inline: true },
					{ name: "Forced Perk 2", value: `${skill2['tree']}: ${skill2['name']}`, inline: true },
					{ name: "Forced Perk 3", value: `${skill3['tree']}: ${skill3['name']}`, inline: true },
					
					{ name: "-----", value: "-----"},

					{ name: "Banned Skills", value: "These skills are banned."},
					{ name: "Banned Perk 1", value: `${skill4['tree']}: ${skill4['name']}`, inline: true },
					{ name: "Banned Perk 2", value: `${skill5['tree']}: ${skill5['name']}`, inline: true },
					{ name: "Banned Perk 3", value: `${skill6['tree']}: ${skill6['name']}`, inline: true }
				);
				

		await interaction.reply({embeds: [buildEmbed]});
	},
};