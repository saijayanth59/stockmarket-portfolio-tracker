"use client";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import SubmitButton from "./submit-button";

export function ConfirmationDialog({
  isOpen,
  onClose,
  onConfirm,
  message,
  submitting,
}) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Confirmation</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <p className="text-sm text-muted-foreground">{message}</p>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <SubmitButton
            variant="destructive"
            text="Confirm"
            disabled={submitting}
            onClick={onConfirm}
            isLoading={submitting}
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
