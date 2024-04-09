export type TImage = {
  src: string;
  srcset?: string;
};

export type TSettingsItem = {
  name?: string;
  image?: TImage;
} | null;

export default interface ISettings {
  isVisibleGmailSettings: boolean;
  isVisibleSidebar: boolean;
  densityType: TSettingsItem;
  inboxType: TSettingsItem;
  readingPaneType: TSettingsItem;
}
