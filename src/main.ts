import { registerSettingFlag } from "./settings.mts";
import { preCreateItem_flagsItem } from "./flags-item/hooks.mts";
import { preUpdateActor_SharedHp } from "./shared-hp/hooks.mts";
import { updateActor_dismissEidolon } from "./auto-dismiss/hooks.mts";

Hooks.once("init", () => {
  registerSettingFlag("shareSummonerHp", "Share Eidolon and Summoner HP");
  registerSettingFlag("autoDismiss", "Remove Eidolon tokens at 0 HP")
});

Hooks.on("preUpdateActor", preUpdateActor_SharedHp);
Hooks.on("updateActor", updateActor_dismissEidolon);
Hooks.on("preCreateItem", preCreateItem_flagsItem);
