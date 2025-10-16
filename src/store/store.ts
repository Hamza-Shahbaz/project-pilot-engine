import { configureStore } from '@reduxjs/toolkit';
import sitesReducer from './slices/sitesSlice';
import insightsReducer from './slices/insightsSlice';
import uiSettingsReducer from './slices/uiSettingsSlice';

export const store = configureStore({
  reducer: {
    sites: sitesReducer,
    insights: insightsReducer,
    uiSettings: uiSettingsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
