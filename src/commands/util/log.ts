import { SlashCommandBuilder, CommandInteraction, CacheType, BaseInteraction } from "discord.js";
import { Command } from "../../structs/Command";


export default class Log implements Command {
    constructor(){}

    data = new SlashCommandBuilder()
                .setName('log')
                .setDescription('log some stuff');

    async execute(interaction: CommandInteraction<CacheType>): Promise<void> {
        await interaction.reply("Logging some stuff!");
    }
}