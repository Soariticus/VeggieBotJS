const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");

const prim = require("../databases/primaries.json");
const sec = require("../databases/secondaries.json");
const armor = require("../databases/armor.json");
const deployable = require("../databases/deployable.json");
const perk = require("../databases/perk.json");
const throwable = require("../databases/throwables.json");
const perkWithThrowable = require("../databases/perksWithThrowable.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("personalized_build")
    .setDescription(
      "Will give you a randomized build with weapons you rarely use."
    ),
  async execute(interaction) {
    let userId = interaction.member.user.id;
    const response = await fetch(
      `https://payday-2-charts.herokuapp.com/api/veggie_bot/${userId}/build`
    );
    const reply = await response.json();

    if (response.status === 404) {
      const buildEmbed = new MessageEmbed()
        .setColor("RANDOM")
        .setTitle("Error")
        .setFooter("A command by 0lafe")
        .addFields([
          {
            name: "Error",
            value:
              "Your discord ID was not found on payday-2-charts.herokuapp.com. To link your account and enable this command run the link_account command, and follow the instructions.",
            inline: true,
          },
        ]);

      await interaction.reply({ embeds: [buildEmbed], ephemeral: true });
      return;
    }

    const primaryWeapons = {};
    for (index in prim) {
      primaryWeapons[prim[index].name] = true;
    }

    const secondaryWeapons = {};
    for (index in sec) {
      secondaryWeapons[sec[index].name] = true;
    }

    const limit = 20;
    let counter = 0;

    const primaries = reply.weapon_stats.filter((stat) => {
      if (
        primaryWeapons[stat[0]] &&
        stat[1] != 0 &&
        counter < limit
      ) {
        counter++;
        return stat[0];
      }
    });

    counter = 0;
    const secondaries = reply.weapon_stats.filter((stat) => {
      if (secondaryWeapons[stat[0]] && stat[1] != 0 && counter < limit) {
        counter++;
        return true;
      }
    });
    
    var ranPrim = primaries[Math.floor(Math.random() * primaries.length)][0];
    var ranSec = secondaries[Math.floor(Math.random() * secondaries.length)][0];
    var ranPerk = perk[Math.floor(Math.random() * perk.length)];

    const randomArmorID = ranPerk.armors[Math.floor(Math.random() * ranPerk.armors.length)]
    const ranArmor = armor.find((armor) => { return armor.id === randomArmorID })

    var ranDeployable =
      deployable[Math.floor(Math.random() * deployable.length)];
    var ranThrowable = throwable[Math.floor(Math.random() * throwable.length)];

    const processedThrowable = (throwableName) => {
      return {
        name: "Throwable",
        value: throwableName,
        inline: true,
      };
    };

    var fieldArray = [
      {
        name: "Primary",
        value: ranPrim,
        inline: true,
      },
      {
        name: "Secondary",
        value: ranSec,
        inline: true,
      },
      { name: "Armor", value: ranArmor["name"], inline: true },
      { name: "Perkdeck", value: ranPerk["name"], inline: true },
      { name: "Deployable", value: ranDeployable["name"], inline: true },
    ];

    if (perkWithThrowable[ranPerk["name"]]) {
      fieldArray.push(processedThrowable(perkWithThrowable[ranPerk["name"]]));
    } else {
      fieldArray.push(processedThrowable(ranThrowable["name"]));
    }

    const buildEmbed = new MessageEmbed()
      .setColor("RANDOM")
      .setTitle("A semi random build made special for you")
      .setFooter("A command by 0lafe")
      .addFields(fieldArray);

    await interaction.reply({ embeds: [buildEmbed] });
  },
};
