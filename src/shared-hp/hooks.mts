import type { PreUpdateActorCallback } from "../types/hooks.js";

import { getSettingFlag } from "../settings.mts";
import { adjustSharedHp } from "./adjustSharedHp.mts";
import { getLinkedActor } from "../link-actors/getLinkedActors.mts";

export const preUpdateActor_SharedHp: PreUpdateActorCallback = async (actor, data) => {
    if (!getSettingFlag("shareSummonerHp")) {
      return;
    }

    const hpData = data.system?.attributes?.hp;
    if (!hpData) {
      return;
    }

    const { linkedActor, sourceFlags } = await getLinkedActor(actor);
    if (!linkedActor || !sourceFlags) {
      return;
    }

    await adjustSharedHp(
        hpData,
        sourceFlags,
        linkedActor,
        actor.system.attributes.hp?.max);
};