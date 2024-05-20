import {Client, Partials, ApplicationCommandDataResolvable, Collection, CommandInteraction} from "discord.js";
import glob from "glob-promise";
import {logger, root} from "../index";
import {BaseCommand} from "../handlers/command/BaseCommand";
import { Node } from "lavaclient";

export class Failsafe extends Client {

    public commands: Collection<string, BaseCommand>
    public lavalink: Node

    constructor() {
        super({
            intents: [
                "MessageContent",
                "GuildMessages",
                "Guilds",
                "GuildMembers",
                "GuildVoiceStates",
                "GuildPresences"
            ],
            partials: [
                Partials.Channel
            ]
        })

        this.commands = new Collection<string, BaseCommand>()

        this.lavalink = new Node({
            info: {
                host: "localhost",
                port: 2333,
                auth: "youshallnotpass"
            },
            discord: {
                sendGatewayCommand: (id, payload) => {
                    const guild = this.guilds.cache.get(id)
                    guild?.shard.send(payload)
                }
            },
            rest: {

            },
            ws: {
                clientName: "Failsafe-Client",
                resuming: { timeout: 30000 },
                reconnecting: {
                    tries: 5,
                    delay: attempt => attempt * 1000
                }
            }
        });

    }

    public async start(token: string): Promise<void> {
        logger.info(`[Client]`, `starting client...`)
        await this.login(token)
        await this.loadCommands();
    }

    private async loadCommands(): Promise<void> {
        const commandFiles = await glob(`${root}\\commands\\*\\*.js`.replace(/\\/g, '/')); //Fuck you windows
        for(let file of commandFiles) {
            const command = await this.importCommand(file) as BaseCommand;
            if(!command.name) return;

            logger.info(`[Client]`, `loaded command ${command.name}`)

            this.commands.set(command.name, command);
        }
        await this.registerCommands(this.commands, "732479270668206142");
        logger.info(`[Client]`, `registering commands`)
    }

    private async registerCommands(commands: Map<string, BaseCommand>, guildId: string): Promise<void> {
        try {
            const applicationCommands = this.commands.map(command => command.makeApplicationCommand());
            const guild = this.guilds.cache.get(guildId) ? this.guilds.cache.get(guildId) : await this.guilds.fetch(guildId)
            guild?.commands.set(applicationCommands);
        } catch (err) {
            console.log(err)
        }
    }

    private async importCommand(file: string) {
        const Command = (require(file).default);
        return new Command()
    }
}
