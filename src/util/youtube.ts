import { youtube } from '@googleapis/youtube';



export async function getYoutubeVideoDetails(link: string) {
    const YOUTUBE_TOKEN = process.env.YOUTUBE_TOKEN as string
    const youtubeAPI = youtube({
        version: "v3",
        auth: YOUTUBE_TOKEN
    })
    
    return await youtubeAPI.videos.list({
        "part": [
            "snippet, contentDetails"
        ],
        "id": [
            parseYoutubeLink(link)
        ]}) 
}

function parseYoutubeLink(url: string) {
    const urlArray = url.split(/^.*(youtu.be\/|v\/|e\/|u\/\w+\/|embed\/|v=)([^#\&\?]*).*/);    
    return (urlArray[2] !== undefined) ? urlArray[2].split(/[^0-9a-z_\-]/i)[0] : urlArray[0];
}