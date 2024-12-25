"use client";

import { useAuth } from "@/context/AuthContext";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProtectedRoute({ children }) {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/auth");
    }
  }, [user, router]);

  if (!user)
    return (
      <div className="flex justify-center items-center h-[100vh]">
        <Loader2 className="h-28 w-12 animate-spin" />
      </div>
    );

  return <>{children}</>;
}
