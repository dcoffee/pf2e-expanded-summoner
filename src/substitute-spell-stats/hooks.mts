import type { PreUpdateItemCallback } from "../types/hooks.js";

import { getSettingFlag } from "../settings.mts";
import { getFlagsItem } from "../flags/getFlagsItem.mts";
import { substituteSpellStats } from "./substituteSpellStats.mts";
import { getExpandedSummonerFlags } from "../flags/getExpandedSummonerFlags.mts";

export const preUpdateItem_SubstituteSpellcastingBonus: PreUpdateItemCallback = async (item) => {
    if (!getSettingFlag("substituteSummonerSpellBonus")) {
      return;
    }

    if (!item.isOfType("spellcastingEntry")
      || item.attribute !== "cha"
      || !item.isSpontaneous
      || item.tradition !== "arcane") {
        return;
    }

    if (item.actor == null) {
      return;
    }

    const sourceFlags = getExpandedSummonerFlags(item.actor);
    if (sourceFlags?.role !== "summoner" || !sourceFlags.linkedActor) {
      return;
    }
    
    const destinationItem = getFlagsItem(sourceFlags.linkedActor);

    if (!destinationItem) {
      return;
    }

    await substituteSpellStats(destinationItem, item);
};