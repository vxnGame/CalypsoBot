const Command = require('../Command.js');
const { MessageEmbed } = require('discord.js');
const { oneLine } = require('common-tags');

module.exports = class ToggleCommandCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'togglecommand',
      aliases: ['togglec', 'togc', 'tc'],
      usage: 'togglecommand <command>',
      description: oneLine`
        Enables or disables the provided command. 
        Disabled commands will no longer be able to be used, and will no longer show up with the \`help\` command.
        \`${client.types.ADMIN}\` commands cannot be disabled.
      `,
      type: client.types.ADMIN,
      userPermissions: ['MANAGE_GUILD'],
      examples: ['togglecommand ping']
    });
  }
  run(message, args) {

    const command = message.client.commands.get(args[0]) || message.client.aliases.get(args[0]);
    if (!command || (command && command.type == message.client.types.OWNER)) 
      return this.sendErrorMessage(message, 'Invalid argument. Please provide a valid command.');

    if (command.type === message.client.types.ADMIN) 
      return this.sendErrorMessage(message, `
        Invalid argument. \`${message.client.types.ADMIN}\` commands cannot be disabled.
      `);

    let disabledCommands = message.client.db.settings.selectDisabledCommands.pluck().get(message.guild.id) || [];
    if (typeof(disabledCommands) === 'string') disabledCommands = disabledCommands.split(' ');

    let description;

    // Disable command
    if (!disabledCommands.includes(command.name)) {
      disabledCommands.push(command.name); // Add to array if not present
      description = `The \`${command.name}\` command has been successfully **disabled**. <:fail:736449226120233031>`;
    
    // Enable command
    } else {
      message.client.utils.removeElement(disabledCommands, command.name);
      description = `The \`${command.name}\` command has been successfully **enabled**. <:success:736449240728993802>`;
    }

    message.client.db.settings.updateDisabledCommands.run(disabledCommands.join(' '), message.guild.id);

    disabledCommands = disabledCommands.map(c => `\`${c}\``).join(' ') || '`None`';
    const embed = new MessageEmbed()
      .setTitle('Setting: `Disabled Commands`')
      .setThumbnail(message.guild.iconURL({ dynamic: true }))
      .setDescription(description)
      .addField('Disabled Commands', disabledCommands, true)
      .setFooter(message.member.displayName,  message.author.displayAvatarURL({ dynamic: true }))
      .setTimestamp()
      .setColor(message.guild.me.displayHexColor);
    message.channel.send(embed);
  }
};
