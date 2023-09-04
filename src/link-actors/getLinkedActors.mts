import type { ActorPF2e } from "@module/documents.js";

import { ExpandedSummonerFlags } from "../types/expandedSummonerFlags.js";
import { getExpandedSummonerFlags } from "../flags/getExpandedSummonerFlags.mts";

export async function getLinkedActor(source: ActorPF2e): Promise<{
    linkedActor?: ActorPF2e;
    sourceFlags?: ExpandedSummonerFlags;
}> {
    const sourceFlags = getExpandedSummonerFlags(source);

    if (!sourceFlags) {
        return {};
    }

    // find the actor pointed to by the linkedActor field
    const linkedActor = game.actors.get(sourceFlags.linkUuid);

    if (!linkedActor) {
        return {};
    }

    return {
        linkedActor,
        sourceFlags,
    };
};
