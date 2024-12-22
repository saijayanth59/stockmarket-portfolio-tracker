"use client";

import { useEffect, useState } from "react";
import TopIndexes from "@/components/line-chart";
import AreaChartPortfolio from "@/components/area-chart";
import MostTransactions from "@/components/bar-chart";
import TopGainersAndLosers from "@/components/TopGainersAndLosers";
import DashboardSkeleton from "@/components/dashboard/DashBoardSkeleton";

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
      <div className="flex gap-5 justify-between items-center">
        <AreaChartPortfolio />
        <MostTransactions />
        <TopGainersAndLosers />
      </div>
    </div>
  );
}
