require('dotenv').config();
const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
});

const token = process.env.DISCORD_TOKEN;

client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('messageCreate', message => {
    if (message.content === '!serverstats') {
        const { guild } = message;

        // Create an embed message
        const embed = new EmbedBuilder()
            .setColor('#0099ff')
            .setTitle('Server Statistics')
            .setDescription(`Statistics for **${guild.name}**`)
            .setThumbnail(guild.iconURL())
            .addFields(
                { name: '👥 Members', value: `${guild.memberCount}`, inline: true },
                { name: '🆔 Server ID', value: `${guild.id}`, inline: true },
                { name: '📅 Created On', value: `${guild.createdAt.toDateString()}`, inline: true },
                { name: '🌍 Region', value: `${guild.preferredLocale}`, inline: true },
                { name: '👑 Owner', value: `<@${guild.ownerId}>`, inline: true },
            )
            .setTimestamp()
            .setFooter({ text: 'Server Statistics', iconURL: guild.iconURL() });

        // Send the embed message to the same channel
        message.channel.send({ embeds: [embed] });
    }
});

client.login(token);
