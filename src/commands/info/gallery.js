const Command = require('../Command.js');
const ReactionMenu = require('../ReactionMenu.js');
const { MessageEmbed } = require('discord.js');
const art = [
	'https://cdn.discordapp.com/attachments/831673153716748318/839805709449560064/200.jpg',
	'https://cdn.discordapp.com/attachments/831673153716748318/839805748623966208/201.jpg',
	'https://cdn.discordapp.com/attachments/831673153716748318/839805769033056286/202.jpg',
	'https://cdn.discordapp.com/attachments/831673153716748318/839805792604913694/300.jpg',
	'https://cdn.discordapp.com/attachments/831673153716748318/839805812393508864/301.jpg',
	'https://cdn.discordapp.com/attachments/831673153716748318/839805833143517224/302.jpg',
];

module.exports = class GalleryCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'gallery',
			aliases: ['art'],
			usage: 'gallery',
			description: 'Displays a gallery of vxn\'s art.',
			type: client.types.INFO,
			clientPermissions: ['SEND_MESSAGES', 'EMBED_LINKS', 'ADD_REACTIONS'],
		});
	}
	run(message) {
		let n = 0;
		const embed = new MessageEmbed()
			.setTitle('Art Gallery')
			.setDescription('All art courtesy of **CommradeFido#5286**.')
			.setImage(art[n])
			.setFooter(
				'Expires after three minutes.\n' + message.member.displayName,
				message.author.displayAvatarURL({ dynamic: true }),
			)
			.setTimestamp()
			.setColor(message.guild.me.displayHexColor);
		const json = embed.toJSON();
		const previous = () => {
			(n <= 0) ? n = art.length - 1 : n--;
			return new MessageEmbed(json).setImage(art[n]);
		};
		const next = () => {
			(n >= art.length - 1) ? n = 0 : n++;
			return new MessageEmbed(json).setImage(art[n]);
		};

		const reactions = {
			'◀️': previous,
			'▶️': next,
			'⏹️': null,
		};

		const menu = new ReactionMenu(
			message.client,
			message.channel,
			message.member,
			embed,
			null,
			null,
			reactions,
			180000,
		);

		menu.reactions['⏹️'] = menu.stop.bind(menu);

	}
};