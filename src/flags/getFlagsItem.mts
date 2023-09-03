import type { ActorPF2e } from "@actor/base.js";
import type { ItemPF2e } from "@item/base.js";

import { FLAGS_ITEM_UUID } from "./constants.mts";

export function getFlagsItem(
    actor: ActorPF2e,
): Maybe<ItemPF2e> {
    return actor.items.find((item) => item.sourceId === FLAGS_ITEM_UUID);
};
