import {PlayerEffect} from "@lavaclient/plugin-effects";

export type Filter =
    "nightcore"
    | "vaporwave"
    | "clear"
    | "reverb"

export const nightcore: PlayerEffect = {
    id: "nightcore",
    filters: {
        timescale: {
            rate: 1.125,
            speed: 1.0,
            pitch: 1.0,
        }
    }

}

export const reverb: PlayerEffect = {
    id: "reverb",
    filters: {
        pluginFilters: {
            ["echo"]: {
                echoLength: 0.3,
                decay: 0.5
            }
        }
    }

}