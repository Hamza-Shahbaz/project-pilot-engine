import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface SiteInsight {
  siteId: number;
  siteName: string;
  trend: number[];
  heatmapData: number[][];
}

interface InsightsState {
  insights: SiteInsight[];
}

const initialState: InsightsState = {
  insights: [],
};

const insightsSlice = createSlice({
  name: 'insights',
  initialState,
  reducers: {
    setInsights: (state, action: PayloadAction<SiteInsight[]>) => {
      state.insights = action.payload;
    },
  },
});

export const { setInsights } = insightsSlice.actions;
export default insightsSlice.reducer;
