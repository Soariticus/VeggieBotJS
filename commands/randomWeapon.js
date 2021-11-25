const { SlashCommandBuilder } = require('@discordjs/builders');
const jsonObj = require("../databases/primaries.json");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('primary')
		.setDescription('Should give a random primary weapon'),
	async execute(interaction) {

		var num = Math.floor(Math.random() * jsonObj.length)
		
		await interaction.reply(`${jsonObj[num]['type']}: ${jsonObj[num]['name']}`);

	},
};