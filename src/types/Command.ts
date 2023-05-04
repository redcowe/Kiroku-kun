import { CommandInteraction, Interaction, SharedSlashCommandOptions, SlashCommandBuilder } from "discord.js"

export type Command = {
    data: SlashCommandBuilder | Omit<SlashCommandBuilder, "addSubcommandGroup" | "addSubcommand">;
    execute(interaction: CommandInteraction): void;
}