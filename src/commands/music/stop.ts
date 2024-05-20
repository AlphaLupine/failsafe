import { BaseCommand } from "../../handlers/command/BaseCommand";
import {ApplicationCommandDataResolvable, CommandInteraction, GuildMember, TextChannel} from "discord.js";
import {Embed} from "../../extensions/Embed";
import {initialisePlayer} from "../../utils/HelperFunctions";
import {isMusicCommandSatisfied} from "../../utils/ValidationFunctions";
import {Addable} from "@lavaclient/plugin-queue";

export default class StopCommand extends BaseCommand {
    public name = "stop";
    public description = "Destroys the player in this server";

    async execute(interaction: CommandInteraction): Promise<void> {

        await interaction.deferReply()

        let player = interaction.client.lavalink.players.cache.get(interaction.guild!.id)

        if(! await isMusicCommandSatisfied(interaction, player)) return

        player!.voice.disconnect()
        await interaction.client.lavalink.players.destroy(interaction.guild!.id)

        await interaction.editReply({
            embeds: [
                new Embed().destroyPlayer()
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
