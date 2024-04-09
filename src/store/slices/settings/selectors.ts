import { createSelector } from '@reduxjs/toolkit';

import type { RootState } from '../../types/TStore';
import type ISettings from './interfaces/ISettings';

const selectSettings = (state: RootState): ISettings => state.settings;

export const selectIsVisibleGmailSettings = createSelector(
  selectSettings,
  (settings) => settings.isVisibleGmailSettings,
);
export const selectIsVisibleSidebar = createSelector(
  selectSettings,
  (settings) => settings.isVisibleSidebar,
);
export const selectDensity = createSelector(
  selectSettings,
  (settings) => settings.densityType,
);
export const selectReadingPaneType = createSelector(
  selectSettings,
  (settings) => settings.readingPaneType,
);
export const selectInboxType = createSelector(
  selectSettings,
  (settings) => settings.inboxType,
);
