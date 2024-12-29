"use client";
import stockData from "../utils/us_stocks.json";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, Loader2, Search } from "lucide-react";
import { format } from "date-fns";
import { finnhubClient } from "@/utils/stockapi";
import { Skeleton } from "./ui/skeleton";
import { checkMarketStatus } from "@/utils/functions";
import { createOrder } from "@/utils/api";
import toast from "react-hot-toast";
import SubmitButton from "./submit-button";

const today = new Date();
const tomorrow = new Date(today);
tomorrow.setDate(today.getDate() + 1);

const oneWeek = new Date(today);
oneWeek.setDate(today.getDate() + 7);

const oneMonth = new Date(today);
oneMonth.setMonth(today.getMonth() + 1);

const oneYear = new Date(today);
oneYear.setFullYear(today.getFullYear() + 1);

export default function PlaceOrderPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [orderType, setOrderType] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [entryPrice, setEntryPrice] = useState("");
  const [timeFrame, setTimeFrame] = useState("Tomorrow");
  const [stopLoss, setStopLoss] = useState("");
  const [target, setTarget] = useState("");
  const [isFetchingStock, setIsFetchingStock] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [isMarketClosed, setIsMarketClosed] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    setIsMarketClosed(checkMarketStatus());
  }, []);

  const searchStocks = async (term) => {
    setIsSearching(true);
    setSearchTerm(term);
    await new Promise((resolve) => setTimeout(resolve, 50));
    setIsSearching(false);
  };

  const handleStockSelect = async (stock) => {
    setIsFetchingStock(true);
    finnhubClient.quote(stock.symbol, (error, data) => {
      if (error) {
        console.error("Error fetching stock data:", error);
      } else {
        if (data.c === 0) {
          toast.error("Stock data not available");
          return;
        }
        setSelectedCompany({ ...data, ...stock });
      }
      setIsFetchingStock(false);
    });
    setSearchTerm("");
  };

  const filteredStocks = stockData.filter(
    (stock) =>
      stock.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      stock.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handlePlaceOrder = async () => {
    try {
      setSubmitting(true);
      const data = {
        type: orderType.toLowerCase(),
        quantity: orderType == "Buy" ? quantity : -quantity,
        price: entryPrice == "" ? selectedCompany.c : entryPrice,
        timeframe: timeFrame,
        stoploss: stopLoss,
        target,
        change: selectedCompany.d,
        percentageChange: selectedCompany.dp,
        prevClose: selectedCompany.pc,
        name: selectedCompany.name,
        symbol: selectedCompany.symbol,
      };

      await createOrder(data);
      router.push("/user/positions");
      toast.success("Order placed");
    } catch (err) {
      console.log(err.message);
      toast.error(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto py-6  max-w-2xl">
      <Button
        variant="ghost"
        onClick={() => router.push("/user/positions")}
        className="mb-4 ml-0 md:-ml-5"
      >
        <ArrowLeft className="h-4 w-4" /> Back to positions
      </Button>
      <h1 className="text-2xl font-bold mb-6 ml-5">Place Order</h1>
      <div className="space-y-6 m-5">
        <div className="relative">
          <Input
            value={searchTerm}
            onChange={(e) => searchStocks(e.target.value)}
            placeholder="Search for US stocks"
          />

          {searchTerm && (
            <>
              {isSearching ? (
                <div className="space-y-2">
                  {[1, 2, 3].map((i) => (
                    <Skeleton key={i} className="h-10 w-full" />
                  ))}
                </div>
              ) : (
                <ul className="absolute left-0 right-0 border border-gray-300 rounded-lg mt-2 bg-white max-h-40 overflow-y-auto z-10 shadow-lg">
                  {filteredStocks.map((company, index) => (
                    <li
                      key={index}
                      onClick={() => {
                        handleStockSelect(company);
                      }}
                      className="cursor-pointer px-4 py-2 bg-neutral-900"
                    >
                      {company.symbol} - {company.name}
                    </li>
                  ))}
                  {filteredStocks.length === 0 && (
                    <li className="px-4 py-2 text-gray-500">
                      No companies found
                    </li>
                  )}
                </ul>
              )}
            </>
          )}
        </div>
        {isMarketClosed && (
          <div className="bg-gray-100 p-4 rounded-lg text-sm text-gray-600">
            <p>⚠️ US Markets are closed. You're placing an AMO.</p>
            <p>Your order will execute once the market opens.</p>
          </div>
        )}

        {isFetchingStock ? (
          <Skeleton key={14} className="h-40 w-full" />
        ) : (
          selectedCompany && (
            <div className="p-4 rounded-lg bg-gray-100 dark:bg-gray-900 mt-4">
              <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">
                Selected Company
              </h2>
              <p className="text-gray-700 dark:text-gray-300">
                <span className="">Symbol:</span> {selectedCompany.symbol}
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                <span className="">Name:</span> {selectedCompany.name}
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                <span className="">Current Price:</span> ₹{selectedCompany.c}
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                <span className="">Percentage Change:</span>{" "}
                {selectedCompany.dp.toFixed(2)}%
              </p>
            </div>
          )
        )}

        <div className="flex justify-between gap-4">
          <Button
            onClick={() => setOrderType("Buy")}
            variant={orderType === "Buy" ? "default" : "outline"}
            className={`w-1/2 ${
              orderType === "Buy"
                ? "bg-green-500 hover:bg-green-600"
                : " text-green-500"
            }`}
          >
            Buy
          </Button>
          <Button
            onClick={() => setOrderType("Sell")}
            variant={orderType === "Sell" ? "default" : "outline"}
            className={`w-1/2 ${
              orderType === "Sell"
                ? "bg-red-500 hover:bg-red-600"
                : " text-red-500"
            }`}
          >
            Sell
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label
              htmlFor="quantity"
              className="block text-sm font-medium text-gray-700"
            >
              Quantity *
            </label>
            <Input
              id="quantity"
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <label
              htmlFor="entryPrice"
              className="block text-sm font-medium text-gray-700"
            >
              Entry Price (optional)
            </label>
            <Input
              id="entryPrice"
              type="number"
              value={entryPrice}
              onChange={(e) => setEntryPrice(e.target.value)}
              placeholder="Optional"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label
            htmlFor="timeFrame"
            className="block text-sm font-medium text-gray-700"
          >
            Time frame *
          </label>
          <Select value={timeFrame} onValueChange={setTimeFrame}>
            <SelectTrigger id="timeFrame">
              <SelectValue placeholder="Select time frame" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={format(tomorrow, "yyyy-MM-dd")}>
                Tomorrow (By {format(tomorrow, "EEE, dd MMM yyyy")})
              </SelectItem>
              <SelectItem value={format(today, "yyyy-MM-dd")}>
                Today (By {format(today, "EEE, dd MMM yyyy")})
              </SelectItem>
              <SelectItem value={format(oneWeek, "yyyy-MM-dd")}>
                1 Week (By {format(oneWeek, "EEE, dd MMM yyyy")})
              </SelectItem>
              <SelectItem value={format(oneMonth, "yyyy-MM-dd")}>
                1 Month (By {format(oneMonth, "EEE, dd MMM yyyy")})
              </SelectItem>
              <SelectItem value={format(oneYear, "yyyy-MM-dd")}>
                1 Year (By {format(oneYear, "EEE, dd MMM yyyy")})
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label
              htmlFor="stopLoss"
              className="block text-sm font-medium text-gray-700"
            >
              Stoploss
            </label>
            <Input
              id="stopLoss"
              type="number"
              value={stopLoss}
              onChange={(e) => setStopLoss(e.target.value)}
              placeholder="Optional"
            />
          </div>
          <div className="space-y-2">
            <label
              htmlFor="target"
              className="block text-sm font-medium text-gray-700"
            >
              Target
            </label>
            <Input
              id="target"
              type="number"
              value={target}
              onChange={(e) => setTarget(e.target.value)}
              placeholder="Optional"
            />
          </div>
        </div>

        <div className="flex justify-end items-center mt-6">
          <SubmitButton
            text="Place Order"
            disabled={!selectedCompany || !orderType || !quantity || submitting}
            onClick={handlePlaceOrder}
            isLoading={submitting}
          />
        </div>
      </div>
    </div>
  );
}
