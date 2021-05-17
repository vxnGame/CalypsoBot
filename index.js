// ================= START Web CODE ===================
const http = require('http');
http.createServer(function(req, res) {
	res.write('System online');
	res.end();
}).listen(8080);
// ================= START BOT CODE ===================
const config = require('./config');
const Client = require('./src/Client.js');
const { Intents } = require('discord.js');

global.__basedir = __dirname;

// Client setup
const intents = new Intents();
intents.add(
	'GUILD_PRESENCES',
	'GUILD_MEMBERS',
	'GUILDS',
	'GUILD_VOICE_STATES',
	'GUILD_MESSAGES',
	'GUILD_MESSAGE_REACTIONS',
);
const client = new Client(config, { ws: { intents: intents } });

// Initialize client
function init() {
	client.loadEvents('./src/events');
	client.loadCommands('./src/commands');
	client.loadTopics('./data/trivia');
	client.login(client.DISCORD_BOT_TOKEN);
}

init();

process.on('unhandledRejection', err => client.logger.error(err));