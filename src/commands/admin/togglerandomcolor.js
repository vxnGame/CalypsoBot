const Command = require('../Command.js');
const { MessageEmbed } = require('discord.js');

module.exports = class ToggleRandomColorCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'togglerandomcolor',
      aliases: ['togglerc', 'togrc', 'trc'],
      usage: 'togglerandomcolor',
      description: `
        Enables or disables random color role assigning when someone joins your server, or upon being verified.
      `,
      type: client.types.ADMIN,
      userPermissions: ['MANAGE_GUILD']
    });
  }
  run(message) {
    let randomColor = message.client.db.settings.selectRandomColor.pluck().get(message.guild.id);
    randomColor = 1 - randomColor; // Invert
    message.client.db.settings.updateRandomColor.run(randomColor, message.guild.id);
    let description, status;
    if (randomColor == 1) {
      status = '`disabled`	🡪 `enabled`';
      description = '`Random color` has been successfully **enabled**. <:success:736449240728993802>';
    } else {
      status = '`enabled` 🡪 `disabled`';
      description = '`Random color` has been successfully **disabled**. <:fail:736449226120233031>';   
    } 
    
    const embed = new MessageEmbed()
      .setTitle('Setting: `Random Color`')
      .setThumbnail(message.guild.iconURL())
      .setDescription(description)
      .addField('Status', status, true)
      .setFooter(message.member.displayName,  message.author.displayAvatarURL({ dynamic: true }))
      .setTimestamp()
      .setColor(message.guild.me.displayHexColor);
    message.channel.send(embed);
  }
};