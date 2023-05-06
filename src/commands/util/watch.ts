import { SlashCommandBuilder, CommandInteraction, CacheType, ChannelType, GuildMemberManager, PermissionFlagsBits } from "discord.js";
import { Command } from "../../types/Command";

export default class Watch implements Command {
    data = new SlashCommandBuilder()
                .setName("watch")
                .setDescription("Specifies which channel should be monitor for automatic logging.")
                .addChannelOption(channel =>
                    channel
                        .setName("channel")
                        .setDescription("Channel to be monitored")
                        .addChannelTypes(ChannelType.GuildText)
                        .setRequired(true)
                    )
                .setDefaultMemberPermissions(PermissionFlagsBits.Administrator);
                
    async execute(interaction: CommandInteraction<CacheType>): Promise<void> {
    
        // console.log(interaction.options.data.at(0)?.channel?.name);
        
        await interaction.reply(`Tracking <#${interaction.options.data.at(0)?.channel?.id}>`)
    }
    
}