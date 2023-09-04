import type { SpellcastingEntryPF2e } from "@item/index.js";
import type { ItemPF2e } from "@module/documents.js";

export async function substituteSpellStats (destinationItem: ItemPF2e, sourceSpellcastingEntry: SpellcastingEntryPF2e) {
    await destinationItem.update({
        "flags.pf2eExpandedSummoner.summonerSpellAttribute": sourceSpellcastingEntry.statistic.attributeModifier?.value,
        "flags.pf2eExpandedSummoner.summonerSpellProficiency": sourceSpellcastingEntry.statistic.modifiers.find((mod) => mod.type === "proficiency")?.value,
      }, { noHook: true });
}
