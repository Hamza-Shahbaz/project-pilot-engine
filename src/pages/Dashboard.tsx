import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import SummaryCards from '@/components/dashboard/SummaryCards';
import DataTable from '@/components/dashboard/DataTable';
import SettingsDrawer from '@/components/dashboard/SettingsDrawer';

const Dashboard = () => {
  const uiSettings = useSelector((state: RootState) => state.uiSettings);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">Monitor your sites and infrastructure</p>
        </div>
        <SettingsDrawer />
      </div>
      
      {uiSettings.showSummaryCards && <SummaryCards />}
      {uiSettings.showDataTable && <DataTable />}
    </div>
  );
};

export default Dashboard;
