import { CommandInteraction, SlashCommandBuilder } from "discord.js"; 
import { Command } from "../../structs/Command";

export default class Ping implements Command {
    constructor() {}
    data = new SlashCommandBuilder()
            .setName("ping")
            .setDescription("Replies with pong!");

    async execute(interaction: CommandInteraction): Promise<void> {
      await interaction.reply('Pong!');
    };
}