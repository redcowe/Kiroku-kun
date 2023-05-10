import { SlashCommandBuilder, CommandInteraction, CacheType } from "discord.js";
import { Command } from "../../types/Command";
import { getUserTotalTimeWatch } from "../../db/database.js";

export default class Stats implements Command {
    data = new SlashCommandBuilder()
                .setName("watch_time")
                .setDescription("Gets watch time in minutes for a given user")
                .addUserOption(option => 
                    option
                    .setName("user")
                    .setDescription("name of the user")
                    .setRequired(true)
                )

    async execute(interaction: CommandInteraction<CacheType>) {
        await interaction.deferReply()
        const watchTimeInMinutes = (await getUserTotalTimeWatch(interaction)).toPrecision(5);
        await interaction.editReply(`<@${interaction.options.get("user")?.value}> has watched ${watchTimeInMinutes} minutes of content.`);    
    }

}