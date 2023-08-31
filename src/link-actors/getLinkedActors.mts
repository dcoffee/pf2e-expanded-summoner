import type { ActorPF2e } from "@module/documents.js";

import { getExpandedSummonerFlags, getFlagsItem } from "../flags-item/getFlagsItem.mts";

export async function getLinkedActor(source: ActorPF2e) {
    const sourceItem = getFlagsItem(source);

    if (!sourceItem) {
        throw new Error("No expanded summoner flags item on source.");
    }

    const sourceFlags = getExpandedSummonerFlags(sourceItem);
    
    if (!sourceFlags) {
        throw new Error("No expanded summoner flags on source item.")
    }

    const linkedActor = game.actors.get(sourceFlags.linkUuid)
        ?? game.actors.find((other) => {
            const otherFlagsItem = getFlagsItem(other);

            if (!otherFlagsItem) {
                return false;
            }

            const otherFlags = getExpandedSummonerFlags(otherFlagsItem);

            return !!otherFlags
                && other._id !== source._id
                && otherFlags.role !== sourceFlags.role
                && otherFlags.slug === sourceFlags.slug;
        });

    if (!linkedActor) {
        throw new Error("No destination actor.");
    }

    if (linkedActor._id !== sourceFlags.linkUuid) {
        console.log("assigning link UUID");
        await sourceItem.update({
            "flags.pf2eExpandedSummoner.linkUuid":linkedActor._id,
        }
        , { noHook: true });
    }

    return {
        linkedActor,
        sourceFlags,
    };
};
