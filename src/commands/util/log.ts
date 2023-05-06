import { SlashCommandBuilder, CommandInteraction, CacheType } from "discord.js";
import { Command } from "../../types/Command";
import { log } from "node:console";
import { MessageData } from "../../classes/MessageData.js";
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
        const messageData = this.extractCommandInfo(interaction);
        if (messageData.type == ContentType.MANGA || messageData.type == ContentType.BOOK) this.handleBook(messageData, interaction);
        if (messageData.type == ContentType.ANIME || messageData.type == ContentType.YOUTUBE)  this.handleVideo(messageData, interaction);
    }   

    private async handleBook(data: MessageData, interaction: CommandInteraction<CacheType>) {
        log(interaction.user.username, interaction.user.id);
        log(interaction.guild?.name, interaction.guildId);
        interaction.reply(`Logged ${data.amount} pages of ${data.title} for ${interaction.user.username}.`);
    }
            
    private async handleVideo(data: MessageData, interaction: CommandInteraction<CacheType>) {
        log(Date.parse("10:00"));
        createVideoEntry(data).then((video) => {
            interaction.reply(`Logged ${video.duration} minutes for ${interaction.user.username}.`);        
        }).catch((err) => {
            log(err);
            interaction.reply("[ERROR] unable to create log. Message josh.#0007 and bother that nigga or sumn idk");
        });
    }

    private extractCommandInfo(interaction: CommandInteraction<CacheType>) {
        const messageData: MessageData = new MessageData();
        log(interaction.options.data);
        for (const data of interaction.options.data) {
            if (data.name == 'type') messageData.type = data.value as string;
            if (data.name == 'title') messageData.title = data.value as string;
            if (data.name == 'amount') messageData.amount = data.value as string;
            if (data.name == 'link') messageData.link = data.value as string;
        }
        messageData.username = interaction.user.username;
        messageData.userId = interaction.user.id;
        messageData.serverId = interaction.guildId
        messageData.serverName = interaction.guild?.name
        return messageData;
    }
}
