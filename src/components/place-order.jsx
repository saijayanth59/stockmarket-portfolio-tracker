"use client";

import { useState } from "react";
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
import { ArrowLeft } from "lucide-react";
import { format } from "date-fns";

const today = new Date();
const tomorrow = new Date(today);
tomorrow.setDate(today.getDate() + 1);

const oneWeek = new Date(today);
oneWeek.setDate(today.getDate() + 7);

const oneMonth = new Date(today);
oneMonth.setMonth(today.getMonth() + 1);

const oneYear = new Date(today);
oneYear.setFullYear(today.getFullYear() + 1);

// Mock data for companies
const companies = [
  { symbol: "AAPL", name: "Apple Inc." },
  { symbol: "GOOGL", name: "Alphabet Inc." },
  { symbol: "MSFT", name: "Microsoft Corporation" },
  // Add more companies as needed
];

export default function PlaceOrderPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [orderType, setOrderType] = useState(null);
  const [quantity, setQuantity] = useState("");
  const [entryPrice, setEntryPrice] = useState("");
  const [timeFrame, setTimeFrame] = useState("Tomorrow");
  const [stopLoss, setStopLoss] = useState("");
  const [target, setTarget] = useState("");

  const filteredCompanies = companies.filter(
    (company) =>
      company.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handlePlaceOrder = () => {
    // Implement order placement logic here
    console.log("Order placed:", {
      selectedCompany,
      orderType,
      quantity,
      entryPrice,
      timeFrame,
      stopLoss,
      target,
    });
    router.push("/user/positions"); // Redirect to home page after placing order
  };

  return (
    <div className="container mx-auto py-6  max-w-2xl">
      <Button
        variant="ghost"
        onClick={() => router.push("/user/positions")}
        className="mb-4 -ml-5"
      >
        <ArrowLeft className="h-4 w-4" /> Back to positions
      </Button>
      <h1 className="text-2xl font-bold mb-6">Place Order</h1>
      <div className="space-y-6">
        <div className="relative">
          <Input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search for a company"
          />
          {searchTerm && (
            <ul className="absolute left-0 right-0 border border-gray-300 rounded-lg mt-2 bg-white max-h-40 overflow-y-auto z-10 shadow-lg">
              {filteredCompanies.map((company, index) => (
                <li
                  key={index}
                  onClick={() => {
                    setSelectedCompany(company.symbol);
                    setSearchTerm("");
                  }}
                  className="cursor-pointer px-4 py-2 bg-neutral-900"
                >
                  {company.symbol} - {company.name}
                </li>
              ))}
              {filteredCompanies.length === 0 && (
                <li className="px-4 py-2 text-gray-500">No companies found</li>
              )}
            </ul>
          )}
        </div>

        {/* <div className="bg-gray-100 p-4 rounded-lg text-sm text-gray-600">
          <p>⚠️ Markets are closed. You're placing an AMO.</p>
          <p>Your order will execute once the market opens.</p>
        </div> */}
        {selectedCompany && <h2 className="text-xl">{selectedCompany}</h2>}

        <div className="flex justify-between gap-4">
          <Button
            onClick={() => setOrderType("Buy")}
            variant={orderType === "Buy" ? "default" : "outline"}
            className={`w-1/2 ${
              orderType === "Buy"
                ? "bg-green-500 hover:bg-green-600"
                : " text-green-500 hover:bg-green-200"
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
                : " text-red-500 hover:bg-red-200"
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

        <div className="flex justify-between items-center mt-6">
          <p className="text-sm text-gray-500">
            Available Margin: ₹7,82,415.00
          </p>
          <Button
            onClick={handlePlaceOrder}
            disabled={!selectedCompany || !orderType}
            className="w-full md:w-auto"
          >
            Place an AMO
          </Button>
        </div>
      </div>
    </div>
  );
}
