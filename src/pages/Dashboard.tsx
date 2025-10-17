import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import SummaryCards from '@/components/dashboard/SummaryCards';
import DataTable from '@/components/dashboard/DataTable';
import SettingsDrawer from '@/components/dashboard/SettingsDrawer';

const Dashboard = () => {
  const uiSettings = useSelector((state: RootState) => state.uiSettings);

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div className="space-y-1">
          <h1 className="text-4xl font-bold text-foreground tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground text-lg">Monitor your sites and infrastructure in real-time</p>
        </div>
        <SettingsDrawer />
      </div>
      
      {uiSettings.showSummaryCards && <SummaryCards />}
      {uiSettings.showDataTable && <DataTable />}
    </div>
  );
};

export default Dashboard;
