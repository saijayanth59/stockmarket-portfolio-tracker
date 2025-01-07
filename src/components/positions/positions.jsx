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
import { EditOrderDialog } from "@/components/positions/edit-order-dialog";
import { ConfirmationDialog } from "@/components/confirmation-dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { getOrders, updateOrder } from "@/utils/api";
import toast from "react-hot-toast";
import { finnhubClient } from "@/utils/stockapi";
import { useAuth } from "@/context/AuthContext";

import { socketUrl } from "@/utils/stockapi";

export default function Positions() {
  const [expandedCard, setExpandedCard] = useState(null);
  const [editOrderDialogOpen, setEditOrderDialogOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orderToExit, setOrderToExit] = useState(null);
  const [confirmationDialogOpen, setConfirmationDialogOpen] = useState(false);
  const [stocks, setStocks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [exiting, setExiting] = useState(false);
  const { user } = useAuth();
  console.log(stocks);
  const investedMargin = Math.abs(
    stocks.reduce((acc, stock) => {
      return acc + stock.price * stock.quantity;
    }, 0)
  );

  const updatedStocks = stocks.map((stock) => {
    const ltp = stock.ltp ? stock.ltp : stock.price;
    const currentProfit = (ltp - stock.price) * stock.quantity;
    const currentProfitPercentage = (currentProfit / stock.price) * 100;

    return {
      ...stock,
      currentProfit,
      currentProfitPercentage,
      ltp,
    };
  });

  const positionsPL = updatedStocks.reduce((acc, stock) => {
    return acc + stock.currentProfit;
  }, 0);

  const currentProtofolio = user.portfolioValue + positionsPL;
  const availableMargin = user.portfolioValue - investedMargin;

  let socket = null;

  useEffect(() => {
    function connectWebSocket(companies) {
      socket = new WebSocket(socketUrl);
      const symbolsToSubscribe = companies.map((company) => company.symbol);
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

      return () => {};
    }

    async function fetchOrders() {
      try {
        setIsLoading(true);
        const res = await getOrders();
        await res.forEach((stock) => {
          finnhubClient.quote(stock.symbol, (error, data, response) => {
            console.log("from", data);
            setStocks((prev) => {
              const idx = prev.findIndex(
                (item) => item.symbol === stock.symbol
              );
              if (idx != -1) {
                return prev;
              }
              return [...prev, { ...stock, ...{ ltp: data.c } }];
            });
            if (error) {
              console.log(error);
            }
          });
        });
        connectWebSocket(res);
      } catch (err) {
        toast.error(err.message);
        console.log(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchOrders();

    return () => {
      if (socket) socket.close();
    };
  }, []);

  const handleOpenEditOrderDialog = (company) => {
    setSelectedOrder({
      id: company._id,
      symbol: company.symbol,
      type: company.type,
      quantity: Math.abs(company.quantity),
      price: company.price,
      validity: company.timeframe,
    });
    setEditOrderDialogOpen(true);
  };

  const handleExitOrder = (company) => {
    setOrderToExit(company);
    setConfirmationDialogOpen(true);
  };

  const confirmExit = async () => {
    try {
      setExiting(true);
      const res = await updateOrder(orderToExit._id, {
        exitPrice: orderToExit.ltp,
        status: "exited",
      });
      console.log(res);
      setStocks((prev) => {
        const updatedStocks = prev.filter(
          (stock) => stock.symbol !== res.symbol
        );
        return updatedStocks;
      });
      toast.success("Order Exited");
      setConfirmationDialogOpen(false);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setExiting(false);
    }
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
              <div className="flex justify-between m-4 m gap-2">
                <div>
                  <p className="text-xl md:text-2xl font-semibold">
                    ₹{currentProtofolio.toFixed(2)}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Total Portfolio
                  </p>
                </div>
                <div>
                  <p
                    className={`text-xl md:text-2xl font-semibold ${
                      positionsPL >= 0 ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    ₹{positionsPL.toFixed(5)}
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
                      {company.currentProfit.toFixed(5)}
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
                    <span>price: ₹{company.price.toFixed(2)}</span>
                    <span>LTP: ₹{company.ltp.toFixed(2)}</span>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between pt-2">
                  <Button
                    className="mr-1"
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
                        Profit Percent Change %:{" "}
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
                          {Math.abs(company.currentProfitPercentage).toFixed(2)}
                          %
                        </span>
                      </div>
                      <div>Order Type: {company.type}</div>
                      <div>Validity: {company.timeframe}</div>
                      <div>Target: {company.target}</div>
                      <div>Stopless: {company.stoploss}</div>
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
          setStocks={setStocks}
        />
      )}

      {orderToExit && (
        <ConfirmationDialog
          isOpen={confirmationDialogOpen}
          onClose={() => setConfirmationDialogOpen(false)}
          onConfirm={confirmExit}
          title="Confirm Exit"
          message={`Are you sure you want to exit the position for ${orderToExit.symbol}?`}
          submitting={exiting}
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
