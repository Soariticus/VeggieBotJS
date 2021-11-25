const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

const prim = require("../databases/primaries.json");
const sec = require("../databases/secondaries.json");
const armor = require("../databases/armor.json");
const deployable = require("../databases/deployable.json");
const perk = require("../databases/perk.json");
const throwable = require("../databases/throwables.json");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('build')
		.setDescription('Will give you a randomized build.'),
	async execute(interaction) {

		var ranPrim = prim[Math.floor(Math.random() * prim.length)];
		var ranSec = sec[Math.floor(Math.random() * sec.length)];
		var ranArmor = armor[Math.floor(Math.random() * armor.length)];
		var ranDeployable = deployable[Math.floor(Math.random() * deployable.length)];
		var ranPerk = perk[Math.floor(Math.random() * perk.length)];
		var ranThrowable = throwable[Math.floor(Math.random() * throwable.length)];

		const buildEmbed = new MessageEmbed()
			.setColor("RANDOM")
			.setTitle("A completely random build")
			.setFooter("A bot by Soariticus#0666")
			.addFields(
				{ name: "Primary", value: `${ranPrim['type']}: ${ranPrim['name']}`, inline: true },
				{ name: "Secondary", value: `${ranSec['type']}: ${ranSec['name']}`, inline: true},
				{ name: "Armor", value: ranArmor['name'], inline: true},
				{ name: "Perkdeck", value: ranPerk['name'], inline: true},
				{ name: "Deployable", value: ranDeployable['name'], inline:true },
				{ name: "Throwable", value: ranThrowable['name'], inline:true }
			);
			

		await interaction.reply({embeds: [buildEmbed]});
		

	},
};