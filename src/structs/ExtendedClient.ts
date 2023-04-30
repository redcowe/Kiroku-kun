import { Client, ClientOptions, Collection, Events, SlashCommandBuilder } from 'discord.js'
import { Command } from './Command';
import { ParsedPath, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { glob } from 'glob'
import { promisify } from 'node:util';
import fs from 'node:fs'
import path from 'node:path';
import { Ping } from '../commands/fun/ping.js';
import { log } from 'node:console';

const globPromise = promisify(glob);
export class ExtendedClient extends Client {
    constructor(options: ClientOptions) {
        super(options);
    }

    commands: Collection<string, Command> = new Collection()

    private resolveToken(token: string | undefined) {
        if (token === undefined) {
            throw new Error("Unable to load token");
        }
        return token;
    }

    async start(token: string | undefined) {
    
        const commands = glob('*/*.ts', {windowsPathsNoEscape: true});
        console.log((await commands));
        
        this.login(this.resolveToken(token))
        this.once(Events.ClientReady, c => {
            console.log(c.user.tag, "is ready to go!");
        })
    }
}

