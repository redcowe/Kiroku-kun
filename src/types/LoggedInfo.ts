import { CommandInteraction, CacheType } from "discord.js";

export type LoggedInfo = {
    type: string;
    title: string;
    amount: string;
    link?: string;
    interaction?: CommandInteraction<CacheType>;
}