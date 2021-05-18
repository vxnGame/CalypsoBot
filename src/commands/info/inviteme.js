const Command = require('../Command.js');
const { MessageEmbed } = require('discord.js');
const { oneLine } = require('common-tags');

module.exports = class InviteMeCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'inviteme',
			aliases: ['invite', 'invme', 'im'],
			usage: 'inviteme',
			description: 'Generates a link you can use to invite vxn\'s minions to your own server.',
			type: client.types.INFO,
		});
	}
	run(message) {
		const embed = new MessageEmbed()
			.setTitle('Invite Me')
			.setThumbnail('https://cdn.discordapp.com/attachments/831673153716748318/839805709449560064/200.jpg')
			.setDescription(oneLine`
        Click [here]([Your oauth2 URL])
        to invite me to your server!
      `)
			.addField('Other Links',
				'**[Support Server]([Your Support Server URL]) | ' +
        '[Repository]([Your repository URL])**',
			)
			.setFooter(message.member.displayName, message.author.displayAvatarURL({ dynamic: true }))
			.setTimestamp()
			.setColor(message.guild.me.displayHexColor);
		message.channel.send(embed);
	}
};
