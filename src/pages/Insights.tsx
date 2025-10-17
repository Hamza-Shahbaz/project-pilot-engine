import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import ReactECharts from 'echarts-for-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Insights = () => {
  const insights = useSelector((state: RootState) => state.insights.insights);

  console.log(insights);

  // Prepare data for line chart - comparing trends across multiple sites
  const lineChartOption = {
    title: {
      text: 'Multi-Site Trend Comparison',
      left: 'center',
    },
    tooltip: {
      trigger: 'axis',
    },
    legend: {
      data: insights.map(site => site.siteName),
      bottom: 10,
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '15%',
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      data: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5'],
      boundaryGap: false,
    },
    yAxis: {
      type: 'value',
    },
    series: insights.map((site, index) => ({
      name: site.siteName,
      type: 'line',
      data: site.trend,
      smooth: true,
      lineStyle: {
        width: 2,
      },
    })),
  };

  // Prepare data for heatmap
  const heatmapOption = {
    title: {
      text: 'Activity Heatmap',
      left: 'center',
    },
    tooltip: {
      position: 'top',
    },
    grid: {
      height: '50%',
      top: '15%',
    },
    xAxis: {
      type: 'category',
      data: ['Monday', 'Tuesday', 'Wednesday'],
      splitArea: {
        show: true,
      },
    },
    yAxis: {
      type: 'category',
      data: ['Morning', 'Evening'],
      splitArea: {
        show: true,
      },
    },
    visualMap: {
      min: 0,
      max: 10,
      calculable: true,
      orient: 'horizontal',
      left: 'center',
      bottom: '5%',
      inRange: {
        color: ['#e0f2fe', '#0284c7', '#0c4a6e'],
      },
    },
    series: [
      {
        name: 'Activity',
        type: 'heatmap',
        data: insights.length > 0 ? insights[0].heatmapData : [],
        label: {
          show: true,
        },
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
      },
    ],
  };

  return (
    <div className="space-y-8">
      <div className="space-y-1">
        <h1 className="text-4xl font-bold text-foreground tracking-tight">Insights</h1>
        <p className="text-muted-foreground text-lg">Analyze multi-site performance and trends</p>
      </div>

      <Card className="shadow-lg border-2">
        <CardHeader className="bg-gradient-to-r from-accent to-accent/50 border-b-2">
          <CardTitle className="text-xl font-bold flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
            Trend Analysis
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <ReactECharts option={lineChartOption} style={{ height: '400px' }} />
        </CardContent>
      </Card>

      <Card className="shadow-lg border-2">
        <CardHeader className="bg-gradient-to-r from-accent to-accent/50 border-b-2">
          <CardTitle className="text-xl font-bold flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-info animate-pulse" />
            Activity Patterns
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <ReactECharts option={heatmapOption} style={{ height: '400px' }} />
        </CardContent>
      </Card>
    </div>
  );
};

export default Insights;
