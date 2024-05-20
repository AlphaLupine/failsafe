import { BaseCommand } from "../../handlers/command/BaseCommand";
import {ApplicationCommandDataResolvable, CommandInteraction, GuildMember, TextChannel} from "discord.js";
import {Embed} from "../../extensions/Embed";
import { client } from "../../index";
import {handleLoadType, identifySource, initialisePlayer} from "../../utils/HelperFunctions";
import {isMusicCommandSatisfied} from "../../utils/ValidationFunctions";
import {Addable} from "@lavaclient/plugin-queue";

export default class PlayCommand extends BaseCommand {
    public name = "play";
    public description = "Plays the given URL or search query";

    async execute(interaction: CommandInteraction): Promise<void> {

        await interaction.deferReply()

        const member = interaction.member as GuildMember;
        const query = interaction.options.get("query")!.value as string;
        let next = interaction.options.get("skip_queue")?.value as boolean;
        let player = interaction.client.lavalink.players.cache.get(interaction.guild!.id)

        if(! await isMusicCommandSatisfied(interaction, player)) return

        if(!player) {
            player = client.lavalink.players.create(interaction.guild!.id);

            //Initialise Handlers for this player
            await initialisePlayer(player, interaction.channel as TextChannel)
        }

        try {
            player.voice.connect(member.voice.channel!.id, {
                deafened: true
            })
        } catch (err) {
            console.log(err);
        }

        const source = identifySource(query);
        if(source == "unknown") {
            await interaction.editReply({
                embeds: [new Embed().unsupportedSource()]
            })

            return
        }


        const results= await interaction.client.lavalink.api.loadTracks(`${source}${query}`);


        const tracks = await handleLoadType(interaction, results, next);

        if(!next) next = false

        player.queue.add(tracks, {next})

        if(!player.playing) {
            await player.queue.start()
        }
    }

    makeApplicationCommand(): ApplicationCommandDataResolvable {
        return {
            name: this.name,
            description: this.description,
            options: [
                {
                    name: "query",
                    type: 3,
                    description: "The url or search query",
                    required: true
                },
                {
                    name: "skip_queue",
                    type: 5,
                    description: "Weather this request should be bumped to the top of the queue",
                    required: false
                }
            ]
        }
    }
}

