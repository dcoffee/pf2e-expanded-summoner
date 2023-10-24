import type { PreUpdateActorCallback } from "../types/hooks.js";

import { getSettingFlag } from "../settings.mts";
import { adjustSharedHp } from "./adjustSharedHp.mts";
import { getExpandedSummonerFlags } from "../flags/getExpandedSummonerFlags.mts";

export const preUpdateActor_SharedHp: PreUpdateActorCallback = async (actor, data) => {
    if (!getSettingFlag("shareSummonerHp")) {
      return;
    }

    const hpData = data.system?.attributes?.hp;
    if (!hpData) {
      return;
    }

    const sourceFlags = getExpandedSummonerFlags(actor);

    if (!sourceFlags) {
      return;
    }

    await adjustSharedHp(
        hpData,
        sourceFlags,
        actor.system.attributes.hp?.max);
};