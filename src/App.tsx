import { useEffect } from 'react';
import { Provider } from 'react-redux';
import { store } from '@/store/store';
import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { initializeLocalStorage, getSitesFromStorage, getInsightsFromStorage, getUISettingsFromStorage } from '@/utils/dataInitializer';
import { setSites } from '@/store/slices/sitesSlice';
import { setInsights } from '@/store/slices/insightsSlice';
import { setUISettings } from '@/store/slices/uiSettingsSlice';
import MainLayout from '@/components/layout/MainLayout';
import Dashboard from '@/pages/Dashboard';
import Insights from '@/pages/Insights';
import NotFound from '@/pages/NotFound';

const queryClient = new QueryClient();

const AppContent = () => {
  useEffect(() => {
    // Initialize localStorage on first load
    const initData = async () => {
      await initializeLocalStorage();
      
      // Load data from localStorage into Redux store
      const sites = getSitesFromStorage();
      const insights = getInsightsFromStorage();
      const uiSettings = getUISettingsFromStorage();
      
      store.dispatch(setSites(sites));
      store.dispatch(setInsights(insights));
      store.dispatch(setUISettings(uiSettings));
    };
    
    initData();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="insights" element={<Insights />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

const App = () => (
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <AppContent />
      </TooltipProvider>
    </QueryClientProvider>
  </Provider>
);

export default App;
