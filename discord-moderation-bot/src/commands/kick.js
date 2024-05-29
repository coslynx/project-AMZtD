Filename: kick.js

```javascript
const { Client, Message } = require('discord.js');

/**
 * Kick a user from the server.
 * @param {Client} client - The Discord client
 * @param {Message} message - The message that triggered the command
 * @param {string[]} args - The command arguments
 */
async function kickCommand(client, message, args) {
    if (!message.member.hasPermission('KICK_MEMBERS')) {
        return message.reply('You do not have permission to use this command.');
    }

    const user = message.mentions.users.first();
    if (!user) {
        return message.reply('Please mention the user to kick.');
    }

    const member = message.guild.members.cache.get(user.id);
    if (!member) {
        return message.reply('That user is not in this server.');
    }

    if (!member.kickable) {
        return message.reply('I cannot kick that user. Check my role hierarchy.');
    }

    try {
        await member.kick();
        message.channel.send(`${user.tag} has been kicked.`);
    } catch (error) {
        console.error('An error occurred while kicking the user:', error);
        message.reply('There was an error kicking the user.');
    }
}

module.exports = {
    name: 'kick',
    description: 'Kick a user from the server',
    execute: kickCommand,
};
```
