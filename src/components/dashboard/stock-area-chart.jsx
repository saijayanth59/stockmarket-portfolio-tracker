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

export default function StockPriceAreaChart({ symbol, data, idx }) {
  if (data.length == 0) {
    return <Skeleton className="w-full h-[200px]" />;
  }
  const stockDataArray = data.map((item) => ({
    date: item.Date,
    price: item.High,
  }));
  const minPrice = Math.min(...stockDataArray.map((data) => data.Low));
  const maxPrice = Math.max(...stockDataArray.map((data) => data.High));
  const yAxisDomain = [minPrice * 0.95, maxPrice * 1.05];

  return (
    <ChartContainer
      config={{
        price: {
          label: "Price",
          color: `hsl(var(--chart-${idx + 1}))`,
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
                stopColor={`hsl(var(--chart-${idx + 1}))`}
                stopOpacity={0.8}
              />
              <stop
                offset="95%"
                stopColor={`hsl(var(--chart-${idx + 1}))`}
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
            stroke={`hsl(var(--chart-${idx + 1}))`}
            fillOpacity={1}
            fill="url(#colorPrice)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
