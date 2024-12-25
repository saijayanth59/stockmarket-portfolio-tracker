"use client";

import React, { useEffect, useMemo, useState } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { finnhubClient } from "@/utils/stockapi";
import StockPriceAreaChart from "./dashboard/stock-area-chart";
import { Skeleton } from "./ui/skeleton";
import { getHistory } from "@/utils/api";

const socketUrl =
  "wss://ws.finnhub.io?token=cthoubpr01qm2t952970cthoubpr01qm2t95297g";

const top = ["GOOGL", "AAPL", "AMZN", "MSFT", "TSLA"];
const INITIAL = {
  GOOGL: {
    history: [],
  },
  AAPL: {
    history: [],
  },
  AMZN: {
    history: [],
  },
  MSFT: {
    history: [],
  },
  TSLA: {
    history: [],
  },
};

const TopIndexes = () => {
  const [activeChart, setActiveChart] = useState("GOOGL");
  const [data, setData] = useState([]);
  const [history, setHistory] = useState(INITIAL);
  const [isLoading, setIsLoading] = useState(false);
  let socket = null;
  // console.log(getHistory("AAPL"));
  useEffect(() => {
    function connectWebSocket() {
      socket = new WebSocket(socketUrl);
      const symbolsToSubscribe = top;
      socket.addEventListener("open", function () {
        symbolsToSubscribe.forEach((symbol) => {
          socket.send(JSON.stringify({ type: "subscribe", symbol }));
        });
      });

      socket.addEventListener("message", function (event) {
        const data = JSON.parse(event.data);
        console.log(data);
        if (data.type === "trade") {
          const updatedPrice = data.data[0]?.p;
          const updatedSymbol = data.data[0]?.s;

          setData((prevStocks) =>
            prevStocks.map((stock) =>
              stock.symbol === updatedSymbol
                ? {
                    ...stock,
                    ltp: updatedPrice,
                  }
                : stock
            )
          );
        }
      });

      return () => {};
    }

    async function fetchData() {
      try {
        setIsLoading(true);
        const updatedStocks = await Promise.all(
          top.map(async (stock) => {
            try {
              const data = await new Promise((resolve, reject) => {
                finnhubClient.quote(stock, (error, data) => {
                  if (error) return reject(error);
                  resolve(data);
                });
              });
              console.log("from", data);
              return { symbol: stock, ltp: data.c };
            } catch (error) {
              console.error(`Error fetching data for ${stock}:`, error);
            }
          })
        );
        setData(updatedStocks);
        connectWebSocket();
      } catch (err) {
        toast.error(err.message);
        console.log(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    async function fetchHistory() {
      try {
        for (const symbol of top) {
          const res = await getHistory(symbol);
          setHistory((prev) => ({
            ...prev,
            [symbol]: {
              history: res,
            },
          }));
        }
      } catch (error) {
        console.error("Error fetching historical data", error);
      }
    }

    fetchData();
    fetchHistory();

    return () => {
      if (socket) socket.close();
    };
  }, []);
  if (data.length == 0) {
    return <Skeleton className="w-full h-[300px]" />;
  }
  console.log("main", history);
  return (
    <Card>
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-2 px-6 py-5 sm:py-6">
          <CardTitle>Top Companies Performance</CardTitle>
          <CardDescription>Showing historical data</CardDescription>
        </div>
        <div className="flex">
          {data.map(({ symbol, ltp }) => {
            return (
              <button
                key={symbol}
                data-active={activeChart === symbol}
                className="flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
                onClick={() => setActiveChart(symbol)}
              >
                <span className="text-xs text-muted-foreground">{symbol}</span>
                <span className="text-lg font-bold leading-none sm:text-3xl">
                  {ltp}
                </span>
              </button>
            );
          })}
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <StockPriceAreaChart
          symbol={activeChart}
          data={history[activeChart].history}
          idx={top.indexOf(activeChart)}
        />
      </CardContent>
    </Card>
  );
};

export default TopIndexes;
