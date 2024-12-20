"use client";

import { useState } from "react";
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
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function PerformanceSummary() {
  const [pastPL, setPastPL] = useState(68015.0);
  const [positionsPL, setPositionsPL] = useState(1550.0);
  const [totalPL, setTotalPL] = useState(69565.0);
  const [totalPLPercent, setTotalPLPercent] = useState(6.96);

  const trades = [
    {
      name: "NTPC",
      qty: 100,
      type: "S",
      status: "Target Achieved",
      pl: 1005.0,
      plPercent: 2.36,
    },
    {
      name: "NIFTY 11JUL24 24000 CE",
      qty: 2500,
      type: "B",
      status: "Exited",
      pl: 71750.0,
      plPercent: 7.36,
    },
    {
      name: "SBILIFE",
      qty: 100,
      type: "S",
      status: "Validity Over",
      pl: -410.0,
      plPercent: -0.28,
    },
    {
      name: "BHARTIARTL",
      qty: 100,
      type: "S",
      status: "Stoploss Hit",
      pl: -2895.0,
      plPercent: -2.03,
    },
    {
      name: "TECHM",
      qty: 100,
      type: "S",
      status: "Stoploss Hit",
      pl: -1435.0,
      plPercent: -2.03,
    },
  ];

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
                ₹{totalPL.toFixed(2)}
                <span
                  className={`text-sm ml-1 ${
                    totalPLPercent >= 0 ? "text-green-500" : "text-red-500"
                  }`}
                >
                  ({totalPLPercent.toFixed(2)}%)
                </span>
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
              <p className="text-2xl font-bold">₹{pastPL.toFixed(2)}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Positions P&L
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">₹{positionsPL.toFixed(2)}</p>
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
              <TableRow key={index}>
                <TableCell className="font-medium">{trade.name}</TableCell>
                <TableCell>{trade.qty}</TableCell>
                <TableCell>{trade.type}</TableCell>
                <TableCell>
                  <Badge variant={getBadgeVariant(trade.status)}>
                    {trade.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <span
                    className={
                      trade.pl >= 0 ? "text-green-500" : "text-red-500"
                    }
                  >
                    ₹{trade.pl.toFixed(2)} ({trade.plPercent.toFixed(2)}%)
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

function getBadgeVariant(status) {
  switch (status) {
    case "Target Achieved":
      return "default";
    case "Exited":
      return "secondary";
    case "Stoploss Hit":
      return "destructive";
    default:
      return "outline";
  }
}
