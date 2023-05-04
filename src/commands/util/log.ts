import { SlashCommandBuilder, CommandInteraction, CacheType, BaseInteraction, CommandInteractionOption } from "discord.js";
import { Command } from "../../types/Command";
import { log } from "node:console";
import { LoggedInfo } from "../../types/LoggedInfo";
import { test } from "node:test";

class LogData implements LoggedInfo {
    constructor() {}
    type: string = "";
    title: string = "";
    amount: string = "";
    link?: string | undefined;
    interaction?: CommandInteraction<CacheType> | undefined;
}

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
        const logData: LogData = new LogData();
        log(interaction.options.data);
        for (const data of interaction.options.data) {
            if (data.name == 'type') logData.type = data.value as string;
            if (data.name == 'title') logData.title = data.value as string;
            if (data.name == 'amount') logData.amount = data.value as string;
            if (data.name == 'link') logData.link = data.value as string;
        }
        if (logData.type == ContentType.MANGA || logData.type == ContentType.BOOK) this.handleBook(logData, interaction);
        if (logData.type == ContentType.ANIME || logData.type == ContentType.YOUTUBE)  this.handleVideo(logData, interaction);
    }   

    private async handleBook(data: LogData, interaction: CommandInteraction<CacheType>) {
        interaction.reply(`Logged ${data.amount} pages of ${data.title} for ${interaction.user.username}.`);
    }
            
    private async handleVideo(data: LogData, interaction: CommandInteraction<CacheType>){
     interaction.reply(`Logged ${data.amount} minutes for ${interaction.user.username}.`);        
    }
}
