import {Client, Message} from "discord.js";
import {BaseEventHandler} from "../../BaseEventHandler";
import {Addable, Queue} from "@lavaclient/plugin-queue";
import {Embed} from "../../../../extensions/Embed";
import {logger} from "../../../../index";

export class QueueTrackStartHandler extends BaseEventHandler {
    public eventName : string = "trackStart";

    constructor(queue: Queue) {
        super(queue);
    }

    public async execute(track: Addable): Promise<void> {

        logger.info(`[Player/Queue]`, `[TrackStartHandler]`, `starting track ${track.info.uri} in guild ${this.source.player.id}`)
        const embed = new Embed().playingTrack(track)

        if(!this.source._trackMessage) {
            let msg = await this.source._textChannel.send({embeds: [embed]})
            this.source._trackMessage = msg
            return
        }


        if(this.source._trackMessage.id == this.source._textChannel.lastMessageId) {
            await this.source._trackMessage.edit({embeds: [embed]})
        } else {
            let msg = await this.source._textChannel.send({embeds: [embed]})
            this.source._trackMessage = msg
        }

        return
    }
}