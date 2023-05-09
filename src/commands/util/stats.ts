import { SlashCommandBuilder, CommandInteraction, CacheType } from "discord.js";
import { Command } from "../../types/Command";
import { getUserTotalTimeWatch } from "../../db/database.js";

export default class Stats implements Command {
    data = new SlashCommandBuilder()
                .setName("watch_time")
                .setDescription("Gets stats for a given user")
                .addUserOption(option => 
                    option
                    .setName("user")
                    .setDescription("name of the user")
                    .setRequired(true)
                )

    async execute(interaction: CommandInteraction<CacheType>) {
        const stats = (await getUserTotalTimeWatch(interaction)).toPrecision(5);
        await interaction.reply(`<@${interaction.options.get("user")?.value}> has watched ${stats} minutes of content.`);    
    }

}