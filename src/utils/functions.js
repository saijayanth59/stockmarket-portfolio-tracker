export const checkMarketStatus = () => {
  const now = new Date();
  const currentIST = new Date(
    now.toLocaleString("en-US", { timeZone: "Asia/Kolkata" })
  );

  const dayOfWeek = currentIST.getDay();
  const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

  const marketOpen = new Date(currentIST);
  marketOpen.setHours(19, 0, 0);

  const marketClose = new Date(currentIST);
  marketClose.setDate(marketClose.getDate() + 1);
  marketClose.setHours(1, 30, 0);

  if (isWeekend || currentIST < marketOpen || currentIST > marketClose) {
    return true;
  }
  return false;
};
