import { ActorPF2e } from "@actor/base.js";
import { FLAGS_ITEM_UUID } from "./constants.mts";
import { ItemPF2e } from "@item/base.js";
import { ExpandedSummonerFlags } from "../types/expandedSummonerFlags.js";
import { MODULE_NAME } from "../constants.mts";

export function getFlagsItem(
    actor: ActorPF2e,
): Maybe<ItemPF2e> {
    return actor.items.find((item) => item.sourceId === FLAGS_ITEM_UUID);
};

export function getExpandedSummonerFlags(
    item: ItemPF2e,
): Maybe<ExpandedSummonerFlags> {
    return {
        hpPool: item.getFlag(MODULE_NAME, "hpPool") as number ?? 0,
        linkUuid: item.getFlag(MODULE_NAME, "linkUuid") as string ?? "",
        role: item.flags.pf2e.rulesSelections.role as "eidolon" | "summoner" ?? "summoner",
        slug: item.slug ?? "",
    };
}