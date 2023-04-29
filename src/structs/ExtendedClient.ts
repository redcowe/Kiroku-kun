import { Client, ClientOptions, Collection, Events, SlashCommandBuilder } from 'discord.js'

export class ExtendedClient extends Client {
    constructor(options: ClientOptions) {
        super(options);
    }

    commands: Collection<string, SlashCommandBuilder> = new Collection()

    private resolveToken(token: string | undefined) {
        if (token === undefined) {
            throw new Error("Unable to load token");
        }
        return token;
    }

    start(token: string | undefined) {
        this.login(this.resolveToken(token))
        this.once(Events.ClientReady, c => {
            console.log(c.user.tag, "is reaady to go!");
        })
    }
}

