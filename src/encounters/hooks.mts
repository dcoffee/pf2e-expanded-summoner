import { getLinkedActor } from "../link-actors/getLinkedActors.mts";
import { getSettingFlag } from "../settings.mts";
import { StartEndTurnCallback } from "../types/hooks.js";

export const pf2eStartTurn_ForwardToEidolon: StartEndTurnCallback = async (combatant, _encounter) => {
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

    const actorUpdates: Record<string, unknown> = {};

    // Run any turn start events before the effect tracker updates.
    // In PF2e rules, the order is interchangeable. We'll need to be more dynamic with this later.
    for (const rule of linkedActor.rules) {
        await rule.onTurnStart?.(actorUpdates);
    }

    // Now that a user has been found, make the updates if there are any
    if (Object.keys(actorUpdates).length > 0) {
        await linkedActor.update(actorUpdates);
    }

    // Effect changes on turn start/end
    for (const effect of linkedActor.itemTypes.effect) {
        effect.prepareBaseData();
        await effect.onTurnStartEnd("start");

        const { remaining } = effect.remainingDuration;
        const { expiry } = effect.system.duration;
        const { origin } = effect;
        const startInitiative = effect.system.start.initiative ?? 0;
        const currentInitiative = combatant.initiative ?? 0;

        if (origin == linkedActor
            && remaining === 0
            && expiry === "turn-start"
            && startInitiative === currentInitiative) {
            
            await effect.update({ "system.context.origin.actor": `Actor.${combatant.actorId}` });
        }
    }

    await game.pf2e.effectTracker.refresh();
    game.pf2e.effectPanel.refresh();
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

    // Effect changes on turn start/end
    for (const effect of linkedActor.itemTypes.effect) {
        effect.prepareBaseData();
        await effect.onTurnStartEnd("end");
    }
};