"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const mockData = {
  topGainers: [
    { symbol: "AAPL", price: 180.45 },
    { symbol: "TSLA", price: 250.32 },
    { symbol: "GOOGL", price: 135.67 },
  ],
  topLosers: [
    { symbol: "META", price: 305.12 },
    { symbol: "AMZN", price: 120.89 },
    { symbol: "NFLX", price: 400.34 },
  ],
};

export default function TopGainersAndLosers() {
  const { topGainers, topLosers } = mockData;

  const renderList = (data, title) => (
    <Card className="w-[300px]">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>Symbols and Prices</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {data.map((item, index) => (
            <li
              key={index}
              className="flex items-center justify-between text-sm"
            >
              <span className="font-medium">{item.symbol}</span>
              <span className="text-muted-foreground">${item.price}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );

  return (
    <div className="flex flex-col gap-1">
      {renderList(topGainers, "Top Gainers")}
      {renderList(topLosers, "Top Losers")}
    </div>
  );
}
