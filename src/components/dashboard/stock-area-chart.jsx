"use client";

import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import { useState } from "react";
import { Skeleton } from "../ui/skeleton";

// Extended dummy data
const stockDataArray = [
  { date: "1999-12-31", price: 102.81 },
  { date: "2000-01-03", price: 115.5 },
  { date: "2000-01-10", price: 120.5 },
  { date: "2000-01-17", price: 124.0 },
  { date: "2000-01-24", price: 128.75 },
  { date: "2000-01-31", price: 134.25 },
  { date: "2000-02-07", price: 138.5 },
  { date: "2000-02-14", price: 144.0 },
  { date: "2000-02-21", price: 148.25 },
  { date: "2000-02-28", price: 153.75 },
];

export default function StockPriceAreaChart({ symbol, data }) {
  if (data.length == 0) {
    return <Skeleton className="w-full h-[200px]" />;
  }
  console.log(data);
  const minPrice = Math.min(...stockDataArray.map((data) => data.price));
  const maxPrice = Math.max(...stockDataArray.map((data) => data.price));
  const yAxisDomain = [minPrice * 0.95, maxPrice * 1.05]; // Add 5% padding to top and bottom
  console.log(symbol);

  return (
    <ChartContainer
      config={{
        price: {
          label: "Price",
          color: "hsl(var(--chart-1))",
        },
      }}
      className="aspect-auto h-[250px] w-full"
    >
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={stockDataArray}
          margin={{ top: 10, right: 30, left: 0, bottom: 20 }}
        >
          <defs>
            <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="5%"
                stopColor="hsl(var(--chart-1))"
                stopOpacity={0.8}
              />
              <stop
                offset="95%"
                stopColor="hsl(var(--chart-1))"
                stopOpacity={0}
              />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="date"
            tickFormatter={(value) =>
              new Date(value).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })
            }
            dy={10}
          />
          <YAxis domain={yAxisDomain} hide={true} />
          <ChartTooltip
            content={({ active, payload, label }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="rounded-lg border bg-background p-2 shadow-sm">
                    <div className="grid grid-cols-2 gap-2">
                      <div className="flex flex-col">
                        <span className="text-[0.70rem] uppercase text-muted-foreground">
                          Date
                        </span>
                        <span className="font-bold text-muted-foreground">
                          {new Date(label).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[0.70rem] uppercase text-muted-foreground">
                          Price
                        </span>
                        <span className="font-bold">
                          ${payload[0].value.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              }
              return null;
            }}
          />
          <Area
            type="monotone"
            dataKey="price"
            stroke="hsl(var(--chart-1))"
            fillOpacity={1}
            fill="url(#colorPrice)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
