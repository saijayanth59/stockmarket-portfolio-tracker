import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartWrapper } from "@/data-chart/wrapper"
import Chart2 from "@/data-chart/bar/2"

export default function TopMovers() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Movers</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartWrapper content={Chart2} className="aspect-[4/3]" title="Top Gainers and Losers" />
      </CardContent>
    </Card>
  )
}

