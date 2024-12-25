"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  XAxis,
  Area,
  AreaChart,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { fetchMonthlyAdjustedData } from "@/utils/stockapi";

const chartData = [
  {
    date: "2024-04-01",
    sp500: 4220,
    nasdaq: 13200,
    dowjones: 34200,
    russell2000: 1950,
    ftse100: 7700,
    nikkei225: 32800,
  },
  {
    date: "2024-04-02",
    sp500: 4250,
    nasdaq: 13250,
    dowjones: 34400,
    russell2000: 1970,
    ftse100: 7720,
    nikkei225: 32900,
  },
  {
    date: "2024-04-03",
    sp500: 4280,
    nasdaq: 13300,
    dowjones: 34500,
    russell2000: 1980,
    ftse100: 7730,
    nikkei225: 33000,
  },
  {
    date: "2024-04-04",
    sp500: 4300,
    nasdaq: 13400,
    dowjones: 34700,
    russell2000: 2000,
    ftse100: 7750,
    nikkei225: 33100,
  },
  {
    date: "2024-04-05",
    sp500: 4320,
    nasdaq: 13450,
    dowjones: 34800,
    russell2000: 2010,
    ftse100: 7760,
    nikkei225: 33200,
  },
  {
    date: "2024-04-06",
    sp500: 4350,
    nasdaq: 13500,
    dowjones: 34950,
    russell2000: 2030,
    ftse100: 7780,
    nikkei225: 33300,
  },
  {
    date: "2024-04-07",
    sp500: 4380,
    nasdaq: 13550,
    dowjones: 35000,
    russell2000: 2040,
    ftse100: 7790,
    nikkei225: 33400,
  },
  {
    date: "2024-04-08",
    sp500: 4400,
    nasdaq: 13600,
    dowjones: 35200,
    russell2000: 2050,
    ftse100: 7800,
    nikkei225: 33500,
  },
  {
    date: "2024-04-09",
    sp500: 4420,
    nasdaq: 13700,
    dowjones: 35300,
    russell2000: 2060,
    ftse100: 7820,
    nikkei225: 33600,
  },
  {
    date: "2024-04-10",
    sp500: 4450,
    nasdaq: 13750,
    dowjones: 35500,
    russell2000: 2080,
    ftse100: 7830,
    nikkei225: 33700,
  },
  {
    date: "2024-04-11",
    sp500: 4470,
    nasdaq: 13800,
    dowjones: 35600,
    russell2000: 2090,
    ftse100: 7850,
    nikkei225: 33800,
  },
  {
    date: "2024-04-12",
    sp500: 4500,
    nasdaq: 13850,
    dowjones: 35800,
    russell2000: 2110,
    ftse100: 7860,
    nikkei225: 33900,
  },
  {
    date: "2024-04-13",
    sp500: 4520,
    nasdaq: 13900,
    dowjones: 35950,
    russell2000: 2120,
    ftse100: 7880,
    nikkei225: 34000,
  },
  {
    date: "2024-04-14",
    sp500: 4550,
    nasdaq: 14000,
    dowjones: 36100,
    russell2000: 2140,
    ftse100: 7890,
    nikkei225: 34100,
  },
  {
    date: "2024-04-15",
    sp500: 4570,
    nasdaq: 14050,
    dowjones: 36250,
    russell2000: 2150,
    ftse100: 7900,
    nikkei225: 34200,
  },
  {
    date: "2024-04-16",
    sp500: 4600,
    nasdaq: 14100,
    dowjones: 36400,
    russell2000: 2170,
    ftse100: 7920,
    nikkei225: 34300,
  },
  {
    date: "2024-04-17",
    sp500: 4630,
    nasdaq: 14200,
    dowjones: 36550,
    russell2000: 2180,
    ftse100: 7930,
    nikkei225: 34400,
  },
  {
    date: "2024-04-18",
    sp500: 4650,
    nasdaq: 14250,
    dowjones: 36700,
    russell2000: 2190,
    ftse100: 7950,
    nikkei225: 34500,
  },
  {
    date: "2024-04-19",
    sp500: 4680,
    nasdaq: 14300,
    dowjones: 36850,
    russell2000: 2210,
    ftse100: 7960,
    nikkei225: 34600,
  },
  {
    date: "2024-04-20",
    sp500: 4700,
    nasdaq: 14350,
    dowjones: 37000,
    russell2000: 2220,
    ftse100: 7980,
    nikkei225: 34700,
  },
];

