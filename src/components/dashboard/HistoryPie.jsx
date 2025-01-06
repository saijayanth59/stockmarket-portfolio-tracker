"use client";

import * as React from "react";
import { TrendingUp } from "lucide-react";
import { Label, Pie, PieChart } from "recharts";

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
import { getAllOrders } from "@/utils/api";
import { Skeleton } from "../ui/skeleton";

const chartConfig = {
  buy: {
    label: "Buy",
    color: "hsl(var(--chart-1))",
  },
  sell: {
    label: "Sell",
    color: "hsl(var(--chart-2))",
  },
};

export default function HistoryPie() {
  const [orders, setOrders] = React.useState(null);

  React.useEffect(() => {
    async function fetchOrders() {
      try {
        const orders = await getAllOrders();
        setOrders(orders);
      } catch (error) {
        console.error("Error fetching orders:", error.message);
      }
    }
    fetchOrders();
  }, []);

  if (orders === null) {
    return <Skeleton className="h-[400px]" />;
  }
  console.log("from history orders", orders);

  const buyCount = orders?.filter((order) => order.type === "buy").length;
  const sellCount = orders?.filter((order) => order.type === "sell").length;
  const chartData = [
    { type: "buy", count: buyCount, fill: "var(--color-buy)" },
    { type: "sell", count: sellCount, fill: "var(--color-sell)" },
  ];
  const totalTransactions = orders?.length;

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Pie Chart - Transactions</CardTitle>
        <CardDescription>Last 6 months</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        {orders.length == 0 ? (
          <div className="flex justify-center items-center mt-7">
            No transactions
          </div>
        ) : (
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square max-h-[250px]"
          >
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie
                data={chartData}
                dataKey="count"
                nameKey="type"
                innerRadius={60}
                strokeWidth={5}
              >
                <Label
                  content={({ viewBox }) => {
                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                      return (
                        <text
                          x={viewBox.cx}
                          y={viewBox.cy}
                          textAnchor="middle"
                          dominantBaseline="middle"
                        >
                          <tspan
                            x={viewBox.cx}
                            y={viewBox.cy}
                            className="fill-foreground text-3xl font-bold"
                          >
                            {totalTransactions.toLocaleString()}
                          </tspan>
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 24}
                            className="fill-muted-foreground"
                          >
                            Transactions
                          </tspan>
                        </text>
                      );
                    }
                  }}
                />
              </Pie>
            </PieChart>
          </ChartContainer>
        )}
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Total Transactions : {totalTransactions}
        </div>
      </CardFooter>
    </Card>
  );
}
