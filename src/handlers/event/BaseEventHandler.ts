import { GatewayDispatchEvents } from "discord.js";
import {logger} from "../../index";

export abstract class BaseEventHandler {
    public source
    constructor(protected emitter: any) {
        this.source = emitter
    }

    abstract eventName: string;
    abstract execute(...args: any[]): Promise<void>;

    public register(): void {

        logger.info(`[BaseEventHandler] registering event ${this.eventName} for emitter ${this.source.constructor.name}`);

        this.eventName == "ready" ? this.emitter.once(this.eventName, (args: any[]) =>  this.execute(args))
            : this.eventName == GatewayDispatchEvents.VoiceStateUpdate || this.eventName == GatewayDispatchEvents.VoiceServerUpdate ? this.emitter.ws.on(this.eventName, (args: any[]) =>  this.execute(args))
            : this.emitter.on(this.eventName, (args: any[]) =>  this.execute(args));


    }
}