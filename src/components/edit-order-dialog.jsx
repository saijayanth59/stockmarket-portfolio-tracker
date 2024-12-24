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
import { updateOrder } from "@/utils/api";
import toast from "react-hot-toast";

export function EditOrderDialog({ isOpen, onClose, order, setStocks }) {
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

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      console.log("Order updated:", {
        quantity,
        target,
        stopLoss,
      });
      const res = await updateOrder(order.id, {
        quantity: quantity ? quantity : order.quantity,
        target: target ? target : order.target,
        stoploss: stopLoss ? stopLoss : order.stoploss,
      });
      setStocks((prev) => {
        const updatedStocks = prev.map((stock) => {
          if (stock.symbol === res.symbol) {
            return {
              ...res,
              ltp: stock.ltp,
            };
          }
          return stock;
        });
        return updatedStocks;
      });
      toast.success("Order updated successfully");
      onClose();
    } catch (err) {
      toast.error(err.message);
    }
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
                onChange={(e) => {
                  setQuantity(e.target.value);
                }}
                className="col-span-3"
              />
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
