import type { StartEndTurnCallback } from "../types/hooks.js";

import { getLinkedActor } from "../link-actors/getLinkedActors.mts";
import { getSettingFlag } from "../settings.mts";
import { showEidolonStatusEffects } from "./showEidolonStatusEffects.mts";
import { updateEffectsOnTurnStart } from "./updateEffectsOnTurnStart.mts";
import { updateEffectsOnTurnEnd } from "./updateEffectsOnTurnEnd.mts";

export const pf2eStartTurn_ForwardToEidolon: StartEndTurnCallback = async (combatant, encounter) => {
    if (!getSettingFlag("eidolonCombatant")) {
        return;
    }

    if (!combatant.actor) {
        return;
    }

    const {linkedActor, sourceFlags} = await getLinkedActor(combatant.actor);

    if (sourceFlags?.role !== "summoner" || !linkedActor) {
        return;
    }

    await showEidolonStatusEffects(combatant, encounter, linkedActor);

    // Run any turn start events
    const actorUpdates: Record<string, unknown> = {};

    for (const rule of linkedActor.rules) {
        await rule.onTurnStart?.(actorUpdates);
    }

    // Now that a user has been found, make the updates if there are any
    if (Object.keys(actorUpdates).length > 0) {
        await linkedActor.update(actorUpdates);
    }

    await updateEffectsOnTurnStart(combatant, linkedActor);
};

export const pf2eEndTurn_ForwardToEidolon: StartEndTurnCallback = async (combatant, _encounter) => {
    if (!getSettingFlag("eidolonCombatant")) {
        return;
    }

    if (!combatant.actor) {
        return;
    }

    const {linkedActor, sourceFlags} = await getLinkedActor(combatant.actor);

    if (sourceFlags?.role !== "summoner" || !linkedActor) {
        return;
    }

    // Run condition end of turn effects
    const activeConditions = linkedActor.conditions.active;
    for (const condition of activeConditions) {
        await condition.onEndTurn({ token: linkedActor.getActiveTokens(true, true).pop() });
    }

    await updateEffectsOnTurnEnd(linkedActor);
};