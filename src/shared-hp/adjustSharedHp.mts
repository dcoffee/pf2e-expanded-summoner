import type { ActorSourcePF2e } from "@actor/data/index.js";
import type { ActorPF2e } from "@actor/index.js";
import type { ExpandedSummonerFlags } from "../types/expandedSummonerFlags.js";
import { FLAGS_ITEM_UUID } from "../flags-item/constants.mts";

const adjustSharedHp = async (
    sourceHpData: Required<ActorSourcePF2e["system"]["attributes"]>["hp"],
    flags: ExpandedSummonerFlags,
    destination: ActorPF2e,
    maxHp: Maybe<number>) => {
    if (flags.role === "summoner" && maxHp) {
        const flagsItem = destination.items.find((item) => item.sourceId === FLAGS_ITEM_UUID);
        
        await flagsItem?.update({
            "flags.pf2eExpandedSummoner.hpPool": maxHp,
            }, { noHook: true });
    }

    const destinationHp = {
        ...destination.system.attributes.hp,
        value: sourceHpData.value,
        temp: {temp: 0, ...sourceHpData}.temp
    };

    await destination.update({
        "system.attributes.hp": destinationHp,
    }, { "noHook": true });
};

export {
    adjustSharedHp,
};
