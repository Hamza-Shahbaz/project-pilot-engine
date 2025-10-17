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
        <Button variant="outline" size="icon" className="border-2 hover:border-primary hover:bg-primary/5">
          <Settings className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[400px]">
        <SheetHeader className="space-y-3">
          <SheetTitle className="text-2xl font-bold flex items-center gap-2">
            <Settings className="h-6 w-6 text-primary" />
            Dashboard Settings
          </SheetTitle>
          <SheetDescription className="text-base">
            Configure which components to display on the dashboard
          </SheetDescription>
        </SheetHeader>
        <div className="mt-8 space-y-6">
          <div className="flex items-center space-x-3 p-4 rounded-lg border-2 hover:border-primary/50 transition-colors bg-accent/30">
            <Checkbox
              id="summaryCards"
              checked={uiSettings.showSummaryCards}
              onCheckedChange={handleToggleSummaryCards}
              className="h-5 w-5"
            />
            <label
              htmlFor="summaryCards"
              className="text-base font-semibold leading-none cursor-pointer flex-1"
            >
              Show Summary Cards
            </label>
          </div>
          <div className="flex items-center space-x-3 p-4 rounded-lg border-2 hover:border-primary/50 transition-colors bg-accent/30">
            <Checkbox
              id="dataTable"
              checked={uiSettings.showDataTable}
              onCheckedChange={handleToggleDataTable}
              className="h-5 w-5"
            />
            <label
              htmlFor="dataTable"
              className="text-base font-semibold leading-none cursor-pointer flex-1"
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
