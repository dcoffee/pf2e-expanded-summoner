import type { ActorSourcePF2e } from "@actor/data/index.js";
import type { ExpandedSummonerFlags } from "../types/expandedSummonerFlags.js";

import { setHpPool } from "./setHpPool.mts";

const adjustSharedHp = async (
    sourceHpData: Partial<ActorSourcePF2e["system"]["attributes"]["hp"]>,
    flags: ExpandedSummonerFlags,
    maxHp: Maybe<number>) => {
    const destination = flags.linkedActor;

    if (!destination) {
        return;
    }
    
    if (flags.role === "summoner" && maxHp) {
        setHpPool(destination, maxHp);
    }

    const destinationHp = {
        ...destination.system.attributes.hp,
        ...{value: sourceHpData?.value},
        ...{temp: {temp: undefined, ...sourceHpData}.temp},
    };

    await destination.update({
        "system.attributes.hp": destinationHp,
    }, { "noHook": true });
};

export {
    adjustSharedHp,
};
