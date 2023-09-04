import type { ActorPF2e } from "@module/documents.js";
import { getFlagsItem } from "../flags/getFlagsItem.mts";

export async function setHpPool(destination: ActorPF2e, maxHp: number) {
    const destinationFlags = getFlagsItem(destination);
    
    await destinationFlags?.update({
        "flags.pf2eExpandedSummoner.hpPool": maxHp,
        }, { noHook: true });
}