import { BaseCommand } from "../../handlers/command/BaseCommand";
import {ApplicationCommandDataResolvable, CommandInteraction} from "discord.js";
import {Embed} from "../../extensions/Embed";
import { client } from "../../index";
import {applyFilter, handlePause} from "../../utils/HelperFunctions";
import {isMusicCommandSatisfied} from "../../utils/ValidationFunctions";
import {Filter} from "../../lib/Filters";

export default class FilterCommand extends BaseCommand {
    public name = "filter";
    public description = "Applies an audio effect to the player in this server";

    async execute(interaction: CommandInteraction): Promise<void> {

        await interaction.deferReply()
        const filter = interaction.options.data[0].name as Filter

        let player = interaction.client.lavalink.players.cache.get(interaction.guild!.id)

        if(! await isMusicCommandSatisfied(interaction, player)) return

        const isApplied =  await applyFilter(filter, player!)

        if(isApplied) {
            await interaction.editReply({
                embeds: [
                    filter == "clear" ? new Embed().clearedFilters() : new Embed().applyFilter(filter)
                ]
            })
        } else {
            await interaction.editReply({
                embeds: [
                    new Embed().filterNotFound(filter)
                ]
            })
        }


        return;

    }

    makeApplicationCommand(): ApplicationCommandDataResolvable {
        return {
            name: this.name,
            description: this.description,
            options: [
                {
                    name: "nightcore",
                    description: "Increases pitch and speed of the player",
                    type: 1
                },
                {
                    name: "vaporwave",
                    description: "Slows the player making things a bit more mellow",
                    type: 1
                },
                {
                    name: "clear",
                    description: "Removes all filters from the queue",
                    type: 1
                },
                {
                    name: "reverb",
                    description: "Applies a reverb effect to the player",
                    type: 1
                }
            ]
        }
    }
}
