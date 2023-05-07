import { PrismaClient } from "@prisma/client";
import { Message } from "discord.js";
import { getYoutubeVideoDetails } from "../util/youtube.js";

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
    await prisma.videos.create({
        data: {
            link: message.content,
            duration: duration,
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

export async function createVideoEntry(message: Message) {
    getUserCount(message.author.id).then(async (response) => {
        if (response == 0) await createUser(message);
        await createVideo(message);
    });
}