import { PrismaClient } from "@prisma/client";
import { MessageData } from "../classes/MessageData";

export const prisma: PrismaClient = new PrismaClient();

async function createUser(data: MessageData) {

    const user = prisma.user.create({data: {
        id: parseInt(data.userId),
        name: data.username
    }});

    return user;
}

async function createVideo(data: MessageData) {
    const video = await prisma.videos.create({
        data: {
            link: data.link as string,
            duration: data.amount,
            userId: parseInt(data.userId)
        }
    })
    return video;
}

export async function createVideoEntry(data: MessageData) {
    const userCount = await prisma.user.count({
        where: {
            id: parseInt(data.userId)
        }
    })
    if (userCount == 0) createUser(data);
    return createVideo(data);
}