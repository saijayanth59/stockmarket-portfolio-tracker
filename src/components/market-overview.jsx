import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartWrapper } from "@/data-chart/wrapper";
import Chart4 from "@/data-chart/bar/3";

export default function MarketOverview() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Market Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartWrapper
          content={Chart4}
          className="aspect-[4/3]"
          title="Market Indices"
        />
      </CardContent>
    </Card>
  );
}
