import {Client} from "discord.js";
import {BaseEventHandler} from "../BaseEventHandler";
import {VoiceServerUpdate} from "lavaclient";
import {Failsafe} from "../../../extensions/Failsafe";
import { GatewayDispatchEvents } from "discord.js";
import {logger} from "../../../index";

export class VoiceServerHandler extends BaseEventHandler {
    public eventName : string = GatewayDispatchEvents.VoiceServerUpdate;

    constructor(client: Failsafe) {
        super(client);
    }

    public async execute(data: VoiceServerUpdate): Promise<void> {
        logger.debug(`[client]`, `[VoiceServerHandler]`, `handling voice server update`);
        this.source.lavalink?.players.handleVoiceUpdate(data);
    }
}