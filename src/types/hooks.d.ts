import type { ActorSourcePF2e } from "@actor/data/index.js";
import type { ItemSourcePF2e } from "@item/data/index.js";
import type { ActorPF2e, ItemPF2e } from "@module/documents.js";

export type PreUpdateActorCallback = HookParamsPreUpdateActor<ActorPF2e,ActorSourcePF2e>[callback];

export type UpdateActorCallback = HookParamsUpdateActor<ActorPF2e,ActorSourcePF2e>[callback];

export type PreCreateItemCallback = HookParamsPreCreateItem<ItemPF2e,ItemSourcePF2e>[callback];
