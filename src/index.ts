import { Client, Events, GatewayIntentBits } from 'discord.js'
import dotenv from 'dotenv'

dotenv.config();
const client: Client = new Client({ intents: [GatewayIntentBits.Guilds]});

client.once(Events.ClientReady, c => {
    console.log(c.user.tag, " is ready to go!");
});

client.login(process.env.DISCORD_TOKEN).then(() => {
    console.log("Successful login");
}).catch((err) => {
    console.log("Unable to login. Recieved the following error: ", err);
});