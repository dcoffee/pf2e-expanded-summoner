import type { ActorSourcePF2e } from "@actor/data/index.js";
import type { ItemSourcePF2e } from "@item/data/index.js";
import type { ActorPF2e, ItemPF2e } from "@module/documents.js";
import type { CombatantPF2e } from "@module/encounter/combatant.js";
import type { EncounterPF2e } from "@module/encounter/document.js";
import type { ScenePF2e, TokenDocumentPF2e } from "@module/scene/index.js";
import type { ActorSheetPF2e } from "@actor/sheet/base.js";

export type PreUpdateActorCallback = HookCallback<[ActorPF2e,DeepPartial<ActorSourcePF2e>]>;

export type UpdateActorCallback = HookCallback<[ActorPF2e,DeepPartial<ActorSourcePF2e>]>;

export type PreCreateItemCallback = HookCallback<[ItemPF2e,DeepPartial<ItemSourcePF2e>]>;

export type StartEndTurnCallback = HookCallback<[
    CombatantPF2e,
    EncounterPF2e,
]>;

export type PreUpdateItemCallback = HookCallback<[
    ItemPF2e<ActorPF2e<TokenDocumentPF2e<ScenePF2e | null> | null> | null>,
    DeepPartial<ItemSourcePF2e>
]>;

export type RenderActorSheetCallback = HookCallback<[
    ActorSheetPF2e<ActorPF2e>,
    JQuery,
    ReturnType<ActorSheetPF2e<ActorPF2e>["data"]>
]>;