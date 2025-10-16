import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/store';
import { toggleSummaryCards, toggleDataTable } from '@/store/slices/uiSettingsSlice';
import { saveUISettingsToStorage } from '@/utils/dataInitializer';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Settings } from 'lucide-react';
import { toast } from 'sonner';

const SettingsDrawer = () => {
  const dispatch = useDispatch();
  const uiSettings = useSelector((state: RootState) => state.uiSettings);

  const handleToggleSummaryCards = () => {
    dispatch(toggleSummaryCards());
    const newSettings = { ...uiSettings, showSummaryCards: !uiSettings.showSummaryCards };
    saveUISettingsToStorage(newSettings);
    toast.success('Settings updated');
  };

  const handleToggleDataTable = () => {
    dispatch(toggleDataTable());
    const newSettings = { ...uiSettings, showDataTable: !uiSettings.showDataTable };
    saveUISettingsToStorage(newSettings);
    toast.success('Settings updated');
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon">
          <Settings className="h-4 w-4" />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Dashboard Settings</SheetTitle>
          <SheetDescription>
            Configure which components to display on the dashboard
          </SheetDescription>
        </SheetHeader>
        <div className="mt-6 space-y-4">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="summaryCards"
              checked={uiSettings.showSummaryCards}
              onCheckedChange={handleToggleSummaryCards}
            />
            <label
              htmlFor="summaryCards"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Show Summary Cards
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="dataTable"
              checked={uiSettings.showDataTable}
              onCheckedChange={handleToggleDataTable}
            />
            <label
              htmlFor="dataTable"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Show Data Table
            </label>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default SettingsDrawer;
