import { SlashCommandBuilder, CommandInteraction, CacheType, EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle, ComponentType, APIEmbedField } from "discord.js";
import { Command } from "../../types/Command";
import { getUserWatchedVideos } from "../../db/database.js";
import { Videos } from "@prisma/client";

export default class WatchedVideos implements Command {
    data = new SlashCommandBuilder()
                .setName("watched_videos")
                .setDescription("Lists a given users watched videos")
    currentPage = 1;
    async execute(interaction: CommandInteraction<CacheType>) {
        await interaction.deferReply()
        const userWatchedVideos = await getUserWatchedVideos(interaction);
        const response = await interaction.editReply({embeds: [this.createWatchedVideosEmbed(interaction, userWatchedVideos, 1)], components: [this.createWatchedVideosButtons()]});
        const collector = response.createMessageComponentCollector()
        collector.on('collect', async collectorInteraction => {
            await collectorInteraction.deferUpdate()
            const FORWARD = 'forward';
            let totalNumberOfPages = Math.ceil(userWatchedVideos.length / 5);
            if (collectorInteraction.customId == FORWARD) {
                this.currentPage += 1;
                const buttons = totalNumberOfPages == this.currentPage ? this.createWatchedVideosButtons(true, false) : this.createWatchedVideosButtons(false, false) //if we're at the last page, disable the forward button
                await collectorInteraction.editReply({embeds: [this.createWatchedVideosEmbed(interaction, userWatchedVideos, this.currentPage)], components: [buttons]})
            } else {
                this.currentPage -= 1;
                const buttons = (1 == this.currentPage) ? this.createWatchedVideosButtons() : this.createWatchedVideosButtons(false, false) //if we're at the first page, disable the backwards button
                await collectorInteraction.editReply({embeds: [this.createWatchedVideosEmbed(interaction, userWatchedVideos, this.currentPage)], components: [buttons]})
            }
        })
    }

    private createWatchedVideosEmbed(interaction: CommandInteraction<CacheType>, videos: Videos[], currentPage: number) {
        let numberOfPages = Math.ceil(videos.length / 5);
        
        const fields: APIEmbedField[] = [];
        videos.forEach(video => fields.push({ name: video.title, value: video.link, inline: false }))
        return new EmbedBuilder()
                .setColor(0x0099FF)
                .setTitle(`${interaction.user.username}'s watched videos (${currentPage}/${numberOfPages})`)
                .setThumbnail(interaction.user.avatarURL() as string)
                .addFields(fields.slice((currentPage * 5) - 5, currentPage * 5))
    }

    private createWatchedVideosButtons(forwardButtonDisabled: boolean = false, backwardButtonDisabled: boolean = true) {
        return new ActionRowBuilder<ButtonBuilder>()
			.addComponents(
                [
                    new ButtonBuilder()
					.setCustomId('backward')
                    .setLabel('◀')
					.setStyle(ButtonStyle.Primary)
                    .setDisabled(backwardButtonDisabled),

                    new ButtonBuilder()
					.setCustomId('forward')
                    .setDisabled(forwardButtonDisabled)
					.setLabel('▶')
					.setStyle(ButtonStyle.Primary)
                ]
			);
    }
}