import {CommandInteraction, underscore} from "discord.js";
import {Player} from "lavaclient";
import {Embed} from "../extensions/Embed";

export async function isMusicCommandSatisfied(interaction: CommandInteraction, player: Player | undefined): Promise<boolean> {
    const voice = interaction.guild?.voiceStates.cache.get(interaction.user.id)?.channel

    //Check if the member is in a voice channel
    if(!voice) {
        await interaction.editReply({embeds: [new Embed().noVoice()]})
        return false
    }

    //Allow command to be run if there is no player and member is invoking the play command
    if(!player && interaction.commandName == "play") return true

    //Dont allow command to be run if there is no player and the member is not invoking the play command
    if(!player && interaction.commandName != "play") {
        await interaction.editReply({embeds: [new Embed().noPlayer()]})
        return false
    }

    //Check that the member is in the same voice channel as the player
    if(voice.id != player?.voice.channelId) {
        await interaction.editReply({embeds: [new Embed().notSameVoice()]})
        return false
    }


    /**

    //Check the member is using music commands in the same text channel that the player is bound to
    if(interaction.channel?.id != player?.queue.channel?.id) {
        await interaction.editReply({embeds: [new Embed().boundMismatch(player!.channels.textChannel!)]})
        return false
    }

    //Check if the queue is empty before running the command
    if(!player!.queue.current && interaction.commandName != "play") {
        await interaction.editReply({embeds: [new BlindEmbed().noQueueForCommand()]})
        return false
    }

    **/

    return true
}

export function isValidVolume(volume: number): boolean {
    return (volume >= 1 && volume <= 100)
}