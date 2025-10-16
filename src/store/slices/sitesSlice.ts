import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Site {
  id: number;
  name: string;
  status: string;
  lastUpdated: string;
  alarms: number;
  tickets: number;
  devices: number;
  insights: number[];
}

interface SitesState {
  sites: Site[];
}

const initialState: SitesState = {
  sites: [],
};

const sitesSlice = createSlice({
  name: 'sites',
  initialState,
  reducers: {
    setSites: (state, action: PayloadAction<Site[]>) => {
      state.sites = action.payload;
    },
    updateSite: (state, action: PayloadAction<Site>) => {
      const index = state.sites.findIndex(site => site.id === action.payload.id);
      if (index !== -1) {
        state.sites[index] = action.payload;
      }
    },
  },
});

export const { setSites, updateSite } = sitesSlice.actions;
export default sitesSlice.reducer;
