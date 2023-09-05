/// <reference types="jquery" resolution-mode="require"/>
/// <reference types="jquery" resolution-mode="require"/>
/// <reference types="tooltipster" />
declare abstract class SettingsMenuPF2e extends FormApplication {
    static readonly namespace: string;
    cache: Record<string, unknown>;
    static get defaultOptions(): FormApplicationOptions;
    static get prefix(): string;
    get namespace(): string;
    get prefix(): string;
    static readonly SETTINGS: readonly string[];
    /** Settings to be registered and also later referenced during user updates */
    protected static get settings(): Record<string, PartialSettingsData>;
    static registerSettings(): void;
    getData(): Promise<MenuTemplateData>;
    activateListeners($html: JQuery): void;
    protected _updateObject(event: Event, data: Record<string, unknown>): Promise<void>;
    /** Overriden to add some additional first-render behavior */
    protected _injectHTML($html: JQuery<HTMLElement>): void;
}
interface SettingsMenuPF2e extends FormApplication {
    constructor: typeof SettingsMenuPF2e;
    options: SettingsMenuOptions;
}
type PartialSettingsData = Omit<SettingRegistration, "scope" | "config">;
interface SettingsTemplateData extends PartialSettingsData {
    key: string;
    value: unknown;
    isSelect: boolean;
    isCheckbox: boolean;
}
interface MenuTemplateData extends FormApplicationData {
    settings: Record<string, SettingsTemplateData>;
}
interface SettingsMenuOptions extends FormApplicationOptions {
    highlightSetting?: string;
}
declare function settingsToSheetData(settings: Record<string, PartialSettingsData>, cache: Record<string, unknown>, prefix?: string): Record<string, SettingsTemplateData>;
export { MenuTemplateData, PartialSettingsData, SettingsMenuOptions, SettingsMenuPF2e, SettingsTemplateData, settingsToSheetData, };
