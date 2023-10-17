import type { ActorSourcePF2e } from "@actor/data/index.js";
import type { ActorPF2e } from "@actor/index.js";
import type { ItemPF2e } from "@item/base.js";
import type { ItemSourcePF2e } from "@item/data/index.js";
import type { CombatantPF2e } from "@module/encounter/combatant.js";
import type { EncounterPF2e } from "@module/encounter/document.js";
import type { ActorSheetPF2e } from "@actor/sheet/base.js";

import { registerSettingFlag } from "./settings.mts";
import { preCreateItem_flagsItem } from "./flags/hooks.mts";
import { preUpdateActor_SharedHp } from "./shared-hp/hooks.mts";
import { pf2eEndTurn_ForwardToEidolon, pf2eStartTurn_ForwardToEidolon } from "./encounters/hooks.mts";
import { preUpdateItem_SubstituteSpellcastingBonus } from "./substitute-spell-stats/hooks.mts";
import { renderActorSheet_LinkActor } from "./link-actors/hooks.mts";

Hooks.once("init", () => {
  registerSettingFlag("shareSummonerHp", "Share Eidolon and Summoner HP");
  registerSettingFlag("eidolonCombatant", "Automate Eidolon's turn-based effects");
  registerSettingFlag("substituteSummonerSpellBonus", "Substitute Summoner's spellcasting bonus for Eidolon");
});

Hooks.on("preUpdateActor", async (actor, actorSource) => await preUpdateActor_SharedHp(actor as ActorPF2e, actorSource as DeepPartial<ActorSourcePF2e>));
Hooks.on("preUpdateItem", async (item, itemSource) => await preUpdateItem_SubstituteSpellcastingBonus(item as ItemPF2e, itemSource as DeepPartial<ItemSourcePF2e>));
Hooks.on("preCreateItem", async (item: unknown, itemSource: unknown) => await preCreateItem_flagsItem(item as ItemPF2e, itemSource as DeepPartial<ItemSourcePF2e>));
Hooks.on("pf2e.startTurn", async (combatant, encounter) => await pf2eStartTurn_ForwardToEidolon(combatant as CombatantPF2e, encounter as EncounterPF2e));
Hooks.on("pf2e.endTurn", async(combatant, encounter) => await pf2eEndTurn_ForwardToEidolon(combatant as CombatantPF2e, encounter as EncounterPF2e));
Hooks.on("renderActorSheet", async(actorSheet, $html, actorSheetSource) =>
  await renderActorSheet_LinkActor(actorSheet as ActorSheetPF2e<ActorPF2e>, $html as JQuery<HTMLElement>, actorSheetSource as any));
