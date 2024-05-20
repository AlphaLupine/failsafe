import { BaseCommand } from "../../handlers/command/BaseCommand";
import {ApplicationCommandDataResolvable, CommandInteraction} from "discord.js";
import {Embed} from "../../extensions/Embed";

export default class PingCommand extends BaseCommand {
    public name = "ping";
    public description = "Pong!";

    async execute(interaction: CommandInteraction): Promise<void> {
        await interaction.reply({
            embeds: [
                new Embed().ping(interaction.client.ws.ping)
            ]
        })
    }

    makeApplicationCommand(): ApplicationCommandDataResolvable {
        return {
            name: this.name,
            description: this.description
        }
    }
}