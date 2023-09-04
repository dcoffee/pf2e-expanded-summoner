import { getExpandedSummonerFlags } from "../flags/getExpandedSummonerFlags.mts";
import { RenderActorSheetCallback } from "../types/hooks.js";
import { renderLinkActorButton } from "./renderLinkActorButton.mts";

export const renderActorSheet_LinkActor: RenderActorSheetCallback = async (actorSheet, $html, _data) => {
    const sheetFlags = getExpandedSummonerFlags(actorSheet.actor);

    if (!sheetFlags) {
        return;
    }
    
    if($html.closest('.app').find('.summoner-link').length !== 0) {
        return;
    }

    const element = renderLinkActorButton(actorSheet, sheetFlags);
    
    const title = $html.closest('.app').find('.window-title');
    element.insertAfter(title); 
};