import { createSlice } from '@reduxjs/toolkit';

import type { PayloadAction } from '@reduxjs/toolkit';
import type ISettings from './interfaces/ISettings';

export const initialState: ISettings = {
  isVisibleGmailSettings: false,
  isVisibleSidebar: false,
  densityType: null,
  inboxType: null,
  readingPaneType: null,
};

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setSettingsState: (state, action: PayloadAction<Partial<ISettings>>) => ({ ...state, ...action.payload }),
  },
});

export const { setSettingsState } = settingsSlice.actions;
export default settingsSlice.reducer;
