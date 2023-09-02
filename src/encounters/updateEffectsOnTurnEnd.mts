import type { ActorPF2e } from "@actor/index.js";

export async function updateEffectsOnTurnEnd(eidolon: ActorPF2e) {
    // Prepare and run turn end updates for effects on the Eidolon
    for (const effect of eidolon.itemTypes.effect) {
        effect.prepareBaseData();
        await effect.onTurnStartEnd("end");
    }
}