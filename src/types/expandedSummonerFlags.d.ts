type ExpandedSummonerFlagsRole = "eidolon" | "summoner";

type BaseFlags = {
    role: ExpandedSummonerFlagsRole;
    slug: string;
    hpPool: number;
    linkUuid: string;
}

type EidolonFlags = BaseFlags & {
    role: "eidolon";
}

type SummonerFlags = BaseFlags & {
    role: "summoner";
}

export type ExpandedSummonerFlags = EidolonFlags | SummonerFlags;
