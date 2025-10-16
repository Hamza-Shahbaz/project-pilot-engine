import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UISettingsState {
  showSummaryCards: boolean;
  showDataTable: boolean;
}

const initialState: UISettingsState = {
  showSummaryCards: true,
  showDataTable: true,
};

const uiSettingsSlice = createSlice({
  name: 'uiSettings',
  initialState,
  reducers: {
    setUISettings: (state, action: PayloadAction<UISettingsState>) => {
      state.showSummaryCards = action.payload.showSummaryCards;
      state.showDataTable = action.payload.showDataTable;
    },
    toggleSummaryCards: (state) => {
      state.showSummaryCards = !state.showSummaryCards;
    },
    toggleDataTable: (state) => {
      state.showDataTable = !state.showDataTable;
    },
  },
});

export const { setUISettings, toggleSummaryCards, toggleDataTable } = uiSettingsSlice.actions;
export default uiSettingsSlice.reducer;
