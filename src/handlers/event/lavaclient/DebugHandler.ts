import {Client} from "discord.js";
import {BaseEventHandler} from "../BaseEventHandler";
import {Failsafe} from "../../../extensions/Failsafe";
import {NodeEvents} from "lavaclient";
import {logger} from "../../../index";

export class DebugHandler extends BaseEventHandler {
    public eventName : string = "debug";

    constructor(node: Node) {
        super(node);
    }

    public async execute(event: any): Promise<void> {

        logger.debug(
            `[${this.source.options.ws.clientName}]`,
            `[${event.system}${"subsystem" in event ? `:${event.subsystem}` : ""}] ${event.message}`,
        );
    }
}