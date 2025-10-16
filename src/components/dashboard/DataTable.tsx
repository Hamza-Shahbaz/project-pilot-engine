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
      
      const updatedSite = { ...site, ...editedData };
      
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
    const variants: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
      Active: 'default',
      Inactive: 'secondary',
      Maintenance: 'outline',
    };
    return <Badge variant={variants[status] || 'default'}>{status}</Badge>;
  };

  const columns: ColumnDef<Site>[] = [
    {
      accessorKey: 'id',
      header: 'ID',
    },
    {
      accessorKey: 'name',
      header: 'Site Name',
      cell: ({ row }) => {
        const isEditing = editingId === row.original.id;
        return isEditing ? (
          <Input
            value={editedData.name || row.original.name}
            onChange={(e) => setEditedData({ ...editedData, name: e.target.value })}
            className="h-8"
          />
        ) : (
          row.original.name
        );
      },
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => {
        const isEditing = editingId === row.original.id;
        return isEditing ? (
          <Input
            value={editedData.status || row.original.status}
            onChange={(e) => setEditedData({ ...editedData, status: e.target.value })}
            className="h-8"
          />
        ) : (
          getStatusBadge(row.original.status)
        );
      },
    },
    {
      accessorKey: 'alarms',
      header: 'Alarms',
      cell: ({ row }) => {
        const isEditing = editingId === row.original.id;
        return isEditing ? (
          <Input
            type="number"
            value={editedData.alarms ?? row.original.alarms}
            onChange={(e) => setEditedData({ ...editedData, alarms: parseInt(e.target.value) })}
            className="h-8 w-20"
          />
        ) : (
          row.original.alarms
        );
      },
    },
    {
      accessorKey: 'tickets',
      header: 'Tickets',
      cell: ({ row }) => {
        const isEditing = editingId === row.original.id;
        return isEditing ? (
          <Input
            type="number"
            value={editedData.tickets ?? row.original.tickets}
            onChange={(e) => setEditedData({ ...editedData, tickets: parseInt(e.target.value) })}
            className="h-8 w-20"
          />
        ) : (
          row.original.tickets
        );
      },
    },
    {
      accessorKey: 'devices',
      header: 'Devices',
      cell: ({ row }) => {
        const isEditing = editingId === row.original.id;
        return isEditing ? (
          <Input
            type="number"
            value={editedData.devices ?? row.original.devices}
            onChange={(e) => setEditedData({ ...editedData, devices: parseInt(e.target.value) })}
            className="h-8 w-20"
          />
        ) : (
          row.original.devices
        );
      },
    },
    {
      accessorKey: 'lastUpdated',
      header: 'Last Updated',
      cell: ({ row }) => {
        const isEditing = editingId === row.original.id;
        return isEditing ? (
          <Input
            type="date"
            value={editedData.lastUpdated || row.original.lastUpdated}
            onChange={(e) => setEditedData({ ...editedData, lastUpdated: e.target.value })}
            className="h-8"
          />
        ) : (
          row.original.lastUpdated
        );
      },
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => {
        const isEditing = editingId === row.original.id;
        return (
          <div className="flex gap-2">
            {isEditing ? (
              <Button
                size="sm"
                onClick={() => handleSave(row.original)}
                className="h-8"
              >
                <Save className="h-3 w-3 mr-1" />
                Save
              </Button>
            ) : (
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleEdit(row.original)}
                className="h-8"
              >
                <Edit2 className="h-3 w-3 mr-1" />
                Edit
              </Button>
            )}
            <Button
              size="sm"
              variant="secondary"
              onClick={() => handleInsights(row.original)}
              className="h-8"
            >
              <BarChart2 className="h-3 w-3 mr-1" />
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
      <Card>
        <CardHeader>
          <CardTitle>Sites Data</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id} className="border-b">
                    {headerGroup.headers.map((header) => (
                      <th
                        key={header.id}
                        className="text-left p-3 font-semibold text-sm text-muted-foreground"
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
                {table.getRowModel().rows.map((row) => (
                  <tr key={row.id} className="border-b hover:bg-accent/50 transition-colors">
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className="p-3 text-sm">
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
