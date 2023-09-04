type ExpandedSummonerFlagsRole = "eidolon" | "summoner";

type BaseFlags = {
    role: ExpandedSummonerFlagsRole;
    discriminator: string;
    linkUuid: string;
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
