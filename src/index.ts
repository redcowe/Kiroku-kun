import { GatewayIntentBits } from 'discord.js';
import { ExtendedClient } from './structs/ExtendedClient.js';
import dotenv from 'dotenv'

const client: ExtendedClient = new ExtendedClient({ intents: GatewayIntentBits.Guilds });

//loading env variables
dotenv.config();

client.start(process.env.DISCORD_TOKEN)



