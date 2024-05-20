import { BaseCommand } from "../../handlers/command/BaseCommand";
import {ApplicationCommandDataResolvable, CommandInteraction, GuildMember, TextChannel} from "discord.js";
import {Embed} from "../../extensions/Embed";
import { client } from "../../index";
import {convertMs, initialisePlayer} from "../../utils/HelperFunctions";
import {isMusicCommandSatisfied} from "../../utils/ValidationFunctions";
import {Addable} from "@lavaclient/plugin-queue";
import {QueuePaginator} from "../../utils/paginators/QueuePaginator";

export default class QueueCommand extends BaseCommand {
    public name = "queue";
    public description = "Returns a list of the current queue";

    async execute(interaction: CommandInteraction): Promise<void> {

        await interaction.deferReply()

        let player = interaction.client.lavalink.players.cache.get(interaction.guild!.id)

        if(! await isMusicCommandSatisfied(interaction, player)) return

        let formattedQueue = []
        const currentTrack = player!.queue.current!;
        formattedQueue.push(`\`\`\`CURRENT: ${currentTrack.info.title} - ${convertMs(currentTrack.info.length)}\`\`\``)
        let queue = player!.queue.tracks.map((track, i) => {
            formattedQueue.push(`\`\`\`${++i} - ${track.info.title} - ${convertMs(track.info.length)}\`\`\``)
        })

        const paginator = new QueuePaginator({interaction}, formattedQueue, 10);

        await paginator.run()

        return;

    }

    makeApplicationCommand(): ApplicationCommandDataResolvable {
        return {
            name: this.name,
            description: this.description,
        }
    }
}
