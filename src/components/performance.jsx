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

export default function PerformanceSummary() {
  const [isLoading, setIsLoading] = useState(false);
  const [trades, setTrades] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setIsLoading(true);
        const res = await getAllOrders();
        setTrades(res);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
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
      ? acc + (trade.price - trade.exitPrice) * trade.quantity
      : acc;
  }, 0);

  const positionsPL = trades.reduce((acc, trade) => {
    return trade.status === "active"
      ? acc + (trade.price - trade.prevClose) * trade.quantity
      : acc;
  }, 0);

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
                      (trade.price -
                        (trade.status == "active"
                          ? trade.prevClose
                          : trade.exitPrice)) *
                        trade.quantity >=
                      0
                        ? "text-green-500"
                        : "text-red-500"
                    }
                  >
                    $
                    {(
                      (trade.price -
                        (trade.status == "active"
                          ? trade.prevClose
                          : trade.exitPrice)) *
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
