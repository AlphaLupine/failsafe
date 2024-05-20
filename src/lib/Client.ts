import {Collection} from "discord.js";
import {BaseCommand} from "../handlers/command/BaseCommand";
import {Node} from "lavaclient";

declare module "discord.js" {
    interface Client {
        commands: Collection<string, BaseCommand>
        lavalink: Node
    }
}