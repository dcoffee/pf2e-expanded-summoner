import type { PreUpdateItemCallback } from "../types/hooks.js";

import { getSettingFlag } from "../settings.mts";
import { getLinkedActor } from "../link-actors/getLinkedActors.mts";
import { getFlagsItem } from "../flags/getFlagsItem.mts";

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

    const { linkedActor, sourceFlags } = await getLinkedActor(item.actor);
    if (!linkedActor || sourceFlags?.role !== "summoner") {
      return;
    }
    
    const destinationItem = getFlagsItem(linkedActor);

    if (!destinationItem) {
      return;
    }

    await destinationItem.update({
      "flags.pf2eExpandedSummoner.summonerSpellAttribute": item.statistic.attributeModifier?.value,
      "flags.pf2eExpandedSummoner.summonerSpellProficiency": item.statistic.modifiers.find((mod) => mod.type === "proficiency")?.value,
    }, { noHook: true });
};