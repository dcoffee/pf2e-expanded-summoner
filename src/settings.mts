const MODULE_NAME = "pf2e-expanded-summoner";

const validFlags = [
    "shareSummonerHp",
] as const;

type SettingsFlag = typeof validFlags[number];

const registerSettingFlag = (flag: SettingsFlag, settingLabel: string): void => {
    game.settings.register(MODULE_NAME, flag, {
        name: settingLabel,
        scope: "world",
        config: true,
        default: false,
        type: Boolean,
    });
};

const getSettingFlag = (flag: SettingsFlag): boolean => game.settings.get(MODULE_NAME, flag) as boolean;

export {
    getSettingFlag,
    registerSettingFlag,
};
