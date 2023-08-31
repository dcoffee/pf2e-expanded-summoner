import type { ActorPF2e } from "@module/documents.js";

import { getExpandedSummonerFlags, getFlagsItem } from "../flags-item/getFlagsItem.mts";
import { ExpandedSummonerFlags } from "../types/expandedSummonerFlags.js";

export async function getLinkedActor(source: ActorPF2e): Promise<{
    linkedActor?: ActorPF2e;
    sourceFlags?: ExpandedSummonerFlags;
}> {
    const sourceItem = getFlagsItem(source);

    if (!sourceItem) {
        return {};
    }

    const sourceFlags = getExpandedSummonerFlags(sourceItem);
    
    if (!sourceFlags) {
        return {};
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
        return {};
    }

    if (linkedActor._id !== sourceFlags.linkUuid) {
        console.log("assigning link UUID", linkedActor, sourceFlags);
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
