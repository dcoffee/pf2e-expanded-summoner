import type { ActorPF2e } from "../types/pf2e/src/module/actor/index.d.ts";

import { registerSettingFlag } from "./settings.mts";
import { onPreUpdateActor } from "./shared-hp.mts";

Hooks.once("init", () => {
  registerSettingFlag("shareSummonerHp", "Share Eidolon and Summoner HP");
});

Hooks.on("preUpdateActor", async (actor, data) => {
  await onPreUpdateActor(actor as ActorPF2e, data as DocumentUpdateData<ActorPF2e>);

  return true;
});
