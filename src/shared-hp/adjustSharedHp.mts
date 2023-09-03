import type { ActorSourcePF2e } from "@actor/data/index.js";
import type { ActorPF2e } from "@actor/index.js";
import type { ExpandedSummonerFlags } from "../types/expandedSummonerFlags.js";

import { getFlagsItem } from "../flags/getFlagsItem.mts";

const adjustSharedHp = async (
    sourceHpData: Partial<ActorSourcePF2e["system"]["attributes"]["hp"]>,
    flags: ExpandedSummonerFlags,
    destination: ActorPF2e,
    maxHp: Maybe<number>) => {
    if (flags.role === "summoner" && maxHp) {
        const destinationFlags = getFlagsItem(destination);
        
        await destinationFlags?.update({
            "flags.pf2eExpandedSummoner.hpPool": maxHp,
            }, { noHook: true });
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
