import {Client} from "discord.js";
import {BaseEventHandler} from "../../BaseEventHandler";
import {Failsafe} from "../../../../extensions/Failsafe";
import {NodeEvents, Player} from "lavaclient";
import {Addable, Queue} from "@lavaclient/plugin-queue";
import {Embed} from "../../../../extensions/Embed";
import {client, logger} from "../../../../index";

export class QueueTrackEndHandler extends BaseEventHandler {
    public eventName : string = "trackEnd";
    public player: Player

    constructor(player: Player) {
        super(player.queue);

        this.player = player;
    }

    public async execute(): Promise<void> {

        logger.info(`[Player/Queue]`, `[TrackEndHandler]`, `track ended in guild ${this.source.player.id}`)

        if(this.source.tracks.length === 0) {
            await this.source._textChannel.send({embeds: [
                    new Embed().queueEnd()
                ]
            })

            logger.info(`[Player/Queue]`, `[TrackEndHandler]`, `end of queue reached for guild ${this.source.player.id}. destroying player`)

            this.player.voice.disconnect()
            await client.lavalink.players.destroy(this.player.id)

            return
        }
        return
    }
}