"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ArrowUpIcon,
  ArrowDownIcon,
  EyeIcon,
  PencilIcon,
  DoorClosed,
} from "lucide-react";
import { EditOrderDialog } from "../components/edit-order-dialog";
import { ConfirmationDialog } from "./confirmation-dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { finnhubClient } from "@/utils/stockapi";

const totalPortfolio = 100000;

const companies = [
  {
    symbol: "BINANCE:BTCUSDT",
    quantity: 1,
    purchasedPrice: 1000,
    ltp: 1000,
    orderType: "buy",
    orderValidity: "day",
  },
  {
    symbol: "TSLA",
    quantity: 1,
    purchasedPrice: 50,
    ltp: 1000,
    orderType: "buy",
    orderValidity: "day",
  },
  {
    symbol: "GOOGL",
    quantity: 1,
    purchasedPrice: 50,
    ltp: 1000,
    orderType: "buy",
    orderValidity: "day",
  },
  {
    symbol: "INFY",
    quantity: -1,
    purchasedPrice: 50,
    ltp: 70,
    orderType: "sell",
    orderValidity: "day",
  },
  {
    symbol: "AAPL",
    quantity: -1,
    purchasedPrice: 50,
    ltp: 70,
    orderType: "sell",
    orderValidity: "day",
  },
];

const socketUrl =
  "wss://ws.finnhub.io?token=cthoubpr01qm2t952970cthoubpr01qm2t95297g";

