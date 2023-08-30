import type { ActorSourcePF2e } from "../types/pf2e/src/module/actor/data/index.js";
import type { ActorPF2e } from "../types/pf2e/src/module/actor/index.d.ts";

import { getSettingFlag, registerSettingFlag } from "./settings.mts";
import { adjustSharedHp } from "./shared-hp/adjustSharedHp.mts";

Hooks.once("init", () => {
  registerSettingFlag("shareSummonerHp", "Share Eidolon and Summoner HP");
});

Hooks.on("preUpdateActor", async (actor, data) => {
  if (getSettingFlag("shareSummonerHp")) {
    const hpData = getProperty(data ?? {}, "system.attributes.hp") as ActorSourcePF2e["system"]["attributes"]["hp"];

    if (hpData) {
      await adjustSharedHp(actor as ActorPF2e, hpData);
    }
  }
  
  return true;
});
