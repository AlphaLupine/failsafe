import {ColorResolvable, EmbedBuilder} from "discord.js";
import { client } from "../index"
import {Addable} from "@lavaclient/plugin-queue";
import {calculatePlaylistDuration, convertMs} from "../utils/HelperFunctions";
import {Filter} from "../lib/Filters";

export const embedColours = {
    main: "#0fa4ab" as ColorResolvable,
    warning: "#e49c47" as ColorResolvable,
    error: "#f44336" as ColorResolvable,
}

export class Embed extends EmbedBuilder {
    constructor(data = {}) {
        super(data)
        this.setAuthor({name: client.user!.username, iconURL: client.user!.avatarURL()!})
        this.setColor(embedColours.main)
    }

    ping(ping: number) {
        return this.setTitle("Pong!")
            .setDescription(`My ping is currently: \`\`${ping}\`\`ms`)
    }

    noVoice() {
        return this.setTitle("No Voice!")
            .setDescription(`You need to join a voice channel first`)
            .setColor(embedColours.warning)
    }

    noPlayer() {
        return this.setColor(embedColours.warning)
            .setTitle("No Player!")
            .setDescription("There is no player for this command to be used on, perhaps you meant ``/play`` instead")
    }

    notSameVoice() {
        return this.setColor(embedColours.warning)
            .setTitle("You Aren't In Here!")
            .setDescription("You must be in the same voice channel as me to use this command")
    }

    queuingTrack(track: Addable, skipQueue: boolean) {
        return this.setColor(embedColours.main)
            .setDescription(`Added **${track.info.title}** to the queue`)
            .setFooter({text: `${skipQueue ? "Track was bumped to the top of the queue" : " "}`})
    }

    queuingPlaylist(tracks: Addable[], skipQueue: boolean) {
        return this.setColor(embedColours.main)
            .setDescription(`Adding \`\`${tracks.length}\`\` tracks to the queue.\n\nTotal playlist duration: \`\`${calculatePlaylistDuration(tracks)}\`\``)
            .setFooter({text: `${skipQueue ? "Track's were bumped to the top of the queue" : " "}`})
    }

    noMatches() {
        return this.setColor(embedColours.warning)
            .setDescription(`I was unable to find results with this query`)
    }

    queueError() {
        return this.setColor(embedColours.error)
            .setDescription(`I ran into an issue playing this track`)
    }

    playingTrack(track: Addable) {
        return this.setColor(embedColours.main)
            .setDescription(`Now playing **${track.info.title}**`)
            .setThumbnail(track.info.artworkUrl ?? "")
            .setFooter({text: `Track Duration: ${convertMs(track.info.length)}`})
    }

    queueEnd() {
        return this.setColor(embedColours.warning)
            .setTitle("End of Queue")
            .setDescription("No more songs to play, leaving your voice channel")
    }

    skipTrack(track: Addable) {
        return this.setColor(embedColours.main)
            .setTitle("Skipping Track...")
            .setDescription(`**${track.info.title}** was skipped`)
    }

    destroyPlayer() {
        return this.setColor(embedColours.warning)
            .setTitle("Destroying Player")
            .setDescription(`Destroy command received. Leaving VC`)
    }

    setVolumeOfPlayer(volume: number) {
        return this.setColor(embedColours.main)
            .setTitle("Dialing In The Volume")
            .setDescription(`Volume has been set to \`\`${volume}\`\`%`)
    }

    invalidVolume(volume: number) {
        return this.setColor(embedColours.warning)
            .setTitle("What is the point?")
            .setDescription(`You must have super hearing or want to blow up your ear drums... \`\`${volume}\`\`% is not a valid volume. Try a value between 1 and 100`)
    }

    handlePause(isPaused: boolean) {
        return this.setColor(isPaused ? embedColours.warning : embedColours.main)
            .setTitle(isPaused ? "Player Paused" : "Player Resumed")
            .setDescription(isPaused ? "Pausing the current track" : "Resuming the current track")
    }

    applyFilter(filter: Filter) {
        return this.setColor(embedColours.main)
            .setTitle("Remixing...")
            .setDescription(`I have applied a \`\`${filter}\`\` effect to the player`)
            .setFooter({text: `Changes will take a few seconds to apply`})
    }

    filterNotFound(filter: Filter) {
        return this.setColor(embedColours.warning)
            .setTitle("Filter not found")
            .setDescription(`I was unable to find the parameters for this effect \`\`(${filter})\`\`. Please contact the developer`)
    }

    clearedFilters() {
        return this.setColor(embedColours.main)
            .setTitle("Remixing...")
            .setDescription(`I have removed all effects from the player`)
            .setFooter({text: `Changes will take a few seconds to apply`})
    }

    unsupportedSource() {
        return this.setColor(embedColours.main)
            .setTitle("Unable To Identify Source")
            .setDescription(`I do not support the source of this url`)
    }

    shuffleQueue() {
        return this.setColor(embedColours.main)
            .setTitle("Shaking Things Up")
            .setDescription(`I have shuffled the queue`)
    }

    queuePage(content: string[], page: number, maxPages: number) {
        return this.setColor(embedColours.main)
            .setTitle("Current Queue")
            .setDescription(content.join(""))
            .setFooter({text: `Page ${page}/${maxPages} | Try /shuffle to shuffle the queue`})
    }

}