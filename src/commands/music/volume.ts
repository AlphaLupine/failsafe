import { BaseCommand } from "../../handlers/command/BaseCommand";
import {ApplicationCommandDataResolvable, CommandInteraction, GuildMember, TextChannel} from "discord.js";
import {Embed} from "../../extensions/Embed";
import {initialisePlayer} from "../../utils/HelperFunctions";
import {isMusicCommandSatisfied, isValidVolume} from "../../utils/ValidationFunctions";
import {Addable} from "@lavaclient/plugin-queue";

export default class VolumeCommand extends BaseCommand {
    public name = "volume";
    public description = "Sets the volume of the player in this server";

    async execute(interaction: CommandInteraction): Promise<void> {

        await interaction.deferReply()

        const volume = interaction.options.get("volume")!.value as number;
        let player = interaction.client.lavalink.players.cache.get(interaction.guild!.id)

        if(! await isMusicCommandSatisfied(interaction, player)) return

        if(isValidVolume(volume)) {

            await player!.setVolume(volume)

            await interaction.editReply({
                embeds: [
                    new Embed().setVolumeOfPlayer(volume)
                ]
            })
            return;
        } else {

            await interaction.editReply({
                embeds: [
                    new Embed().invalidVolume(volume)
                ]
            })
        }

    }

    makeApplicationCommand(): ApplicationCommandDataResolvable {
        return {
            name: this.name,
            description: this.description,
            options: [
                {
                    name: "volume",
                    description: "The volume of the player in this server",
                    type: 10,
                    required: true,
                }
            ]
        }
    }
}
