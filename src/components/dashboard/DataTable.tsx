import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/store';
import { updateSite, Site } from '@/store/slices/sitesSlice';
import { saveSitesToStorage } from '@/utils/dataInitializer';
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  ColumnDef,
} from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Edit2, Save, BarChart2 } from 'lucide-react';
import axios from 'axios';
import { toast } from 'sonner';
import SiteInsightsModal from './SiteInsightsModal';

const DataTable = () => {
  const dispatch = useDispatch();
  const sites = useSelector((state: RootState) => state.sites.sites);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editedData, setEditedData] = useState<Partial<Site>>({});
  const [selectedSite, setSelectedSite] = useState<Site | null>(null);
  const [insightsModalOpen, setInsightsModalOpen] = useState(false);

  const handleEdit = (site: Site) => {
    setEditingId(site.id);
    setEditedData(site);
  };

  const handleSave = async (site: Site) => {
    try {
      // Simulate POST request with axios
      await new Promise((resolve) => setTimeout(resolve, 500));
      
      // In a real scenario, you would make an actual API call like:
      // await axios.post('/api/sites', editedData);

      const updatedDate = new Date().toLocaleDateString();
      
      const updatedSite = { ...site, ...editedData, lastUpdated: updatedDate };
      
      // Update Redux store
      dispatch(updateSite(updatedSite));
      
      // Update localStorage
      const allSites = sites.map(s => s.id === updatedSite.id ? updatedSite : s);
      saveSitesToStorage(allSites);
      
      setEditingId(null);
      setEditedData({});
      
      toast.success('Site updated successfully');
    } catch (error) {
      console.error('Error saving site:', error);
      toast.error('Failed to update site');
    }
  };

  const handleInsights = (site: Site) => {
    setSelectedSite(site);
    setInsightsModalOpen(true);
  };

  const getStatusBadge = (status: string) => {
    const config: Record<string, { variant: "default" | "secondary" | "destructive" | "outline"; className: string }> = {
      Active: { variant: 'default', className: 'bg-success text-success-foreground hover:bg-success/90' },
      Inactive: { variant: 'secondary', className: 'bg-muted text-muted-foreground' },
      Maintenance: { variant: 'outline', className: 'border-warning text-warning' },
    };
    const statusConfig = config[status] || config.Active;
    return (
      <Badge variant={statusConfig.variant} className={statusConfig.className}>
        {status}
      </Badge>
    );
  };

  const columns: ColumnDef<Site>[] = [
    {
      accessorKey: 'id',
      header: () => <span className="font-bold text-xs uppercase tracking-wider">ID</span>,
      cell: ({ row }) => (
        <span className="font-mono text-muted-foreground bg-accent px-2 py-1 rounded text-xs">
          #{row.original.id}
        </span>
      ),
    },
    {
      accessorKey: 'name',
      header: () => <span className="font-bold text-xs uppercase tracking-wider">Site Name</span>,
      cell: ({ row }) => {
        const isEditing = editingId === row.original.id;
        return isEditing ? (
          <Input
            value={editedData.name || row.original.name}
            onChange={(e) => setEditedData({ ...editedData, name: e.target.value })}
            className="h-9 border-2 border-primary font-medium"
            placeholder="Site name"
          />
        ) : (
          <span className="font-semibold text-foreground">{row.original.name}</span>
        );
      },
    },
    {
      accessorKey: 'status',
      header: () => <span className="font-bold text-xs uppercase tracking-wider">Status</span>,
      cell: ({ row }) => {
        const isEditing = editingId === row.original.id;
        return isEditing ? (
          <Input
            value={editedData.status || row.original.status}
            onChange={(e) => setEditedData({ ...editedData, status: e.target.value })}
            className="h-9 border-2 border-primary"
            placeholder="Status"
          />
        ) : (
          getStatusBadge(row.original.status)
        );
      },
    },
    {
      accessorKey: 'alarms',
      header: () => <span className="font-bold text-xs uppercase tracking-wider">Alarms</span>,
      cell: ({ row }) => {
        const isEditing = editingId === row.original.id;
        const alarmCount = row.original.alarms;
        return isEditing ? (
          <Input
            type="number"
            value={editedData.alarms ?? alarmCount}
            onChange={(e) => setEditedData({ ...editedData, alarms: parseInt(e.target.value) })}
            className="h-9 w-24 border-2 border-destructive/50"
            placeholder="0"
          />
        ) : (
          <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-sm font-semibold ${
            alarmCount > 0 ? 'bg-destructive/10 text-destructive' : 'bg-accent text-muted-foreground'
          }`}>
            {alarmCount}
          </span>
        );
      },
    },
    {
      accessorKey: 'tickets',
      header: () => <span className="font-bold text-xs uppercase tracking-wider">Tickets</span>,
      cell: ({ row }) => {
        const isEditing = editingId === row.original.id;
        const ticketCount = row.original.tickets;
        return isEditing ? (
          <Input
            type="number"
            value={editedData.tickets ?? ticketCount}
            onChange={(e) => setEditedData({ ...editedData, tickets: parseInt(e.target.value) })}
            className="h-9 w-24 border-2 border-warning/50"
            placeholder="0"
          />
        ) : (
          <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-sm font-semibold ${
            ticketCount > 0 ? 'bg-warning/10 text-warning' : 'bg-accent text-muted-foreground'
          }`}>
            {ticketCount}
          </span>
        );
      },
    },
    {
      accessorKey: 'devices',
      header: () => <span className="font-bold text-xs uppercase tracking-wider">Devices</span>,
      cell: ({ row }) => {
        const isEditing = editingId === row.original.id;
        const deviceCount = row.original.devices;
        return isEditing ? (
          <Input
            type="number"
            value={editedData.devices ?? deviceCount}
            onChange={(e) => setEditedData({ ...editedData, devices: parseInt(e.target.value) })}
            className="h-9 w-24 border-2 border-info/50"
            placeholder="0"
          />
        ) : (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-sm font-semibold bg-info/10 text-info">
            {deviceCount}
          </span>
        );
      },
    },
    {
      accessorKey: 'lastUpdated',
      header: () => <span className="font-bold text-xs uppercase tracking-wider">Last Updated</span>,
      cell: ({ row }) => (
        <span className="text-sm text-muted-foreground font-mono">
            {row.original.lastUpdated}
          </span>
      ),
    },
    {
      id: 'actions',
      header: () => <span className="font-bold text-xs uppercase tracking-wider">Actions</span>,
      cell: ({ row }) => {
        const isEditing = editingId === row.original.id;
        return (
          <div className="flex gap-2">
            {isEditing ? (
              <Button
                size="sm"
                onClick={() => handleSave(row.original)}
                className="h-9 bg-success hover:bg-success/90 text-success-foreground shadow-sm"
              >
                <Save className="h-4 w-4 mr-1.5" />
                Save
              </Button>
            ) : (
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleEdit(row.original)}
                className="h-9 border-2 hover:border-primary hover:bg-primary/5"
              >
                <Edit2 className="h-4 w-4 mr-1.5" />
                Edit
              </Button>
            )}
            <Button
              size="sm"
              variant="secondary"
              onClick={() => handleInsights(row.original)}
              className="h-9 hover:bg-info/10 hover:text-info hover:border-info border-2"
            >
              <BarChart2 className="h-4 w-4 mr-1.5" />
              Insights
            </Button>
          </div>
        );
      },
    },
  ];

  const table = useReactTable({
    data: sites,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <>
      <Card className="shadow-lg border-2">
        <CardHeader className="bg-gradient-to-r from-accent to-accent/50 border-b-2">
          <CardTitle className="text-xl font-bold flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
            Sites Data Management
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id} className="border-b-2 bg-muted/30">
                    {headerGroup.headers.map((header) => (
                      <th
                        key={header.id}
                        className="text-left p-4 text-foreground"
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody>
                {table.getRowModel().rows.map((row, index) => (
                  <tr 
                    key={row.id} 
                    className={`border-b transition-all duration-200 hover:bg-accent/30 ${
                      editingId === row.original.id ? 'bg-primary/5 border-l-4 border-l-primary' : ''
                    } ${index % 2 === 0 ? 'bg-background' : 'bg-muted/10'}`}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className="p-4 text-sm">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
      
      <SiteInsightsModal
        site={selectedSite}
        open={insightsModalOpen}
        onClose={() => setInsightsModalOpen(false)}
      />
    </>
  );
};

export default DataTable;
