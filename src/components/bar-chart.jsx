"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

// Updated chart data for monthly profit and loss
const chartData = [
  { month: "January", profit: 5000, loss: 2000 },
  { month: "February", profit: 6000, loss: 2500 },
  { month: "March", profit: 7000, loss: 3000 },
  { month: "April", profit: 4500, loss: 1800 },
  { month: "May", profit: 8000, loss: 4000 },
  { month: "June", profit: 7500, loss: 3500 },
];

const chartConfig = {
  profit: {
    label: "Profit",
    color: "hsl(var(--chart-1))",
  },
  loss: {
    label: "Loss",
    color: "hsl(var(--chart-2))",
  },
};

export default function MonthlyProfitLoss() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Monthly Profit and Loss</CardTitle>
        <CardDescription>
          Showing monthly profit and loss for the last 6 months
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <YAxis
              tickFormatter={(value) => `$${value}`}
              tickLine={false}
              axisLine={false}
            />
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar
              dataKey="profit"
              stackId="a"
              fill="var(--color-profit)"
              radius={[0, 0, 4, 4]}
            />
            <Bar
              dataKey="loss"
              stackId="a"
              fill="var(--color-loss)"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Trending up by 10% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground"></div>
      </CardFooter>
    </Card>
  );
}