const chartConfig = {
  views: {
    label: "Price",
  },
  sp500: {
    label: "sp500",
    color: "hsl(var(--chart-1))",
  },
  nasdaq: {
    label: "Nasdaq",
    color: "hsl(var(--chart-2))",
  },
  dowjones: {
    label: "Dow Jones",
    color: "hsl(var(--chart-3))",
  },
  russell2000: {
    label: "Russell 2000",
    color: "hsl(var(--chart-4))",
  },
  ftse100: {
    label: "FTSE 100",
    color: "hsl(var(--chart-5))",
  },
  nikkei225: {
    label: "Nikkei 225",
    color: "hsl(var(--chart-6))",
  },
};

const companies = [
  {
    symbol: "sp500",
    price: 4220,
  },
  {
    symbol: "nasdaq",
    price: 13200,
  },
  {
    symbol: "dowjones",
    price: 34200,
  },
  {
    symbol: "russell2000",
    price: 1950,
  },
  {
    symbol: "ftse100",
    price: 7700,
  },
  {
    symbol: "nikkei225",
    price: 32800,
  },
];

const socketUrl =
  "wss://ws.finnhub.io?token=cthoubpr01qm2t952970cthoubpr01qm2t95297g";

const TopIndexes = () => {
  const [activeChart, setActiveChart] = useState("sp500");
  const [stocks, setStocks] = useState([...companies]);

  let socket = null;

  // console.log(fetchMonthlyAdjustedData("AAPL"));

  useEffect(() => {
    function connectWebSocket() {
      socket = new WebSocket(socketUrl);

      socket.addEventListener("open", function () {
        companies.forEach((company) => {
          socket.send(
            JSON.stringify({
              type: "subscribe",
              symbol: company.symbol,
            })
          );
        });
      });

      socket.addEventListener("message", function (event) {
        const data = JSON.parse(event.data);

        if (data.type === "trade") {
          const updatedPrice = data.data[0]?.p;
          const updatedSymbol = data.data[0]?.s;

          setStocks((prevStocks) =>
            prevStocks.map((stock) =>
              stock.symbol === updatedSymbol
                ? {
                    ...stock,
                    price: updatedPrice,
                  }
                : stock
            )
          );
        }
      });

      return () => {
        if (socket) socket.close();
      };
    }

    // connectWebSocket();
  }, []);

  console.log(stocks);

  return (
    <Card>
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-2 px-6 py-5 sm:py-6">
          <CardTitle>Top Companies Performance</CardTitle>
          <CardDescription>Showing historical data</CardDescription>
        </div>
        <div className="flex">
          {["sp500", "nasdaq", "dowjones", "russell2000", "ftse100"].map(
            (key) => {
              const chart = key;
              return (
                <button
                  key={chart}
                  data-active={activeChart === chart}
                  className="flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
                  onClick={() => setActiveChart(chart)}
                >
                  <span className="text-xs text-muted-foreground">
                    {chartConfig[chart].label}
                  </span>
                  <span className="text-lg font-bold leading-none sm:text-3xl">
                    {stocks.find((stock) => stock.symbol === chart).price}
                  </span>
                </button>
              );
            }
          )}
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
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
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey="views"
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    });
                  }}
                />
              }
            />
            <Area
              dataKey={activeChart}
              type="monotone"
              stroke={`var(--color-${activeChart})`}
              fill={`var(--color-${activeChart})`}
              fillOpacity={0.3}
              strokeWidth={2}
              dot={false}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default TopIndexes;
