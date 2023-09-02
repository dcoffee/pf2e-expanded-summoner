import type { ActorPF2e } from "@actor/index.js";
import type { CombatantPF2e } from "@module/encounter/index.js";

export async function updateEffectsOnTurnStart(combatant: CombatantPF2e, eidolon: ActorPF2e) {
    // Prepare and run turn start updates for effects on the Eidolon
    for (const effect of eidolon.itemTypes.effect) {
        effect.prepareBaseData();
        await effect.onTurnStartEnd("start");
    }

    // Look for any effects which should expire at the start of turn and remove them
    // This includes effects on the Eidolon and effects created by the Eidolon
    const actorsWithDeletions: Set<ActorPF2e> = new Set<ActorPF2e>();

    const deletions: {
        [actorId: string]: string[];
    } = {};

    const eidolonEffects = new Set([
        ...game.pf2e.effectTracker.effects.filter((effect) => effect.origin === eidolon),
        ...eidolon.itemTypes.effect,
    ]);

    for (const effect of eidolonEffects) {
        const { remaining } = effect.remainingDuration;
        const { expiry } = effect.system.duration;
        const startInitiative = effect.system.start.initiative ?? 0;
        const currentInitiative = combatant.initiative ?? 0;
        const actorId = effect.actor._id;

        if (remaining === 0
            && expiry === "turn-start"
            && startInitiative === currentInitiative
            && actorId !== null
            && effect.actor.primaryUpdater === game.user) {
                actorsWithDeletions.add(effect.actor);
                deletions[actorId] ??= [];
                deletions[actorId].push(effect.id);
        }
    }

    for (const actor of actorsWithDeletions) {
        if (actor._id !== null) {
            await actor.deleteEmbeddedDocuments(
                "Item",
                deletions[actor._id],
            );
        }
    }

    // ensure the effects panel is up to date
    game.pf2e.effectPanel.refresh();
}