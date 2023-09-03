import { getExpandedSummonerFlags } from "../flags/getExpandedSummonerFlags.mts";
import { getSettingFlag } from "../settings.mts";
import { UpdateActorCallback } from "../types/hooks.js";

export const updateActor_dismissEidolon: UpdateActorCallback = async (actor, data) => {
    if (!getSettingFlag("autoDismiss")) {
        return;
    }

    const flags = getExpandedSummonerFlags(actor);

    if (!flags || flags.role !== "eidolon") {
        return;
    }

    if (!data?.system?.attributes?.hp
        || data.system.attributes.hp.value === undefined
        || data.system.attributes.hp.value > 0) {
        return;
    }

    const currentScene = game.scenes.current;

    if (!currentScene) {
        return;
    }

    const eidolonTokens = currentScene.tokens
        .filter((token)=> token.actor?.id === actor._id);

    // eidolonTokens.forEach((token) => {
    //      token.actor?.itemTypes.effect.forEach(e=>e.delete());
    // });

    currentScene.deleteEmbeddedDocuments(
        "Token",
        eidolonTokens
            .map((token) => token._id)
            .filter((id): id is string => !!id));
}