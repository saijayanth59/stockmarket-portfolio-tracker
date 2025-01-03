"use client";

import { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function HomePage({ children }) {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push("/user/dashboard");
    } else {
      router.push("/auth");
    }
  }, [user, router]);

  return <>{children}</>;
}
