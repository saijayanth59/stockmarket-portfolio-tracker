"use client";

import { useState } from "react";
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

// Mock data
const totalPortfolio = 100000;
const positionsPL = 5000;
const availableMargin = 50000;
const investedMargin = 50000;

const companies = [
  {
    symbol: "AAPL",
    currentProfit: 1000,
    quantity: 10,
    profitPercentage: 2.5,
    avgPrice: 150,
    ltp: 153.75,
    orderType: "buy",
    orderValidity: "day",
  },
  {
    symbol: "GOOGL",
    currentProfit: -500,
    quantity: -5,
    profitPercentage: -1.2,
    avgPrice: 2800,
    ltp: 2766.4,
    orderType: "sell",
    orderValidity: "gtc",
  },
  {
    symbol: "MSFT",
    currentProfit: 750,
    quantity: 15,
    profitPercentage: 1.8,
    avgPrice: 300,
    ltp: 305.4,
    orderType: "buy",
    orderValidity: "ioc",
  },
];

export default function Positions() {
  const [expandedCard, setExpandedCard] = useState(null);
  const [editOrderDialogOpen, setEditOrderDialogOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orderToExit, setOrderToExit] = useState(null);
  const [confirmationDialogOpen, setConfirmationDialogOpen] = useState(false);

  const handleOpenEditOrderDialog = (company) => {
    setSelectedOrder({
      symbol: company.symbol,
      type: company.orderType,
      quantity: Math.abs(company.quantity),
      price: company.avgPrice,
      validity: company.orderValidity,
    });
    setEditOrderDialogOpen(true);
  };

  const handleExitOrder = (company) => {
    setOrderToExit(company);
    setConfirmationDialogOpen(true);
  };

  const confirmExit = () => {
    // Perform exit logic here
    console.log("Exiting order:", orderToExit);
    setConfirmationDialogOpen(false);
  };

  return (
    <div className="container mx-auto py-6 px-12">
      <h1 className="text-4xl font-bold text-center mb-8">Positions</h1>

      <Card className="mb-8">
        <CardContent>
          <div className="flex justify-between m-4">
            <div>
              <p className="text-2xl font-semibold">
                ₹{totalPortfolio.toFixed(2)}
              </p>
              <p className="text-sm text-muted-foreground">Total Portfolio</p>
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
              <p className="text-sm text-muted-foreground">Available Margin</p>
              <p className="text-lg font-medium">
                ₹{availableMargin.toFixed(2)}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Invested Margin</p>
              <p className="text-lg font-medium">
                ₹{investedMargin.toFixed(2)}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {companies.map((company, index) => (
          <Card
            key={index}
            className={expandedCard === company.symbol ? "border-primary" : ""}
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
                  {company.quantity > 0 ? "Buy" : "Sell"})
                </span>
                <span
                  className={
                    company.profitPercentage >= 0
                      ? "text-green-500"
                      : "text-red-500"
                  }
                >
                  ({company.profitPercentage >= 0 ? "+" : ""}
                  {company.profitPercentage.toFixed(2)}%)
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Avg: ₹{company.avgPrice.toFixed(2)}</span>
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
                        company.profitPercentage >= 0
                          ? "text-green-500"
                          : "text-red-500"
                      }
                    >
                      {company.profitPercentage >= 0 ? (
                        <ArrowUpIcon className="inline w-4 h-4" />
                      ) : (
                        <ArrowDownIcon className="inline w-4 h-4" />
                      )}
                      {Math.abs(company.profitPercentage).toFixed(2)}%
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
