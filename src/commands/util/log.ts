import { SlashCommandBuilder, CommandInteraction, CacheType } from "discord.js";
import { Command } from "../../types/Command";
import { log } from "node:console";
import { createVideoEntry } from "../../db/database.js";

;



enum ContentType {
    MANGA = "MANGA", BOOK = "BOOK", ANIME = "ANIME", YOUTUBE = "YOUTUBE"
}

export default class Log implements Command {
    constructor(){}

    //creating command
    data = new SlashCommandBuilder()
                .setName('log')
                .setDescription('log some stuff')
                .addStringOption(option =>
                    option.setName("type")
                    .addChoices(
                        {name: 'manga', value: 'MANGA'},
                        {name: 'book', value: 'BOOK'},
                        {name: 'anime', value: 'ANIME'},
                        {name: 'youtube', value: 'YOUTUBE'},)
                    .setDescription("type of information to log")
                    .setRequired(true))
                    .addStringOption(option => 
                        option
                        .setName('title')
                        .setDescription('the title of the content to be logged')
                        .setRequired(true)
                    ).addStringOption(option =>
                        option
                        .setName('amount')
                        .setDescription('the amount of a given content consume')
                        .setRequired(true)
                    ).addStringOption(option =>
                        option
                        .setName('link')
                        .setDescription('a link to the content consumed')    
                    );
                     

    async execute(interaction: CommandInteraction<CacheType>): Promise<void> {
        this.handleVideo(interaction);
    }   

    private async handleBook(interaction: CommandInteraction<CacheType>) {
        await interaction.reply(`wip : )`);
    }
            
    private async handleVideo(interaction: CommandInteraction<CacheType>) {
        // await interaction.deferReply();
        // const video = await createVideoEntry(data);
        // await interaction.followUp(`Logged ${video.duration} minutes for ${interaction.user.username}.`);
    }

}
