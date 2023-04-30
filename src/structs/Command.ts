import { CommandInteraction, Interaction, SlashCommandBuilder } from "discord.js"

export interface Command {
    data: SlashCommandBuilder;
    execute(interaction: CommandInteraction): void
}