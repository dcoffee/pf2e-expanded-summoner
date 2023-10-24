import type { StartEndTurnCallback } from "../types/hooks.js";

import { getSettingFlag } from "../settings.mts";
import { showEidolonStatusEffects } from "./showEidolonStatusEffects.mts";
import { updateEffectsOnTurnStart } from "./updateEffectsOnTurnStart.mts";
import { updateEffectsOnTurnEnd } from "./updateEffectsOnTurnEnd.mts";
import { getExpandedSummonerFlags } from "../flags/getExpandedSummonerFlags.mts";

export const pf2eStartTurn_ForwardToEidolon: StartEndTurnCallback = async (combatant, encounter) => {
    if (!getSettingFlag("eidolonCombatant")) {
        return;
    }

    if (!combatant.actor) {
        return;
    }

    const sourceFlags = getExpandedSummonerFlags(combatant.actor);

    if (sourceFlags?.role !== "summoner" || !sourceFlags.linkedActor) {
        return;
    }

    await showEidolonStatusEffects(combatant, encounter, sourceFlags.linkedActor);

    // Run any turn start events
    const actorUpdates: Record<string, unknown> = {};

    for (const rule of sourceFlags.linkedActor.rules) {
        await rule.onTurnStart?.(actorUpdates);
    }

    // Now that a user has been found, make the updates if there are any
    if (Object.keys(actorUpdates).length > 0) {
        await sourceFlags.linkedActor.update(actorUpdates);
    }

    await updateEffectsOnTurnStart(combatant, sourceFlags.linkedActor);
};

export const pf2eEndTurn_ForwardToEidolon: StartEndTurnCallback = async (combatant, _encounter) => {
    if (!getSettingFlag("eidolonCombatant")) {
        return;
    }

    if (!combatant.actor) {
        return;
    }

    const sourceFlags = getExpandedSummonerFlags(combatant.actor);

    if (sourceFlags?.role !== "summoner" || !sourceFlags.linkedActor) {
        return;
    }

    // Run condition end of turn effects
    const activeConditions = sourceFlags.linkedActor.conditions.active;
    for (const condition of activeConditions) {
        await condition.onEndTurn({ token: sourceFlags.linkedActor.getActiveTokens(true, true).pop() });
    }

    await updateEffectsOnTurnEnd(sourceFlags.linkedActor);
};