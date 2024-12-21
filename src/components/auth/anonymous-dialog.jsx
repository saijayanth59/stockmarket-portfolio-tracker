"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AlertTriangle } from "lucide-react";

export function AnonymousDialog({ open, onClose }) {
  const handleContinue = () => {
    // Here you would typically handle the demo mode
    console.log("Continuing with demo mode");
    onClose();
  };

  return (
    <Dialog
      open={open}
      onOpenChange={onClose}
      className="bg-white dark:bg-gray-950"
    >
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-yellow-500" />
            Try Demo Mode
          </DialogTitle>
          <DialogDescription>
            You're about to enter demo mode with limited features. For the full
            StockTracker Pro experience, we recommend creating an account.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <h4 className="text-sm font-medium mb-2">Demo Mode Limitations:</h4>
          <ul className="text-sm text-gray-500 list-disc list-inside space-y-1">
            <li>View-only access to sample portfolios</li>
            <li>Limited historical data</li>
            <li>No personalized recommendations</li>
            <li>Unable to save watchlists or alerts</li>
          </ul>
        </div>
        <DialogFooter className="sm:justify-start">
          <Button type="button" variant="secondary" onClick={onClose}>
            Go Back
          </Button>
          <Button type="button" onClick={handleContinue}>
            Continue to Demo
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
