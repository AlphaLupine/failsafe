import {Player} from "lavaclient";
import { QueueTrackStartHandler } from "../handlers/event/lavaclient/Queue/TrackStartHandler"
import {CommandInteraction, TextChannel} from "discord.js";
import {QueueTrackEndHandler} from "../handlers/event/lavaclient/Queue/TrackEndHandler";
import {Filter, nightcore, reverb} from "../lib/Filters";
import {PlayerEffectManager} from "@lavaclient/plugin-effects";
import {logger} from "../index";
import {Source} from "../lib/Sources";
import {Addable} from "@lavaclient/plugin-queue";
import {Embed} from "../extensions/Embed";


export function printName() {
    const titleAscii = [
        "//   _______    ___       __   __          _______.     ___       _______  _______   //",
        "//  |   ____|  /   \\     |  | |  |        /       |    /   \\     |   ____||   ____|  //",
        "//  |  |__    /  ^  \\    |  | |  |       |   (----`   /  ^  \\    |  |__   |  |__     //",
        "//  |   __|  /  /_\\  \\   |  | |  |        \\   \\      /  /_\\  \\   |   __|  |   __|    //",
        "//  |  |    /  _____  \\  |  | |  `----.----)   |    /  _____  \\  |  |     |  |____   //",
        "//  |__|   /__/     \\__\\ |__| |_______|_______/    /__/     \\__\\ |__|     |_______|  //",
        "//                                                                                   //"
    ]

    console.log(titleAscii.join("\n"));
}


export async function initialisePlayer(player: Player, textChannel: TextChannel): Promise<void> {

    logger.info(`[Player]`, `[HelperFunctions/initialisePlayer]`, `initialising player for guild ${player.id}`);

    //Handle Queue Events
    const trackStartHandler = new QueueTrackStartHandler(player.queue);
    trackStartHandler.register();

    const trackEndHandler = new QueueTrackEndHandler(player);
    trackEndHandler.register();

    new PlayerEffectManager(player)

    player.queue._textChannel = textChannel;

    await player.setVolume(20)
}

export function convertMs(ms: number): string {
    let hours: any = Math.floor((ms / (1000 * 60 * 60)) % 24);
    let minutes: any = Math.floor((ms / (1000 * 60)) % 60);
    let seconds: any = Math.floor((ms / 1000 ) % 60);

    hours = (hours < 10) ? "0" + hours : hours
    minutes = (minutes < 10) ? "0" + minutes : minutes
    seconds = (seconds < 10) ? "0" + seconds : seconds

    const concatenatedTime: string = `${hours === '00' ? '' : `${hours}:`}${minutes === '00' ? '00: ' : `${minutes}:`}${seconds}`;
    return concatenatedTime;

}

export function calculatePlaylistDuration(tracks: Addable[]): string {
    let duration = 0

    for (const track of tracks) {
        duration += track.info.length
    }

    return convertMs(duration);
}

export async function handlePause(player: Player): Promise<boolean> {

    logger.info(`[Player]`, `[HelperFunctions/handlePause]`, player.paused ? `unpausing player for guild` : `pausing player for guild` + ` ${player.id}`);

    await player.pause(!player.paused)
    return player.paused;
}

export async function applyFilter(filter: Filter, player: Player): Promise<boolean> {

    let filterApplied

    switch (filter) {
        case "nightcore":
            await player.effects.toggle(nightcore);
            filterApplied = true
        break;
        case "vaporwave":
            await player.setFilters("timescale", {
                pitch: 1.0,
                rate: 0.5,
                speed: 1.0
            })
            await player.setFilters("tremolo", {
                depth: 0.7,
                frequency: 14
            })
            filterApplied = true
        break;
        case "clear":
            await player.effects.clear();
            filterApplied = true
        break
        case "reverb":
            await player.effects.toggle(reverb)
            filterApplied = true
        break;
        default:
            return filterApplied = false

    }

    await player.effects.apply()

    filterApplied ?  logger.info(`[Player/EffectManager]`, `[HelperFunctions/applyFilter]`, `applied filter ${filter} to player in guild ${player.id}`)
        : logger.error(`[Player/EffectManager]`, `[HelperFunctions/applyFilter]`, `ran into an issue when applying ${filter} to player in guild ${player.id}`)

    return filterApplied;


}

export function identifySource(query: string): Source {
    const urlRegex = /^https?:\/\//;
    const spotifyLinkRegex = /^https:\/\/open\.spotify\.com\/.*/;
    const youtubeLinkRegex = /^https?:\/\/(www\.)?youtube\.com\/watch\?v=.+/;

    let source: Source = "unknown"

    if(urlRegex.test(query)) {
        if(spotifyLinkRegex.test(query)) source = ""
        if(youtubeLinkRegex.test(query)) source = ""
    } else {
        source = "ytsearch:"
    }

    return source

}

export function parseTrackInfoToString(track: Addable) {
    return `${track.info.title} - ${track.info.author} - ${convertMs(track.info.length)}`
}

export async function handleLoadType(interaction: CommandInteraction, results: any, next: boolean) {
    let tracks

    switch (results?.loadType) {
        case "track":
            tracks = await loadTrack(interaction, results.data, next);
            break;
        case "playlist":
            const addables: Addable[] = results.data.tracks.map((data: any) => data);
            tracks = await loadPlaylist(interaction, addables, next);
            break;
        case "search":
            const searchResults: Addable[] = results.data.map((data: any) => data)
            tracks = await loadTrack(interaction, searchResults[0], next);
            break;
        case "empty":
            tracks = await noMatches(interaction);
            break;
        case "error":
            tracks = await queueError(interaction);
            break;
        default:
            tracks = await queueError(interaction);

    }

    return tracks
}

async function loadTrack(interaction: CommandInteraction, result: Addable, skipQueue: boolean): Promise<Addable[]> {
    await interaction.editReply({
        embeds: [new Embed().queuingTrack(result, skipQueue)]
    })
    return [result]
}

async function loadPlaylist(interaction: CommandInteraction, results: Addable[], skipQueue: boolean): Promise<Addable[]> {

    if(results.length === 1) {
        return await loadTrack(interaction, results[0], skipQueue)
    }

    await interaction.editReply({
        embeds: [new Embed().queuingPlaylist(results, skipQueue)]
    })

    return results
}

async function noMatches(interaction: CommandInteraction): Promise<Addable[]> {
    await interaction.editReply({
        embeds: [new Embed().noMatches()]
    })
    return []
}

async function queueError(interaction: CommandInteraction): Promise<Addable[]> {
    await interaction.editReply({
        embeds: [new Embed().queueError()]
    })
    return []
}