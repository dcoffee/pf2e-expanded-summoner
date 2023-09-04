import type { ActorPF2e } from "@module/documents.js";

import { getFlagsItem } from "../flags/getFlagsItem.mts";
import { setHpPool } from "../shared-hp/setHpPool.mts";
import { substituteSpellStats } from "../substitute-spell-stats/substituteSpellStats.mts";

export async function linkActors(summoner: ActorPF2e, eidolon: ActorPF2e) {
    console.log("assigning link UUID", summoner, eidolon);
    const summonerFlagsItem = getFlagsItem(summoner);
    const eidolonFlagsItem = getFlagsItem(eidolon);

    if (!summonerFlagsItem || !eidolonFlagsItem) {
        throw new Error(`Missing flags item for: ${summonerFlagsItem} ${eidolonFlagsItem}`);
    }
    
    await summonerFlagsItem.update({
        "flags.pf2eExpandedSummoner.linkUuid": eidolon._id,
    }
    , { noHook: true });
    await eidolonFlagsItem.update({
        "flags.pf2eExpandedSummoner.linkUuid": summoner._id,
    }
    , { noHook: true });

    if (summoner.attributes.hp?.max) {
        await setHpPool(eidolon, summoner.attributes.hp.max);
    }

    const spellcastingEntry = summoner.itemTypes.spellcastingEntry.find((entry) =>
        entry.attribute === "cha"
        && entry.isSpontaneous
        && entry.tradition === "arcane");
    
    if (spellcastingEntry) {
        await substituteSpellStats(eidolonFlagsItem, spellcastingEntry);
    }

    summoner.reset();
    eidolon.reset();
}