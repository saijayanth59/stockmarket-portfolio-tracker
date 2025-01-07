"use client";

import { useState, useEffect } from "react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { getOrders } from "@/utils/api";
import { Skeleton } from "@/components/ui/skeleton";

export default function AreaChartPortfolio() {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getOrders();
        const processedData = processPortfolioData(data);

        setChartData(processedData.chartData);
      } catch (error) {
        console.error("Error fetching portfolio data:", error);
      }
    };

    fetchData();
  }, []);

  const processPortfolioData = (data) => {
    // Parse orders and calculate portfolio value for each order
    const orders = data.map((item) => ({
      date: new Date(item.createdAt).toISOString().split("T")[0],
      value: 100000 - Math.abs(item.price * item.quantity),
    }));

    // Get the range of dates
    const startDate = new Date(
      Math.min(...orders.map((o) => new Date(o.date)))
    );
    const endDate = new Date();
    const dateRange = generateDateRange(startDate, endDate);

    // Fill gaps in the date range
    const chartData = [];
    let lastValue = 0;

    dateRange.forEach((date) => {
      const order = orders.find((o) => o.date === date);
      if (order) {
        lastValue = order.value;
      }
      chartData.push({ day: formatDate(date), portfolio: lastValue });
    });

    return { chartData };
  };

  const generateDateRange = (start, end) => {
    const dates = [];
    let currentDate = new Date(start);

    while (currentDate <= end) {
      dates.push(currentDate.toISOString().split("T")[0]); // Format as YYYY-MM-DD
      currentDate.setDate(currentDate.getDate() + 1); // Increment day
    }

    return dates;
  };

  const formatDate = (date) => {
    const d = new Date(date);
    return d.toLocaleDateString("default", { day: "numeric", month: "short" });
  };

  const chartConfig = {
    portfolio: {
      label: "Portfolio Value",
      color: "hsl(var(--chart-1))",
    },
  };
  if (chartData === null) {
    return <Skeleton className="h-[400px]" />;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Portfolio Performance</CardTitle>
        <CardDescription>
          Tracking portfolio value after each transaction.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {chartData.length == 0 ? (
          <div className="flex justify-center items-center">
            No transactions
          </div>
        ) : (
          <ChartContainer config={chartConfig}>
            <AreaChart
              accessibilityLayer
              data={chartData}
              margin={{
                left: 12,
                right: 12,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="day"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `$${value}`}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="line" />}
              />
              <Area
                dataKey="portfolio"
                type="natural"
                fill="var(--color-portfolio)"
                fillOpacity={0.4}
                stroke="var(--color-portfolio)"
              />
            </AreaChart>
          </ChartContainer>
        )}
      </CardContent>
      <CardFooter className="flex-col items-center gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Starting Portfolio Value: 100000
        </div>
        <div className="leading-none text-muted-foreground"></div>
      </CardFooter>
    </Card>
  );
}
