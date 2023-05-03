import { Client, ClientOptions, Collection, Events, REST, Routes, SlashCommandBuilder } from 'discord.js'
import { Command } from './Command';
import { ParsedPath, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { glob } from 'glob'
import { promisify } from 'node:util';
import fs from 'node:fs'
import path from 'node:path';
import { log } from 'node:console';


export class ExtendedClient extends Client {
    constructor(options: ClientOptions) {
        super(options);
    }
    commands: Collection<string, Command> = new Collection();

    testArray: any[] = [];

    private resolveToken(token: string | undefined) {
        if (token === undefined) {
            throw new Error("Unable to load token");
        }
        return token;
    }

    private registerCommands(DISCORD_TOKEN: string, CLIENT_ID: string, GUILD_ID: string, commands: Collection<string, Command>) {
        const rest = new REST({version: '10'}).setToken(DISCORD_TOKEN);
        // console.log(commands.toJSON());
        rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), { body: commands.toJSON()});
    }

    private async importFile(filePath: string) {
        return new(await import(filePath)).default;
    }


    async start(token: string | undefined, client_id: string, guild_id: string) {
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);
        const internalCommands: any[] = [];
        glob(`${__dirname}/../commands/*/*{.ts,.js}`)
        .then(((async (response: string[]) => {
            // console.log(response);
            for(const file of response) {
                const command: Command = await this.importFile(file);
                 //    log(command)
                this.commands.set(command.data.name, command);      
            }
            return this.commands;      
        }))).then(result => {
            this.registerCommands(this.resolveToken(token), client_id, guild_id, result)
        })
        
        
        
        
        this.login(this.resolveToken(token))
        this.once(Events.ClientReady, c => {
            console.log(c.user.tag, "is ready to go!");
        })
    }

}