export default function Positions() {
  const [expandedCard, setExpandedCard] = useState(null);
  const [editOrderDialogOpen, setEditOrderDialogOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orderToExit, setOrderToExit] = useState(null);
  const [confirmationDialogOpen, setConfirmationDialogOpen] = useState(false);
  const [stocks, setStocks] = useState([...companies]);
  const [isLoading, setIsLoading] = useState(true);

  const investedMargin = Math.abs(
    stocks.reduce((acc, stock) => {
      return acc + stock.purchasedPrice * stock.quantity;
    }, 0)
  );

  const updatedStocks = stocks.map((stock) => {
    const currentProfit = (stock.ltp - stock.purchasedPrice) * stock.quantity;
    const currentProfitPercentage =
      (currentProfit / stock.purchasedPrice) * 100;
    return {
      ...stock,
      currentProfit,
      currentProfitPercentage,
    };
  });

  const positionsPL = updatedStocks.reduce((acc, stock) => {
    return acc + stock.currentProfit;
  }, 0);

  const currentProtofolio = totalPortfolio + positionsPL;
  const availableMargin = totalPortfolio - investedMargin;

  let socket = null;

  useEffect(() => {
    setIsLoading(true);
    function connectWebSocket() {
      socket = new WebSocket(socketUrl);

      socket.addEventListener("open", function () {
        socket.send(
          JSON.stringify({ type: "subscribe", symbol: "BINANCE:BTCUSDT" })
        );
        socket.send(JSON.stringify({ type: "subscribe", symbol: "TSLA" }));
        socket.send(JSON.stringify({ type: "subscribe", symbol: "GOOGL" }));
        socket.send(JSON.stringify({ type: "subscribe", symbol: "INFY" }));
        socket.send(JSON.stringify({ type: "subscribe", symbol: "AAPL" }));
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
                    ltp: updatedPrice,
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
    const timer = setTimeout(() => setIsLoading(false), 2000); // Simulate loading for 2 seconds
    return () => clearTimeout(timer);
  }, []);

  const handleOpenEditOrderDialog = (company) => {
    setSelectedOrder({
      symbol: company.symbol,
      type: company.orderType,
      quantity: Math.abs(company.quantity),
      price: company.purchasedPrice,
      validity: company.orderValidity,
    });
    setEditOrderDialogOpen(true);
  };

  const handleExitOrder = (company) => {
    setOrderToExit(company);
    setConfirmationDialogOpen(true);
  };

  const confirmExit = () => {
    console.log("Exiting order:", orderToExit);
    setConfirmationDialogOpen(false);
  };

  return (
    <div className="container mx-auto py-6 px-12">
      <h1 className="text-4xl font-bold text-center mb-8">Positions</h1>

      {isLoading ? (
        <LoadingSkeleton />
      ) : (
        <>
          <Card className="mb-8">
            <CardContent>
              <div className="flex justify-between m-4">
                <div>
                  <p className="text-2xl font-semibold">
                    ₹{currentProtofolio.toFixed(2)}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Total Portfolio
                  </p>
                </div>
                <div>
                  <p
                    className={`text-2xl font-semibold ${
                      positionsPL >= 0 ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {positionsPL >= 0 ? "+" : ""}₹{positionsPL.toFixed(2)}
                  </p>
                  <p className="text-sm text-muted-foreground">Positions P&L</p>
                </div>
              </div>
              <div className="flex flex-row justify-around items-center gap-4 bg-muted p-4 rounded-lg">
                <div>
                  <p className="text-sm text-muted-foreground">
                    Available Margin
                  </p>
                  <p className="text-lg font-medium">
                    ₹{availableMargin.toFixed(2)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">
                    Invested Margin
                  </p>
                  <p className="text-lg font-medium">
                    ₹{investedMargin.toFixed(2)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-4">
            {updatedStocks.map((company, index) => (
              <Card
                key={index}
                className={
                  expandedCard === company.symbol ? "border-primary" : ""
                }
              >
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <CardTitle>{company.symbol}</CardTitle>
                    <span
                      className={`text-lg font-semibold ${
                        company.currentProfit >= 0
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      {company.currentProfit >= 0 ? "+" : ""}₹
                      {company.currentProfit.toFixed(2)}
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between text-sm text-muted-foreground mb-2">
                    <span>
                      {Math.abs(company.quantity)} Qty (
                      {company.quantity > 0 ? "buy" : "sell"})
                    </span>
                    <span
                      className={
                        company.currentProfit >= 0
                          ? "text-green-500"
                          : "text-red-500"
                      }
                    >
                      ({company.currentProfitPercentage >= 0 ? "+" : ""}
                      {company.currentProfitPercentage.toFixed(2)}%)
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>price: ₹{company.purchasedPrice.toFixed(2)}</span>
                    <span>LTP: ₹{company.ltp.toFixed(2)}</span>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between pt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setExpandedCard(
                        expandedCard === company.symbol ? null : company.symbol
                      )
                    }
                  >
                    {expandedCard === company.symbol
                      ? "Hide Details"
                      : "View Details"}
                    <EyeIcon className="w-4 h-4 ml-2" />
                  </Button>
                  <div className="flex flex-row gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleExitOrder(company)}
                      className="text-red-500"
                    >
                      Exit
                      <DoorClosed className="w-4 h-4 ml-2" />
                    </Button>{" "}
                    <Button
                      variant="default"
                      size="sm"
                      onClick={() => handleOpenEditOrderDialog(company)}
                    >
                      Edit
                      <PencilIcon className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </CardFooter>
                {expandedCard === company.symbol && (
                  <CardContent className="pt-2 border-t">
                    <p className="text-sm text-muted-foreground mb-2">
                      Additional Details:
                    </p>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        Day Change:{" "}
                        <span
                          className={
                            company.currentProfit >= 0
                              ? "text-green-500"
                              : "text-red-500"
                          }
                        >
                          {company.currentProfit >= 0 ? (
                            <ArrowUpIcon className="inline w-4 h-4" />
                          ) : (
                            <ArrowDownIcon className="inline w-4 h-4" />
                          )}
                          ₹{Math.abs(company.currentProfit).toFixed(2)}
                        </span>
                      </div>
                      <div>
                        Day Change %:{" "}
                        <span
                          className={
                            company.currentProfit >= 0
                              ? "text-green-500"
                              : "text-red-500"
                          }
                        >
                          {company.currentProfit >= 0 ? (
                            <ArrowUpIcon className="inline w-4 h-4" />
                          ) : (
                            <ArrowDownIcon className="inline w-4 h-4" />
                          )}
                          {Math.abs(company.currentProfit).toFixed(2)}%
                        </span>
                      </div>
                      <div>Order Type: {company.orderType}</div>
                      <div>Validity: {company.orderValidity}</div>
                    </div>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
        </>
      )}

      {selectedOrder && (
        <EditOrderDialog
          isOpen={editOrderDialogOpen}
          onClose={() => setEditOrderDialogOpen(false)}
          order={selectedOrder}
        />
      )}

      {orderToExit && (
        <ConfirmationDialog
          isOpen={confirmationDialogOpen}
          onClose={() => setConfirmationDialogOpen(false)}
          onConfirm={confirmExit}
          title="Confirm Exit"
          message={`Are you sure you want to exit the position for ${orderToExit.symbol}?`}
        />
      )}
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <>
      <Skeleton className="w-full h-32 mb-8" />
      {[1, 2, 3, 4, 5].map((i) => (
        <Skeleton key={i} className="w-full h-24 mb-4" />
      ))}
    </>
  );
}
