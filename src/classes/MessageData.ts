import { CommandInteraction, CacheType } from "discord.js";
import { MessageInfo } from "../types/MessageInfo";

export class MessageData implements MessageInfo {
    constructor() {}
    serverName: string |undefined;
    serverId: string | null = "";
    username: string = "";
    userId: string = "";
    type: string = "";
    title: string = "";
    amount: string = "";
    link?: string | undefined;
    interaction?: CommandInteraction<CacheType> | undefined;
}