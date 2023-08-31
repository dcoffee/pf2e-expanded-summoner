export type PreUpdateActorHook = (actor: ActorPF2e, data: ActorSourcePF2e) => Promise<boolean>;

export type PreCreateItemCallback = 
    HookCallback<[
        ItemPF2e,
        PreCreate<foundry.documents.ItemSource>, 
        DocumentModificationContext<Actor<TokenDocument<Scene | null> | null> | null>,
        string
    ]>;
