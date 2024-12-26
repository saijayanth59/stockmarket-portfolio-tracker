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
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import SubmitButton from "../submit-button";
import toast from "react-hot-toast";
import { signIn } from "@/utils/api";
import { useRouter } from "next/navigation";

export function AnonymousDialog({ open, onClose }) {
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const userData = await signIn({
        username: "anonymous",
        password: "password",
      });
      toast.success("Sign in successful!");

      login(userData);
      onClose();
      console.log("Signed in successfully:", userData);
      router.push("/user/dashboard");
    } catch (error) {
      toast.error(error.message || "Sign-in failed. Please try again.");
    } finally {
      setLoading(false);
    }
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
          <DialogDescription>You're about to enter demo mode</DialogDescription>
        </DialogHeader>

        <DialogFooter className="sm:justify-start">
          <Button type="button" variant="secondary" onClick={onClose}>
            Go Back
          </Button>
          <SubmitButton
            text="Continue in Demo Mode"
            disabled={loading}
            onClick={handleSubmit}
            isLoading={loading}
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
