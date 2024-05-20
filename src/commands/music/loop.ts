import {BaseCommand} from "../../handlers/command/BaseCommand";
import {ApplicationCommandDataResolvable, CommandInteraction} from "discord.js";
import {Embed} from "../../extensions/Embed";
import {isMusicCommandSatisfied} from "../../utils/ValidationFunctions";
import {LoopType} from "@lavaclient/plugin-queue";

export default class PlayCommand extends BaseCommand {
    public name = "loop";
    public description = "Loops the current track";

    async execute(interaction: CommandInteraction): Promise<void> {

        await interaction.deferReply()
        /**
        let player = interaction.client.lavalink.players.cache.get(interaction.guild!.id)

        if(! await isMusicCommandSatisfied(interaction, player)) return

        await interaction.editReply({
            embeds: [
                new Embed().loopingTrack(player!.queue.current!)
            ]
        })

        player!.queue.setLoop(LoopType.Song)

            **/
        return;

    }

    makeApplicationCommand(): ApplicationCommandDataResolvable {
        return {
            name: this.name,
            description: this.description,
        }
    }
}
