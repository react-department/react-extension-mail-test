import { combineReducers, configureStore } from '@reduxjs/toolkit';

import settings from './slices/settings/slice';

const reducers = combineReducers({
  settings,
});

export function makeStore(preloadedState = {}) {
  return configureStore({
    reducer: reducers,
    preloadedState: Object.keys(preloadedState).length ? preloadedState : undefined,
  });
}

export const store = makeStore();
