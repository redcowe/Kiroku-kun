import { PrismaClient, Videos } from "@prisma/client";
import { CacheType, CommandInteraction, Message } from "discord.js";
import { getYoutubeVideoDetails } from "../util/youtube.js";
import moment from "moment"
import { log } from "console";
export const prisma: PrismaClient = new PrismaClient();

async function createUser(message: Message) {
    log(`Creating new user with ID: ${message.author.id}`)
    await prisma.user.create({
        data: {
            id: parseInt(message.author.id),
        }
    }).catch(err => {
        log(`Error creating user ${err}`)
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
    }).catch(err => {
        log(`Error creating video: ${err}`)
    })
    log(`Created video for ${message.author.id} with title ${title}`)
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
    log(`Fetching watched videos for ${interaction.options.get('user')?.value == undefined ? interaction.user.id : interaction.options.get('user')?.value}`)
    return await prisma.videos.findMany({
        where: {
            userId: parseInt(userIDFromOptions == undefined ? userIDFromInteraction : userIDFromOptions)
        }
    }).catch(err => {
        log(`Error fetching user videos: ${err}`)
    })
}


export async function createVideoEntry(message: Message) {
    getUserCount(message.author.id).then(async (response) => {
        if (response == 0) await createUser(message);
        await createVideo(message);
    });
}

export async function getUserTotalTimeWatch(interaction: CommandInteraction<CacheType>) {
    log(`Getting total watch time for ${interaction.options.get('user')?.value}`)
    const userWatchedVideos = await getUserWatchedVideos(interaction) as Videos[];
    let amountOfTimeWatched = 0;
    userWatchedVideos.forEach(video => {
        amountOfTimeWatched += moment.duration(video.duration).asMinutes()
    })
    return amountOfTimeWatched;
}

