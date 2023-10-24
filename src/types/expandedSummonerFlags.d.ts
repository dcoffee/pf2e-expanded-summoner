import { ActorPF2e } from "@actor/base.js";

type ExpandedSummonerFlagsRole = "eidolon" | "summoner";

type BaseFlags = {
    role: ExpandedSummonerFlagsRole;
    discriminator: string;
    linkedActor: Maybe<ActorPF2e>;
}

type EidolonFlags = BaseFlags & {
    role: "eidolon";
    hpPool: number;
    summonerSpellProficiency: number;
    summonerSpellAttribute: number;
}

type SummonerFlags = BaseFlags & {
    role: "summoner";
}

export type ExpandedSummonerFlags = EidolonFlags | SummonerFlags;
