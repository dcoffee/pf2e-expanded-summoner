import type { ActorPF2e } from "@module/documents.js";

import { ExpandedSummonerFlags } from "../types/expandedSummonerFlags.js";
import { getExpandedSummonerFlags } from "../flags/getExpandedSummonerFlags.mts";
import { getFlagsItem } from "../flags/getFlagsItem.mts";

export async function getLinkedActor(source: ActorPF2e): Promise<{
    linkedActor?: ActorPF2e;
    sourceFlags?: ExpandedSummonerFlags;
}> {
    const sourceFlags = getExpandedSummonerFlags(source);

    if (!sourceFlags) {
        return {};
    }

    // find the actor pointed to by the linkedActor field
    const linkedActor = game.actors.get(sourceFlags.linkUuid)
        ?? game.actors.find((other) => {
            const otherFlags = getExpandedSummonerFlags(other);

            return !!otherFlags
                && other._id !== source._id
                && otherFlags.role !== sourceFlags.role
                && otherFlags.discriminator === sourceFlags.discriminator;
        });

    if (!linkedActor) {
        return {};
    }

    // doubly-link the actors
    if (linkedActor._id !== sourceFlags.linkUuid) {
        console.log("assigning link UUID", linkedActor, sourceFlags);
        const sourceItem = getFlagsItem(source);
        
        await sourceItem?.update({
            "flags.pf2eExpandedSummoner.linkUuid":linkedActor._id,
        }
        , { noHook: true });
    }

    return {
        linkedActor,
        sourceFlags,
    };
};
