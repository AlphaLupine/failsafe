import {ApplicationCommandDataResolvable, CommandInteraction} from "discord.js";

export abstract class BaseCommand {
    abstract name: string
    abstract description: string
    abstract execute(cmd: CommandInteraction, args?: any): Promise<void>

    abstract makeApplicationCommand(): ApplicationCommandDataResolvable
}