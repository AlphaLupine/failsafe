import { Player } from "lavaclient";
import {Message, TextChannel} from "discord.js";
import {Addable, Queue} from "@lavaclient/plugin-queue";
import { Node } from "lavaclient";
import {handleLoadType} from "../utils/HelperFunctions";
import {logger} from "../index";

//Add the current TextChannel to the player so we can continue to send messages in this channel when events are emitted

Object.defineProperty(Queue.prototype, "textChannel", {
    get: function(this: Queue) {
        return this._textChannel;
    },
    set: function(this: Queue, channel: TextChannel) {
        this._textChannel = channel;
    },
})

//Add the TrackStart message to the queue so we can edit it if no other messages have been sent

Object.defineProperty(Queue.prototype, "trackMessage", {
    get: function(this: Queue) {
        return this._trackMessage;
    },
    set: function(this: Queue, message: Message) {
        this._trackMessage = message;
    },
})


async function autoplayTrack(queryTrack: Addable, Node: Node) {

}


//Used for autoplay
async function getTrackRecommendation(track: Addable, Node: Node) {
    const results= await Node.api.loadTracks(
        `https://music.youtube.com/watch?v=${track.info.identifier}&list=RD${track.info.identifier}`
    );

    let selectedTrack;

    switch(results.loadType) {
        case "playlist":
            const addables: Addable[] = results.data.tracks.map((data: any) => data);
            const index = Math.floor(Math.random() * 10 + 1);
            selectedTrack = addables[index]
            break;
        default:
            logger.error(`[Lavaclient/Queue]`, `[Autoplay]`, `Ran into an unknown issue loading track`)
            return
    }

    return [selectedTrack]

}

declare module "@lavaclient/plugin-queue" {
    interface Queue {
        _textChannel?: TextChannel;
        _trackMessage?: Message;
        _autoPlay: (queryTrack: Addable) => Promise<void>;
    }
}