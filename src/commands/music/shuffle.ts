import { BaseCommand } from "../../handlers/command/BaseCommand";
import {ApplicationCommandDataResolvable, CommandInteraction, GuildMember, TextChannel} from "discord.js";
import {Embed} from "../../extensions/Embed";
import { client } from "../../index";
import {initialisePlayer} from "../../utils/HelperFunctions";
import {isMusicCommandSatisfied} from "../../utils/ValidationFunctions";
import {Addable} from "@lavaclient/plugin-queue";

export default class ShuffleCommand extends BaseCommand {
    public name = "shuffle";
    public description = "Shuffle's the queue in this server";

    async execute(interaction: CommandInteraction): Promise<void> {

        await interaction.deferReply()

        let player = interaction.client.lavalink.players.cache.get(interaction.guild!.id)

        if(! await isMusicCommandSatisfied(interaction, player)) return

        await interaction.editReply({
            embeds: [
                new Embed().shuffleQueue()
            ]
        })

        player!.queue.shuffle()


        return;

    }

    makeApplicationCommand(): ApplicationCommandDataResolvable {
        return {
            name: this.name,
            description: this.description,
        }
    }
}
