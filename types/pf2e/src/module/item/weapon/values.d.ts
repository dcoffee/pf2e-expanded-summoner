declare const WEAPON_CATEGORIES: Set<"unarmed" | "martial" | "simple" | "advanced">;
declare const MELEE_WEAPON_GROUPS: Set<"dart" | "knife" | "axe" | "brawling" | "club" | "flail" | "hammer" | "pick" | "polearm" | "shield" | "spear" | "sword">;
/** Groups that will be forced as ranged weapons */
declare const MANDATORY_RANGED_GROUPS: Set<"bomb" | "bow" | "firearm" | "sling">;
declare const WEAPON_GROUPS: Set<"dart" | "knife" | "axe" | "brawling" | "club" | "flail" | "hammer" | "pick" | "polearm" | "shield" | "spear" | "sword" | "bomb" | "bow" | "firearm" | "sling">;
declare const WEAPON_PROPERTY_RUNE_TYPES: Set<"vorpal" | "anarchic" | "ancestralEchoing" | "anchoring" | "ashen" | "authorized" | "axiomatic" | "bane" | "bloodbane" | "bloodthirsty" | "brilliant" | "called" | "coating" | "conducting" | "corrosive" | "crushing" | "cunning" | "dancing" | "deathdrinking" | "demolishing" | "disrupting" | "earthbinding" | "energizing" | "extending" | "fanged" | "fearsome" | "flaming" | "flurrying" | "frost" | "ghostTouch" | "greaterAnchoring" | "greaterAshen" | "greaterBloodbane" | "greaterBrilliant" | "greaterCorrosive" | "greaterCrushing" | "greaterDisrupting" | "greaterExtending" | "greaterFanged" | "greaterFearsome" | "greaterFlaming" | "greaterFrost" | "greaterHauling" | "greaterImpactful" | "greaterShock" | "greaterThundering" | "grievous" | "hauling" | "holy" | "hopeful" | "impactful" | "impossible" | "keen" | "kinWarding" | "majorFanged" | "merciful" | "pacifying" | "returning" | "serrating" | "shifting" | "shock" | "speed" | "spellStoring" | "swarming" | "thundering" | "underwater" | "unholy" | "wounding">;
declare const THROWN_RANGES: Set<10 | 15 | 20 | 40 | 30 | 60 | 80 | 100>;
declare const WEAPON_RANGES: Set<10 | 15 | 20 | 40 | 30 | 50 | 60 | 80 | 100 | 70 | 90 | 120 | 140 | 150 | 180 | 200 | 240 | 300>;
declare const CROSSBOW_WEAPONS: Set<"alchemical-crossbow" | "crossbow" | "hand-crossbow" | "heavy-crossbow" | "repeating-crossbow" | "repeating-hand-crossbow" | "repeating-heavy-crossbow" | "taw-launcher">;
export { CROSSBOW_WEAPONS, MELEE_WEAPON_GROUPS, MANDATORY_RANGED_GROUPS, THROWN_RANGES, WEAPON_CATEGORIES, WEAPON_GROUPS, WEAPON_PROPERTY_RUNE_TYPES, WEAPON_RANGES, };
