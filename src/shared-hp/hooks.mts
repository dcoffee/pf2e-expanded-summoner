import type { ActorSourcePF2e } from "@actor/data/index.js";
import type { PreUpdateActorHook } from "../types/hooks.js";

import { getSettingFlag } from "../settings.mts";
import { adjustSharedHp } from "./adjustSharedHp.mts";
import { getLinkedActor } from "../link-actors/getLinkedActors.mts";

export const preUpdateActor_SharedHp: PreUpdateActorHook = async (actor, data) => {
    if (!getSettingFlag("shareSummonerHp")) {
      return true;
    }
  
    const hpData = getProperty(data ?? {}, "system.attributes.hp") as ActorSourcePF2e["system"]["attributes"]["hp"];
  
    if (!hpData) {
      return true;
    }
    
    try {
        const { linkedActor, sourceFlags } = await getLinkedActor(actor);
  
        await adjustSharedHp(
            hpData,
            sourceFlags,
            linkedActor,
            actor.system.attributes.hp.max);
    
        return true;
    } catch {
        return true;
    }
};