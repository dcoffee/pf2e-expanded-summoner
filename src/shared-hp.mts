import type { ActorPF2e } from "../types/pf2e/src/module/actor/index.d.ts";

import { getSettingFlag } from "./settings.mts";

type ShareSummonerHpRecord = {
    destinationActorId: string;
    isSourceOfTruth: boolean;
    sharedHpTotal: number;
};

const onPreUpdateActor = async (actor: ActorPF2e, data: DocumentUpdateData<ActorPF2e>) => {
    if (!getSettingFlag("shareSummonerHp")) {
        return;
    }

    const sourceHpData = data?.system?.attributes?.hp;

    if (!sourceHpData) {
        return;
    }

    const shareSummonerHp = actor?.flags?.pf2eExpandedSummoner?.shareSummonerHp as ShareSummonerHpRecord;

    if (!shareSummonerHp) {
        return;
    }

    const { destinationActorId, isSourceOfTruth } = shareSummonerHp;

    const destinationActor = await fromUuid<ActorPF2e>(destinationActorId);

    if (!destinationActor) {
        throw new Error("Missing destinationActorId");
    }

    if (isSourceOfTruth && actor.system.attributes.hp?.max) {
        await destinationActor.update({
            "flags.pf2eExpandedSummoner.shareSummonerHp.sharedHpTotal": actor.system.attributes.hp.max,
        }, { "noHook": true });
    }

    const destinationHp = destinationActor.system.attributes.hp ?? { value: 0, temp: 0 };
    destinationHp.value = sourceHpData.value;
    destinationHp.temp = sourceHpData.temp;

    await destinationActor.update({
        "system.attributes.hp": destinationHp,
    }, { "noHook": true });
};

export {
    onPreUpdateActor,
};
