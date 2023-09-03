import type { ActorPF2e } from "@actor/index.js";
import type { CombatantPF2e } from "@module/encounter/index.js";

export async function updateEffectsOnTurnStart(
    combatant: CombatantPF2e,
    eidolon: ActorPF2e) {
    // Prepare and run turn start updates for effects on the Eidolon
    for (const effect of eidolon.itemTypes.effect) {
        effect.prepareBaseData();
        await effect.onTurnStartEnd("start");
    }

    // Look for any effects which should expire at the start of turn and remove them
    // This includes effects on the Eidolon and effects created by the Eidolon
    const actorsToUpdate: Set<ActorPF2e> = new Set<ActorPF2e>();

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
                actorsToUpdate.add(effect.actor);
                deletions[actorId] ??= [];
                deletions[actorId].push(effect.id);
        }
    }

    if (game.settings.get("pf2e", "automation.removeExpiredEffects")) {
        for (const actor of actorsToUpdate) {
            if (actor._id !== null) {
                await actor.deleteEmbeddedDocuments(
                    "Item",
                    deletions[actor._id],
                );
            }
        }
    } else if (game.settings.get("pf2e", "automation.effectExpiration")) {
        resetActors(actorsToUpdate);
    }


    // ensure the effects panel is up to date
    game.pf2e.effectPanel.refresh();
}

// copied from pf2e @actor/helpers
// Reset and rerender a provided list of actors. Omit argument to reset all world and synthetic actors
async function resetActors(actors?: Iterable<ActorPF2e>, { rerender = true } = {}): Promise<void> {
    actors ??= [
        game.actors.contents,
        game.scenes.contents.flatMap((s) => s.tokens.contents).flatMap((t) => t.actor ?? []),
    ].flat();

    for (const actor of actors) {
        actor.reset();
        if (rerender) actor.render();
    }
    game.pf2e.effectPanel.refresh();

    // If expired effects are automatically removed, the actor update cycle will reinitialize vision
    const refreshScenes =
        game.settings.get("pf2e", "automation.effectExpiration") &&
        !game.settings.get("pf2e", "automation.removeExpiredEffects");

    if (refreshScenes) {
        const scenes = new Set(
            Array.from(actors)
                .flatMap((a) => a.getActiveTokens(false, true))
                .flatMap((t) => t.scene)
        );
        for (const scene of scenes) {
            scene.reset();
            if (scene.isView) {
                canvas.perception.update({ initializeVision: true }, true);
            }
        }
    }
}