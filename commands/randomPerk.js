const { SlashCommandBuilder } = require('@discordjs/builders');
const jsonObj = require("../databases/perk.json");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('perkdeck')
		.setDescription('Should give a random perkdeck'),
	async execute(interaction) {

		var num = Math.floor(Math.random() * jsonObj.length)
		
		await interaction.reply(`${jsonObj[num]['name']}`);

	},
};