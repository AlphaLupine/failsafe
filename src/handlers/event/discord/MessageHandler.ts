import {Message, Client} from "discord.js";
import {BaseEventHandler} from "../BaseEventHandler";
import {Failsafe} from "../../../extensions/Failsafe";

export class MessageHandler extends BaseEventHandler {
    public eventName : string = "messageCreate";

    constructor(client: Failsafe) {
        super(client);
    }

    public async execute(message: Message): Promise<void> {
        //console.log("Message Received!");
    }
}