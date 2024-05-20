import { BaseCommand } from "../../handlers/command/BaseCommand";
import {ApplicationCommandDataResolvable, CommandInteraction} from "discord.js";
import {Embed} from "../../extensions/Embed";
import { client } from "../../index";
import {handlePause} from "../../utils/HelperFunctions";
import {isMusicCommandSatisfied} from "../../utils/ValidationFunctions";

export default class PauseCommand extends BaseCommand {
    public name = "toggle_pause";
    public description = "Toggles the pause status for the player in this server";

    async execute(interaction: CommandInteraction): Promise<void> {

        await interaction.deferReply()

        let player = interaction.client.lavalink.players.cache.get(interaction.guild!.id)

        if(! await isMusicCommandSatisfied(interaction, player)) return

        const status = await handlePause(player!)

        await interaction.editReply({
            embeds: [
                new Embed().handlePause(status)
            ]
        })
        return;

    }

    makeApplicationCommand(): ApplicationCommandDataResolvable {
        return {
            name: this.name,
            description: this.description,
        }
    }
}
