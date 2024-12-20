"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function EditOrderDialog({ isOpen, onClose, order }) {
  const [quantity, setQuantity] = useState(order.quantity.toString());
  const [orderValidity, setOrderValidity] = useState(order.validity);
  const [target, setTarget] = useState(""); // New field for target
  const [stopLoss, setStopLoss] = useState(""); // New field for stop loss

  useEffect(() => {
    setQuantity(order.quantity.toString());
    setOrderValidity(order.validity);
    setTarget(""); // Reset target field when order changes
    setStopLoss(""); // Reset stop loss field when order changes
  }, [order]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle order update logic here
    console.log("Order updated:", {
      symbol: order.symbol,
      quantity,
      orderValidity,
      target,
      stopLoss,
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Order - {order.symbol}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="quantity" className="text-right">
                Quantity
              </Label>
              <Input
                id="quantity"
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="validity" className="text-right">
                Validity
              </Label>
              <Select onValueChange={setOrderValidity} value={orderValidity}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select validity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="day">Day</SelectItem>
                  <SelectItem value="ioc">Immediate or Cancel</SelectItem>
                  <SelectItem value="gtc">Good Till Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="target" className="text-right">
                Target
              </Label>
              <Input
                id="target"
                type="number"
                value={target}
                onChange={(e) => setTarget(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="stop-loss" className="text-right">
                Stop Loss
              </Label>
              <Input
                id="stop-loss"
                type="number"
                value={stopLoss}
                onChange={(e) => setStopLoss(e.target.value)}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Update Order</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
