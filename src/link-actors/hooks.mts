import { getExpandedSummonerFlags } from "../flags/getExpandedSummonerFlags.mts";
import { RenderActorSheetCallback } from "../types/hooks.js";
import { linkActors } from "./linkActors.mts";

export const renderActorSheet_LinkActor: RenderActorSheetCallback = async (actorSheet, $html, _data) => {
    const sourceFlags = getExpandedSummonerFlags(actorSheet.actor);

    if (!sourceFlags) {
        return;
    }

    if($html.closest('.app').find('.summoner-link').length !== 0) {
        return;
    }

    const element = $(`<a class="summoner-link" title="${"Link with a summoner or eidolon actor"}"><i class="fas fa-link"></i>${"Summoner Link"}</a>`);

    element.on("click.pf2eExpandedSummoner", async () => {
        const linkTargets = game.actors.filter((other) => {
            const otherFlags = getExpandedSummonerFlags(other);
    
            return !!otherFlags
                && other._id !== actorSheet.actor._id
                && otherFlags.role !== sourceFlags.role
                && otherFlags.discriminator === sourceFlags.discriminator;
        });
    
        const actorOptions = linkTargets.reduce((prev, curr) => {
            return prev += `<option value=${curr._id}>${curr.name}</option>`;
        }, "");

        const linkActorsDialog = new Dialog({
            title: "Link Summoner and Eidolon",
            content: `
                <div class=""><div class=""><h3>Link with</h3><select id="expandedSummonerLinkSelect" autofocus>
                    ${actorOptions}
                </select>
                <hr>
            `,
            buttons: {
                link: {
                    icon: '<i class="fas fa-check"></i>',
                    label: "Link",
                    callback: async ($html) => {
                        const targetActorId = ($html[0].querySelector("#expandedSummonerLinkSelect") as HTMLSelectElement)?.value;
                        const targetActor = game.actors.get(targetActorId);

                        if (!targetActor) {
                            throw new Error(`Target actor missing for ID ${targetActorId}.`);
                        }

                        switch (sourceFlags.role) {
                            case "summoner":
                                linkActors(actorSheet.actor, targetActor)
                                break;
                            case "eidolon":
                                linkActors(targetActor, actorSheet.actor);
                                break;
                            default:
                                throw new Error("Didn't find exactly 1 summoner and 1 eidolon to link.");
                        }
                    }
                },
                cancel: {
                    icon: '<i class="fas fa-times"></i>',
                    label: "Cancel",
                }
            },
            default: "cancel",
        });
        linkActorsDialog.render(true);
    });

    const title = $html.closest('.app').find('.window-title');
    element.insertAfter(title); 
};