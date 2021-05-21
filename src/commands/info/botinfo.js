const Command = require('../Command.js');
const { MessageEmbed } = require('discord.js');
const pkg = require(__basedir + '/package.json');
const { owner } = require('../../../data/text/emojis.json');
const { oneLine, stripIndent } = require('common-tags');

module.exports = class BotInfoCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'botinfo',
			aliases: ['bot', 'bi'],
			usage: 'botinfo',
			description: 'Fetches vxn\'s bot information.',
			type: client.types.INFO,
		});
	}
	run(message) {
		const botOwner = message.client.users.cache.get(message.client.ownerId);
		const prefix = message.client.db.settings.selectPrefix.pluck().get(message.guild.id);
		const tech = stripIndent`
		Version     :: ${pkg.version}
		Library     :: Discord.js v12.3.1
		Environment :: Node.js v12.16.3
		Database    :: SQLite
		`;
		const embed = new MessageEmbed()
			.setTitle('vxn\'s Bot Information')
			.setDescription(oneLine`
			vxn's minions is an open source, fully customizable Discord bot that is constantly growing.
			She comes packaged with a variety of commands and
			a multitude of settings that can be tailored to your server's specific needs.
			Her codebase also serves as a base framework to easily create Discord bots of all kinds.
			She first went live on **February 22nd, 2018**.
			`)
			.addField('Prefix', `\`${prefix}\``, true)
			.addField('Client ID', `\`${message.client.user.id}\``, true)
			.addField(`Developer ${owner}`, botOwner, true)
			.addField('Tech', `\`\`\`asciidoc\n${tech}\`\`\``)
		/* vxn 05/17/2021
			.addField(
				'Links',
				'**[Invite Me]([Your oauth2 URL]) | ' +
				'[Support Server]([Your Support Server URL]) | ' +
				'[Repository]([Your repository URL])**'
			)
		*/
			.setImage('https://cdn.discordapp.com/attachments/831673153716748318/839805792604913694/300.jpg')
			.setFooter(message.member.displayName, message.author.displayAvatarURL({ dynamic: true }))
			.setTimestamp()
			.setColor(message.guild.me.displayHexColor);
		message.channel.send(embed);
	}
};
