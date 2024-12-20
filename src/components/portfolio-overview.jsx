import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartWrapper } from "@/data-chart/wrapper"
import Chart1 from "@/data-chart/pie/1"

export default function PortfolioOverview() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Portfolio Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartWrapper content={Chart1} className="aspect-[4/3]" title="Portfolio Allocation" />
      </CardContent>
    </Card>
  )
}

