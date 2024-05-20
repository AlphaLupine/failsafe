import {BaseEventHandler} from "../BaseEventHandler";
import {Failsafe} from "../../../extensions/Failsafe";
import {client, logger} from "../../../index";
import {DebugHandler} from "../lavaclient/DebugHandler";

export class ReadyHandler extends BaseEventHandler {
    public eventName : string = "ready";

    constructor(client: Failsafe) {
        super(client);
    }

    public async execute(): Promise<void> {
       logger.info(`[client]`, `[ReadyHandler]`, `${this.source.user.username} is ready`)

        const debugHandler = new DebugHandler(this.source.lavalink);
        debugHandler.register();

        this.source.lavalink.connect({
            userId: this.source.user.id
        });

        await this.setStatus()


    }

    private async setStatus() {

        this.source.user.setPresence({ activities: [{ type: 1,  name: 'a live feed from Nessus', url: "https://www.youtube.com/watch?v=pc8uzYJYTfg&ab_channel=Promethean%2CArchivalMind" }], status: 'online' });

    }
}