import {Interaction, Client} from "discord.js";
import {BaseEventHandler} from "../BaseEventHandler";
import {Failsafe} from "../../../extensions/Failsafe";
import {logger} from "../../../index";

export class InteractionHandler extends BaseEventHandler {
    public eventName : string = "interactionCreate";

    constructor(client: Failsafe ) {
        super(client);
    }

    public async execute(interaction: Interaction): Promise<void> {
        logger.info(`[client]`, `[InteractionHandler]`, `handling interaction from guild ${interaction.guild?.id}`);
        if(!interaction.isCommand()) return;

        const commandName = interaction.commandName;
        const command = this.source.commands.get(commandName);

        if(!command) return;

        try {
            await command.execute(interaction);
        } catch (error) {
            console.log(error);
            await interaction.reply("I encountered an error!")
        }
    }
}