import { BaseInteraction, ClientEvents, CommandInteraction, Events, GatewayIntentBits, Message, REST, Routes } from 'discord.js';
import { ExtendedClient } from './structs/ExtendedClient.js';
import dotenv from 'dotenv'

(async () => {

    const client: ExtendedClient = new ExtendedClient({ intents: GatewayIntentBits.Guilds });

    //loading env variables
    dotenv.config();

    const DISCORD_TOKEN = process.env.DISCORD_TOKEN as string;
    const CLIENT_ID = process.env.CLIENT_ID as string;
    const GUILD_ID = process.env.GUILD_ID as string;

    await client.start(DISCORD_TOKEN, CLIENT_ID, GUILD_ID);
    
    client.on(Events.InteractionCreate, (interaction: BaseInteraction) => {
        if (interaction.isCommand()) {
            try {
                client.commands.get(interaction.commandName)?.execute(interaction);
            } catch(err) {
                console.error(err);
            }
        }
        
    })
})()
