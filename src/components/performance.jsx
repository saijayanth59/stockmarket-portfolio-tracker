"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { getAllOrders } from "@/utils/api";
import { finnhubClient } from "@/utils/stockapi";
import { socketUrl } from "@/utils/stockapi";

export default function PerformanceSummary() {
  const [isLoading, setIsLoading] = useState(false);
  const [trades, setTrades] = useState(null);
  let socket = null;
  useEffect(() => {
    function connectWebSocket(companies) {
      socket = new WebSocket(socketUrl);
      const symbolsToSubscribe = companies
        .filter((company) => company.status === "active")
        .map((company) => company.symbol);
      socket.addEventListener("open", function () {
        symbolsToSubscribe.forEach((symbol) => {
          socket.send(JSON.stringify({ type: "subscribe", symbol }));
        });
      });
      socket.addEventListener("message", function (event) {
        const data = JSON.parse(event.data);
        console.log("from socket", data);
        if (data.type === "trade") {
          const updatedPrice = data.data[0]?.p;
          const updatedSymbol = data.data[0]?.s;

          setTrades((prevStocks) =>
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
    const fetchOrders = async () => {
      try {
        setIsLoading(true);
        const orders = await getAllOrders();

        const updatedOrders = await Promise.all(
          orders.map(async (order) => {
            if (order.status === "active") {
              try {
                const stockData = await new Promise((resolve, reject) => {
                  finnhubClient.quote(order.symbol, (error, data) => {
                    if (error) {
                      reject(error);
                    } else {
                      resolve(data);
                    }
                  });
                });
                return {
                  ...order,
                  ltp: stockData.c,
                };
              } catch (error) {
                console.error(
                  `Error fetching data for symbol ${order.symbol}:`,
                  error
                );
                return order;
              }
            }
            return order;
          })
        );
        connectWebSocket(updatedOrders);
        setTrades(updatedOrders);
      } catch (err) {
        console.error("Error fetching orders:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();

    return () => {
      if (socket) {
        socket.close();
      }
    };
  }, []);

  function getBadgeVariant(status) {
    switch (status) {
      case "target achieved":
        return "default";
      case "exited":
        return "secondary";
      case "stoploss hit":
        return "destructive";
      default:
        return "outline";
    }
  }

  if (trades === null || isLoading) {
    return <LoadingSkeleton />;
  }

  const pastPL = trades.reduce((acc, trade) => {
    return trade.status !== "active"
      ? acc + (trade.exitPrice - trade.price) * trade.quantity
      : acc;
  }, 0);

  const positionsPL = trades.reduce((acc, trade) => {
    return trade.status === "active"
      ? acc + (trade.ltp - trade.price) * trade.quantity
      : acc;
  }, 0);
  console.log(trades);
  console.log(positionsPL, pastPL);

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">
          Performance Summary
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total P&L
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">
                ${(pastPL + positionsPL).toFixed(3)}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Past P&L
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">${pastPL.toFixed(2)}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Positions P&L
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">${positionsPL.toFixed(2)}</p>
            </CardContent>
          </Card>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">P&L</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {trades.map((trade, index) => (
              <TableRow key={trade._id}>
                <TableCell className="font-medium">{trade.name}</TableCell>
                <TableCell>{trade.quantity}</TableCell>
                <TableCell>{trade.type[0].toUpperCase()}</TableCell>
                <TableCell>
                  <Badge variant={getBadgeVariant(trade.status)}>
                    {trade.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <span
                    className={
                      ((trade.status == "active"
                        ? trade.ltp
                        : trade.exitPrice) -
                        trade.price) *
                        trade.quantity >=
                      0
                        ? "text-green-500"
                        : "text-red-500"
                    }
                  >
                    $
                    {(
                      ((trade.status == "active"
                        ? trade.ltp
                        : trade.exitPrice) -
                        trade.price) *
                      trade.quantity
                    ).toFixed(2)}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

function LoadingSkeleton() {
  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <Skeleton className="h-8 w-64" />
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {[1, 2, 3].map((i) => (
            <Card key={i}>
              <CardHeader className="pb-2">
                <Skeleton className="h-4 w-24" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-8 w-32" />
              </CardContent>
            </Card>
          ))}
        </div>

        <Skeleton className="h-80 w-full" />
      </CardContent>
    </Card>
  );
}
