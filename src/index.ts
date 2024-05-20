import {MessageHandler} from "./handlers/event/discord/MessageHandler";
import {ReadyHandler} from "./handlers/event/discord/ReadyHandler"
import {Failsafe} from "./extensions/Failsafe";
import {InteractionHandler} from "./handlers/event/discord/InteractionHandler";
import {VoiceServerHandler} from "./handlers/event/discord/VoiceServerHandler";
import {VoiceStateHandler} from "./handlers/event/discord/VoiceStateHandler";
import {Logger, LogLevel} from "@dimensional-fun/logger";
import "@lavaclient/plugin-queue/register";
import "@lavaclient/plugin-effects/register";
import {printName} from "./utils/HelperFunctions";

require("dotenv").config();

printName()

export const logger = new Logger("main", {
    levels: [LogLevel.INFO, LogLevel.ERROR]
})
export const root = __dirname;

export const client = new Failsafe();

const messageHandler = new MessageHandler(client);
messageHandler.register();

const readyHandler = new ReadyHandler(client);
readyHandler.register();

const interactionHandler = new InteractionHandler(client);
interactionHandler.register();

const voiceServerHandler = new VoiceServerHandler(client);
voiceServerHandler.register();

const voiceStateHandler = new VoiceStateHandler(client);
voiceStateHandler.register();

process.on("uncaughtException", (reason: Error, reasonCode: Error) => {
    logger.error(`[${reasonCode}]`, `[UncaughtException]`, reason);
})

if(!process.env.TOKEN) throw `[Client] [MissingCredentials] TOKEN has not been defined in the .env file!`

client.start(process.env.TOKEN);