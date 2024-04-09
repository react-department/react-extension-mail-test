import type { TSettingsItem } from '../../store/slices/settings/interfaces/ISettings';

export default interface ICurrentGmailLayout {
  densityType: TSettingsItem
  inboxType: TSettingsItem
  readingPaneType: TSettingsItem
}
