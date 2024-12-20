import TopIndexes from "@/components/line-chart";
import AreaChartPortoflio from "@/components/area-chart";
import MostTransactions from "@/components/bar-chart";
import StockPurchases from "@/components/pie-chart";
import TopGainersAndLosers from "@/components/TopGainersAndLosers";

export const metadata = {
  title: "Dashboard",
  description: "Stock Market Portfolio Tracker Dashboard",
};

export default function page() {
  console.log("Dashboard page");

  return (
    <>
      <div className="flex px-5 gap-5 flex-col">
        <TopIndexes />
        <div className="flex gap-5 justify-between items-center">
          <AreaChartPortoflio />
          <MostTransactions />
          <TopGainersAndLosers />
          {/* <StockPurchases /> */}
        </div>
      </div>
    </>
  );
}
