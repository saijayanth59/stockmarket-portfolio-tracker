"use client";

import { useEffect, useState } from "react";
import TopIndexes from "@/components/dashboard/TopIndexes";
import AreaChartPortfolio from "@/components/dashboard/AreaChartPortfolio";
import DashboardSkeleton from "@/components/dashboard/DashBoardSkeleton";
import HistoryPie from "@/components/dashboard/HistoryPie";

export default function DashboardPage() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate data fetching
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  return (
    <div className="flex px-5 gap-5 flex-col">
      <TopIndexes />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <AreaChartPortfolio />
        <HistoryPie />
      </div>
    </div>
  );
}
