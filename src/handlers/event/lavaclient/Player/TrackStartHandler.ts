import {Client} from "discord.js";
import {BaseEventHandler} from "../../BaseEventHandler";
import {Failsafe} from "../../../../extensions/Failsafe";
import {NodeEvents, Player} from "lavaclient";

export class TrackStartHandler extends BaseEventHandler {
    public eventName : string = "trackStart";

    constructor(player: Player) {
        super(player);
    }

    public async execute(event: any): Promise<void> {

    }
}