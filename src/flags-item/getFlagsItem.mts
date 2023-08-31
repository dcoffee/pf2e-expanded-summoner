import { ActorPF2e } from "@actor/base.js";
import { FLAGS_ITEM_UUID, FLAGS_PATH } from "./constants.mts";
import { ItemPF2e } from "@item/base.js";
import { ExpandedSummonerFlags } from "../types/expandedSummonerFlags.js";

export function getFlagsItem(
    actor: ActorPF2e,
): Maybe<ItemPF2e> {
    return actor.items.find((item) => item.sourceId === FLAGS_ITEM_UUID);
};

export function getExpandedSummonerFlags(
    item: ItemPF2e,
): Maybe<ExpandedSummonerFlags> {
    return {
        hpPool: getProperty(item, `${FLAGS_PATH}.hpPool`) as number ?? 0,
        linkUuid: getProperty(item, `${FLAGS_PATH}.linkUuid`) as string ?? "",
        role: item.flags.pf2e.rulesSelections.role as "eidolon" | "summoner" ?? "summoner",
        slug: item.slug ?? "",
    };
}

export function getFlagsFromActor(actor: ActorPF2e): Maybe<ExpandedSummonerFlags> {
    const item = getFlagsItem(actor);

    if (!item) {
        return;
    }

    return getExpandedSummonerFlags(item);
}