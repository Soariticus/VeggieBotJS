const { SlashCommandBuilder } = require('@discordjs/builders');
const jsonObj = require("../databases/secondaries.json");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('secondary')
		.setDescription('Should give a random secondary weapon'),
	async execute(interaction) {

		var num = Math.floor(Math.random() * jsonObj.length)
		
		await interaction.reply(`${jsonObj[num]['type']}: ${jsonObj[num]['name']}`);

	},
};