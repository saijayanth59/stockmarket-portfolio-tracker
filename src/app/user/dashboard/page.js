// import PortfolioOverview from "@/components/portfolio-overview";
// import TopMovers from "@/components/top-movers";
// import StockPerformance from "@/components/stock-performance";
// import MarketOverview from "@/components/market-overview";
// import RecentTransactions from "@/components/recent-transactions";

export const metadata = {
  title: "Dashboard",
  description: "Stock Market Portfolio Tracker Dashboard",
};

export default function page() {
  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* <PortfolioOverview />
        <TopMovers />
        <StockPerformance />
        <MarketOverview /> */}
      </div>
      <div className="mt-4">{/* <RecentTransactions /> */}</div>
    </>
  );
}
