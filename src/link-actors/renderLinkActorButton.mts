import type { ActorSheetPF2e } from "@actor/sheet/base.js";
import type { ActorPF2e } from "@module/documents.js";
import type { ExpandedSummonerFlags } from "../types/expandedSummonerFlags.js";

import { getExpandedSummonerFlags } from "../flags/getExpandedSummonerFlags.mts";
import { linkActors } from "./linkActors.mts";

export function renderLinkActorButton(
    actorSheet: ActorSheetPF2e<ActorPF2e>,
    sheetFlags: ExpandedSummonerFlags)
    : JQuery<HTMLElement> {
    const element = $(`<a class="summoner-link" title="${"Link with a summoner or eidolon actor"}"><i class="fas fa-link"></i>${"Summoner Link"}</a>`);

    element.on("click.pf2eExpandedSummoner", async () => {
        const linkTargets = game.actors.filter((other) => {
            const otherFlags = getExpandedSummonerFlags(other);
    
            return !!otherFlags
                && other._id !== actorSheet.actor._id
                && otherFlags.role !== sheetFlags.role
                && otherFlags.discriminator === sheetFlags.discriminator;
        });
    
        const actorOptions = linkTargets.reduce((prev, curr) => {
            return prev += `<option value=${curr._id}>${curr.name}</option>`;
        }, "");

        const linkActorsDialog = new Dialog({
            title: "Link Summoner and Eidolon",
            content: `
                <div class=""><div class=""><h3>Link with</h3><select id="expandedSummonerLinkSelect">
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

                        switch (sheetFlags.role) {
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

    return element;
}