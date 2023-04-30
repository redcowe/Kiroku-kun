import { Client, ClientOptions, Collection, Events, SlashCommandBuilder } from 'discord.js'
import { Command } from './Command';
import { ParsedPath, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { glob } from 'glob'
import { promisify } from 'node:util';
import fs from 'node:fs'
import path from 'node:path';
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

    private async importFiles(filePath: string) {
        return (await import(filePath))?.default;
    }
    
    private async registerCommands() {
        const __filename = fileURLToPath(import.meta.url);

        const __dirname = path.dirname(__filename);
        const commandFiles = await glob(`${__dirname}/../commands/*/*{.ts,.js}`)
        commandFiles.forEach(async file => {
            await import(file).then(module => {                
                this.commands.set(new module.default().data.name, new module.default())
            }).catch(err => {
                console.log('[Error Occurred]', err);
            }) ;
        })
              
    }
    start(token: string | undefined) {
        this.registerCommands();
        this.login(this.resolveToken(token))
        this.once(Events.ClientReady, c => {
            console.log(c.user.tag, "is ready to go!");
        })
    }

}

