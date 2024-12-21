"use client";

import { useEffect, useState } from "react";
import stockData from "../utils/us_stocks.json";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  X,
  Plus,
  Search,
  ArrowUpIcon,
  ArrowDownIcon,
  Loader2,
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { finnhubClient } from "@/utils/stockapi";
const socketUrl =
  "wss://ws.finnhub.io?token=cthoubpr01qm2t952970cthoubpr01qm2t95297g";

const INITIAL_DATA = [
  {
    symbol: "BINANCE:BTCUSDT",
    c: 0,
    d: 0,
    dp: 0,
    h: 0,
    l: 0,
    o: 0,
    pc: 0,
  },
];

export default function Watchlist() {
  const [watchlist, setWatchlist] = useState(INITIAL_DATA);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  let socket = null;

  useEffect(() => {
    function connectWebSocket() {
      socket = new WebSocket(socketUrl);

      socket.addEventListener("open", function () {
        socket.send(
          JSON.stringify({ type: "subscribe", symbol: "BINANCE:BTCUSDT" })
        );
      });

      socket.addEventListener("message", function (event) {
        const data = JSON.parse(event.data);

        if (data.type === "trade") {
          const updatedPrice = data.data[0]?.p;
          const updatedSymbol = data.data[0]?.s;

          setWatchlist((prevStocks) =>
            prevStocks.map((stock) =>
              stock.symbol === updatedSymbol
                ? {
                    ...stock,
                    c: updatedPrice,
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

    connectWebSocket();
  }, []);

  const addToWatchlist = async (stock) => {
    setIsAdding(true);
    // Simulate API call
    if (!watchlist.some((item) => item.symbol === stock.symbol)) {
      finnhubClient.quote(stock.symbol, (error, data, response) => {
        console.log("from", data);
        setWatchlist((prev) => [...prev, { ...data, ...stock }]);
        if (error) {
          console.log(error);
        }
      });
    }
    setSearchTerm("");
    setIsAdding(false);
  };

  const removeFromWatchlist = async (id) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500));
    setWatchlist(watchlist.filter((stock) => stock.id !== id));
  };

  const searchStocks = async (term) => {
    setIsSearching(true);
    setSearchTerm(term);
    await new Promise((resolve) => setTimeout(resolve, 500));
    setIsSearching(false);
  };

  const filteredStocks = stockData.filter(
    (stock) =>
      stock.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      stock.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Simulate initial data loading
  useState(() => {
    setTimeout(() => setIsLoading(false), 2000);
  });

  return (
    <Card className="w-full max-w-6xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Stock Watchlist</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex mb-4">
          <Input
            type="text"
            placeholder="Search stocks..."
            value={searchTerm}
            onChange={(e) => searchStocks(e.target.value)}
            className="flex-grow mr-2"
          />
          <Button variant="outline" className="px-3" disabled={isSearching}>
            {isSearching ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Search className="h-4 w-4" />
            )}
          </Button>
        </div>
        {searchTerm && (
          <Card className="mb-4">
            <CardContent className="p-2">
              {isSearching ? (
                <div className="space-y-2">
                  {[1, 2, 3].map((i) => (
                    <Skeleton key={i} className="h-10 w-full" />
                  ))}
                </div>
              ) : (
                <ul className="space-y-2">
                  {filteredStocks.map((stock) => (
                    <li
                      key={stock.id}
                      className="flex items-center justify-between p-2 bg-secondary rounded-md"
                    >
                      <span>
                        {stock.name} ({stock.symbol})
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => addToWatchlist(stock)}
                        disabled={isAdding}
                      >
                        {isAdding ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Plus className="h-4 w-4" />
                        )}
                      </Button>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
        )}
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Symbol</TableHead>
              <TableHead>Name</TableHead>
              <TableHead className="text-right">Current</TableHead>
              <TableHead className="text-right">Change</TableHead>
              <TableHead className="text-right">High</TableHead>
              <TableHead className="text-right">Low</TableHead>
              <TableHead className="text-right">Open</TableHead>
              <TableHead className="text-right">Prev Close</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading
              ? [1, 2, 3].map((i) => (
                  <TableRow key={i}>
                    <TableCell colSpan={9}>
                      <Skeleton className="h-12 w-full" />
                    </TableCell>
                  </TableRow>
                ))
              : watchlist.map((stock) => (
                  <TableRow key={stock.id}>
                    <TableCell className="font-medium">
                      {stock.symbol}
                    </TableCell>
                    <TableCell>{stock.name}</TableCell>
                    <TableCell className="text-right">
                      ${stock.c.toFixed(2)}
                    </TableCell>
                    <TableCell
                      className={`text-right ${
                        stock.d >= 0 ? "text-green-500" : "text-red-500"
                      }`}
                    >
                      {stock.d >= 0 ? (
                        <ArrowUpIcon className="inline h-4 w-4 mr-1" />
                      ) : (
                        <ArrowDownIcon className="inline h-4 w-4 mr-1" />
                      )}
                      ${Math.abs(stock.d).toFixed(2)} ({stock.dp.toFixed(2)}%)
                    </TableCell>
                    <TableCell className="text-right">
                      ${stock.h.toFixed(2)}
                    </TableCell>
                    <TableCell className="text-right">
                      ${stock.l.toFixed(2)}
                    </TableCell>
                    <TableCell className="text-right">
                      ${stock.o.toFixed(2)}
                    </TableCell>
                    <TableCell className="text-right">
                      ${stock.pc.toFixed(2)}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFromWatchlist(stock.id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
