import { CommandInteraction, SlashCommandBuilder } from "discord.js"; 

export const Ping = {
    data: new SlashCommandBuilder()
                .setName("Ping")
                .setDescription("Replies with pong!"),
    async execute(interaction: CommandInteraction) {
        await interaction.reply('Pong');
    }
};