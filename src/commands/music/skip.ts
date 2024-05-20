import { BaseCommand } from "../../handlers/command/BaseCommand";
import {ApplicationCommandDataResolvable, CommandInteraction, GuildMember, TextChannel} from "discord.js";
import {Embed} from "../../extensions/Embed";
import { client } from "../../index";
import {initialisePlayer} from "../../utils/HelperFunctions";
import {isMusicCommandSatisfied} from "../../utils/ValidationFunctions";
import {Addable} from "@lavaclient/plugin-queue";

export default class PlayCommand extends BaseCommand {
    public name = "skip";
    public description = "Skips the current track";

    async execute(interaction: CommandInteraction): Promise<void> {

        await interaction.deferReply()

        let player = interaction.client.lavalink.players.cache.get(interaction.guild!.id)

        if(! await isMusicCommandSatisfied(interaction, player)) return

        await interaction.editReply({
            embeds: [
                new Embed().skipTrack(player!.queue.current!)
            ]
        })

        await player!.queue.skip()
        await player!.queue.start()

        return;

    }

    makeApplicationCommand(): ApplicationCommandDataResolvable {
        return {
            name: this.name,
            description: this.description,
        }
    }
}
