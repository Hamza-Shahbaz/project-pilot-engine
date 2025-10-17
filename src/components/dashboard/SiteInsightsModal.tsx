import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import ReactECharts from 'echarts-for-react';
import { Site } from '@/store/slices/sitesSlice';

interface SiteInsightsModalProps {
  site: Site | null;
  open: boolean;
  onClose: () => void;
}

const SiteInsightsModal = ({ site, open, onClose }: SiteInsightsModalProps) => {
  if (!site) return null;

  const option = {
    title: {
      text: `${site.name} - Insights Trend`,
      left: 'center',
    },
    tooltip: {
      trigger: 'axis',
    },
    xAxis: {
      type: 'category',
      data: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'],
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        name: 'Activity',
        type: 'line',
        data: site.insights,
        smooth: true,
        lineStyle: {
          width: 3,
        },
        itemStyle: {
          color: '#3b82f6',
        },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: 'rgba(59, 130, 246, 0.3)',
              },
              {
                offset: 1,
                color: 'rgba(59, 130, 246, 0.05)',
              },
            ],
          },
        },
      },
    ],
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl border-2">
        <DialogHeader className="pb-4 border-b-2">
          <DialogTitle className="text-2xl font-bold flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
            Site Insights - {site.name}
          </DialogTitle>
        </DialogHeader>
        <div className="mt-6">
          <ReactECharts option={option} style={{ height: '450px' }} />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SiteInsightsModal;
