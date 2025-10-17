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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <Card 
            key={card.title} 
            className="relative overflow-hidden border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-lg group"
          >
            <CardHeader className="flex flex-row items-center justify-between pb-3">
              <CardTitle className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                {card.title}
              </CardTitle>
              <div className={`p-2 rounded-lg bg-accent ${card.color} group-hover:scale-110 transition-transform`}>
                <Icon className="h-5 w-5" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent">
                {card.value}
              </div>
            </CardContent>
            <div className={`absolute bottom-0 left-0 h-1 w-full ${card.color} opacity-50`} />
          </Card>
        );
      })}
    </div>
  );
};

export default SummaryCards;
