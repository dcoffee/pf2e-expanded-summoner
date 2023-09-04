import type { ActorPF2e } from "@module/documents.js";
import type { ExpandedSummonerFlags, ExpandedSummonerFlagsRole } from "../types/expandedSummonerFlags.js";

import { FLAGS_PATH } from "./constants.mts";

export function getExpandedSummonerFlags(
    actor: ActorPF2e,
): Maybe<ExpandedSummonerFlags> {
    return {
        hpPool: getProperty(actor, `${FLAGS_PATH}.hpPool`) as number ?? 0,
        linkUuid: getProperty(actor, `${FLAGS_PATH}.linkUuid`) as string ?? "",
        role: getProperty(actor, `${FLAGS_PATH}.role`) as ExpandedSummonerFlagsRole ?? "summoner",
        discriminator: getProperty(actor, `${FLAGS_PATH}.discriminator`) as string ?? "",
        summonerSpellProficiency: getProperty(actor, `${FLAGS_PATH}.summonerSpellProficiency`) as number ?? 0,
        summonerSpellAttribute: getProperty(actor, `${FLAGS_PATH}.summonerSpellAttribute`) as number ?? 0,
    };
}
