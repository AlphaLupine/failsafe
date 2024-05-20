import { Player } from "lavaclient";
import {Message, TextChannel} from "discord.js";
import {Queue} from "@lavaclient/plugin-queue";

//Add a new property that tells the player if it should autoplay or not. A new function will be added to the players queue that loads a song similar to the one that was last played.

Object.defineProperty(Player.prototype, "doAutoplay", {
    get: function(this: Player) {
        return this._doAutoplay;
    },
    set: function(this: Player, enabled:boolean ) {
        this._doAutoplay = enabled
    },
})


declare module "lavaclient" {
    interface Player {
        _doAutoplay: boolean
    }
}