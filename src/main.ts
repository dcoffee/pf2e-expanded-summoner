import { preCreateItem_flagsItem } from "./flags-item/hooks.mts";
import { registerSettingFlag } from "./settings.mts";
import { preUpdateActor_SharedHp } from "./shared-hp/hooks.mts";

Hooks.once("init", () => {
  registerSettingFlag("shareSummonerHp", "Share Eidolon and Summoner HP");
});

Hooks.on("preUpdateActor", preUpdateActor_SharedHp);
Hooks.on("preCreateItem", preCreateItem_flagsItem);