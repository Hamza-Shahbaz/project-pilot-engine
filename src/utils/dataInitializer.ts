import axios from 'axios';

/**
 * Initialize localStorage with data from JSON files on first load
 * This function checks if data exists in localStorage, and if not,
 * loads it from the JSON files in the public/data directory
 */
export const initializeLocalStorage = async () => {
  try {
    // Check if sites data exists in localStorage
    if (!localStorage.getItem('sites')) {
      const sitesResponse = await axios.get('/data/sites.json');
      localStorage.setItem('sites', JSON.stringify(sitesResponse.data));
      console.log('Sites data loaded from JSON file into localStorage');
    }

    // Check if multi-site insights data exists in localStorage
    if (!localStorage.getItem('multiSiteInsights')) {
      const insightsResponse = await axios.get('/data/multiSiteInsights.json');
      localStorage.setItem('multiSiteInsights', JSON.stringify(insightsResponse.data));
      console.log('Multi-site insights data loaded from JSON file into localStorage');
    }

    // Check if UI settings data exists in localStorage
    if (!localStorage.getItem('uiSettings')) {
      const settingsResponse = await axios.get('/data/uiSettings.json');
      localStorage.setItem('uiSettings', JSON.stringify(settingsResponse.data));
      console.log('UI settings data loaded from JSON file into localStorage');
    }
  } catch (error) {
    console.error('Error initializing localStorage:', error);
  }
};

/**
 * Get sites data from localStorage
 */
export const getSitesFromStorage = () => {
  const data = localStorage.getItem('sites');
  return data ? JSON.parse(data) : [];
};

/**
 * Save sites data to localStorage
 */
export const saveSitesToStorage = (sites: any[]) => {
  localStorage.setItem('sites', JSON.stringify(sites));
};

/**
 * Get multi-site insights from localStorage
 */
export const getInsightsFromStorage = () => {
  const data = localStorage.getItem('multiSiteInsights');
  return data ? JSON.parse(data) : [];
};

/**
 * Get UI settings from localStorage
 */
export const getUISettingsFromStorage = () => {
  const data = localStorage.getItem('uiSettings');
  return data ? JSON.parse(data) : { showSummaryCards: true, showDataTable: true };
};

/**
 * Save UI settings to localStorage
 */
export const saveUISettingsToStorage = (settings: any) => {
  localStorage.setItem('uiSettings', JSON.stringify(settings));
};
