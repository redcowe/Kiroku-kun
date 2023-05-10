import { PrismaClient } from "@prisma/client";
import { CacheType, CommandInteraction, Message } from "discord.js";
import { getYoutubeVideoDetails } from "../util/youtube.js";
import moment from "moment"
export const prisma: PrismaClient = new PrismaClient();

async function createUser(message: Message) {
    await prisma.user.create({
        data: {
            id: parseInt(message.author.id),
        }
    })
}

async function createVideo(message: Message) {
    const apiResponse = await getYoutubeVideoDetails(message.content);
    const duration = apiResponse.data.items?.at(0)?.contentDetails?.duration as string;
    const title = apiResponse.data.items?.at(0)?.snippet?.title as string;
    await prisma.videos.create({
        data: {
            link: message.content,
            duration: duration,
            title: title,
            userId: parseInt(message.author.id)
        }
    })
}

async function getUserCount(id: string) {
    return prisma.user.count({
        where: {
            id: parseInt(id)
        }
    })
}

export async function getUserWatchedVideos(interaction: CommandInteraction<CacheType>) {
    const userIDFromOptions = interaction.options.get("user")?.value as string;
    const userIDFromInteraction = interaction.user.id;
    return await prisma.videos.findMany({
        where: {
            userId: parseInt(userIDFromOptions == undefined ? userIDFromInteraction : userIDFromOptions)
        }
    })
}


export async function createVideoEntry(message: Message) {
    getUserCount(message.author.id).then(async (response) => {
        if (response == 0) await createUser(message);
        await createVideo(message);
    });
}

export async function getUserTotalTimeWatch(interaction: CommandInteraction<CacheType>) {
    const userWatchedVideos = await getUserWatchedVideos(interaction);
    let amountOfTimeWatched = 0;
    userWatchedVideos.forEach(video => {
        amountOfTimeWatched += moment.duration(video.duration).asMinutes()
    })
    return amountOfTimeWatched;
}

