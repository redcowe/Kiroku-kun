import { CacheType, CommandInteraction, SlashCommandBuilder } from "discord.js"; 
import { Command } from "../../types/Command";

export default class Ping implements Command {
    constructor() {}
    data = new SlashCommandBuilder()
            .setName("ping")
            .setDescription("Replies with pong!");
    async execute(interaction: CommandInteraction<CacheType>): Promise<void> {
      await interaction.reply('Pong! Ping!');
    };
}