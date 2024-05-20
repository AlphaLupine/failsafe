import {Client} from "discord.js";
import {BaseEventHandler} from "../BaseEventHandler";
import {VoiceStateUpdate} from "lavaclient";
import {Failsafe} from "../../../extensions/Failsafe";
import { GatewayDispatchEvents } from "discord.js";
import {logger} from "../../../index";

export class VoiceStateHandler extends BaseEventHandler {
    public eventName : string = GatewayDispatchEvents.VoiceStateUpdate;

    constructor(client: Failsafe) {
        super(client);
    }

    public async execute(data: any): Promise<void> {
        logger.debug(`[client]`, `[VoiceStateHandler]`, `handling voice state update`);
        this.source.lavalink?.players.handleVoiceUpdate(data);
    }
}