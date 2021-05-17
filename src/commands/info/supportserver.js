const Command = require('../Command.js');
const { MessageEmbed } = require('discord.js');

module.exports = class SupportServerCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'supportserver',
			aliases: ['support', 'ss'],
			usage: 'supportserver',
			description: 'Displays the invite link to vxn\'s Discord Support Server.',
			type: client.types.INFO,
		});
	}
	run(message) {
		const embed = new MessageEmbed()
			.setTitle('Support Server')
			.setThumbnail('https://cdn.discordapp.com/attachments/831673153716748318/839805709449560064/200.jpg')
			.setDescription('Click [here]([Your Support Server URL]) to join the vxn\'s minions Support Server!')
			.addField('Other Links',
				'**[Invite Me]([Your oauth2 URL]) | ' +
        '[Repository]([Your repository URL])**',
			)
			.setFooter(message.member.displayName, message.author.displayAvatarURL({ dynamic: true }))
			.setTimestamp()
			.setColor(message.guild.me.displayHexColor);
		message.channel.send(embed);
	}
};
