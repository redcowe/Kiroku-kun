import { BaseInteraction, Events, GatewayIntentBits, Message } from 'discord.js';
import { ExtendedClient } from './classes/ExtendedClient.js';
import dotenv from 'dotenv'

import { createVideoEntry } from './db/database.js';


(async () => {

    dotenv.config();

    const DISCORD_TOKEN = process.env.DISCORD_TOKEN as string;
    const CLIENT_ID = process.env.CLIENT_ID as string;
    const GUILD_ID = process.env.GUILD_ID as string;

    const client: ExtendedClient = new ExtendedClient({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });
    

    await client.start(DISCORD_TOKEN, CLIENT_ID, GUILD_ID);
    
    client.on(Events.InteractionCreate, (interaction: BaseInteraction) => {
        if (interaction.isCommand() && !interaction.user.bot) {
            try {
                client.commands.get(interaction.commandName)?.execute(interaction);
            } catch(err) {
                console.error(err);
            }
        }
        
    })

    client.on(Events.MessageCreate, async (message: Message ) => {
        const youtubeRegex =/(?:https?:\/\/)?(?:www\.)?youtu(?:\.be\/|be.com\/\S*(?:watch|embed)(?:(?:(?=\/[-a-zA-Z0-9_]{11,}(?!\S))\/)|(?:\S*v=|v\/)))([-a-zA-Z0-9_]{11,})/;
        const regex = new RegExp(youtubeRegex);
        if (message.content.startsWith("!")) return;
        if (regex.test(message.content)) {
            createVideoEntry(message).then(async () => {
                await message.react('✅')
            });
        }
    })
})()

