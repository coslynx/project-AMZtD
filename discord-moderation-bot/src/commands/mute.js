Filename: mute.js

```javascript
const { Command } = require('discord-akairo');

class MuteCommand extends Command {
    constructor() {
        super('mute', {
            aliases: ['mute'],
            category: 'Moderation',
            description: {
                content: 'Mute a user in the server.',
                usage: 'mute <@user> <reason>',
                examples: ['mute @User#0001 spamming']
            },
            userPermissions: ['MANAGE_ROLES'],
            clientPermissions: ['MANAGE_ROLES'],
            args: [
                {
                    id: 'member',
                    type: 'member'
                },
                {
                    id: 'reason',
                    type: 'string',
                    match: 'rest'
                }
            ]
        });
    }

    async exec(message, args) {
        const { member, reason } = args;
        
        if (member.roles.cache.some(role => role.name === 'Muted')) {
            return message.channel.send(`${member} is already muted.`);
        }

        const mutedRole = message.guild.roles.cache.find(role => role.name === 'Muted');
        if (!mutedRole) {
            return message.channel.send('Muted role not found. Please create a role named "Muted" for muting users.');
        }

        try {
            await member.roles.add(mutedRole);
            message.channel.send(`${member} has been muted for: ${reason}`);
        } catch (error) {
            console.error(error);
            message.channel.send('Failed to mute the user.');
        }
    }
}

module.exports = MuteCommand;
```
This code creates the `mute.js` file for the Discord moderation bot, allowing moderators to mute users in the server. The command checks if the user is already muted, finds the muted role, adds the muted role to the user, and sends appropriate messages based on the outcome.