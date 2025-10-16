import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Activity, AlertTriangle, HardDrive, Ticket } from 'lucide-react';

const SummaryCards = () => {
  const sites = useSelector((state: RootState) => state.sites.sites);
  
  // Calculate totals from sites data
  const totalSites = sites.length;
  const totalAlarms = sites.reduce((sum, site) => sum + site.alarms, 0);
  const totalDevices = sites.reduce((sum, site) => sum + site.devices, 0);
  const totalTickets = sites.reduce((sum, site) => sum + site.tickets, 0);

  const cards = [
    {
      title: 'Total Sites',
      value: totalSites,
      icon: Activity,
      color: 'text-primary',
    },
    {
      title: 'Total Alarms',
      value: totalAlarms,
      icon: AlertTriangle,
      color: 'text-destructive',
    },
    {
      title: 'Total Devices',
      value: totalDevices,
      icon: HardDrive,
      color: 'text-info',
    },
    {
      title: 'Total Tickets',
      value: totalTickets,
      icon: Ticket,
      color: 'text-warning',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <Card key={card.title} className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {card.title}
              </CardTitle>
              <Icon className={`h-4 w-4 ${card.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{card.value}</div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default SummaryCards;
