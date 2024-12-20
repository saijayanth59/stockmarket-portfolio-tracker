import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartWrapper } from "@/data-chart/wrapper"
import Chart3 from "@/data-chart/line/1"

export default function StockPerformance() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Stock Performance</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartWrapper content={Chart3} className="aspect-[4/3]" title="Stock Price Over Time" />
      </CardContent>
    </Card>
  )
}

