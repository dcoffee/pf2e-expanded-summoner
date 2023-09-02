import type { ActorPF2e } from "@module/documents.js";
import type { CombatantPF2e } from "@module/encounter/combatant.js";
import type { EncounterPF2e } from "@module/encounter/document.js";

export async function showEidolonStatusEffects(combatant: CombatantPF2e, encounter: EncounterPF2e, eidolon: ActorPF2e) {
    const eidolonCombatant = {
        ...combatant.toObject(),
        actorId: eidolon._id,
        tokenId: eidolon.getActiveTokens().pop()?.id,
    };

    const eidolonCombatantEncounter = encounter.clone({
        combatants: [
            eidolonCombatant,
        ]
    });

    game.pf2e.StatusEffects.onUpdateEncounter(eidolonCombatantEncounter);
}