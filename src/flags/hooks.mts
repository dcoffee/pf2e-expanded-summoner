import type { PreCreateItemCallback } from "../types/hooks.js";

import { FLAGS_ITEM_UUID } from "./constants.mts";

export const preCreateItem_flagsItem: PreCreateItemCallback = async (item) => {
    if (item.sourceId === FLAGS_ITEM_UUID) {
        item.updateSource({
            "flags.pf2eExpandedSummoner": {
                hpPool: 0,
                linkUuid: "",
                summonerSpellProficiency: 0,
                summonerSpellAttribute: 0,
            }
        });
    }
};
