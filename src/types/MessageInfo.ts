import { CommandInteraction, CacheType } from "discord.js";

export type MessageInfo = {
    serverName: string | undefined;
    serverId: string | null;
    type: string;
    title: string;
    amount: string;
    username: string;
    userId: string;
    link?: string;
    interaction?: CommandInteraction<CacheType>;
}