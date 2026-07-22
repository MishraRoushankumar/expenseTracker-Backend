import { getDashboardSummaryMetrics } from "./dashboard.repository.js";
import type { DashboardSummary } from "./dashboard.types.js";

/*
==========================================
GET DASHBOARD SUMMARY
==========================================
*/

export const getDashboardSummary = async (
  userId: number,
): Promise<DashboardSummary> => {
  const now = new Date();

  const startDate = new Date(now.getFullYear(), now.getMonth(), 1);

  const endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0);

  const metrics = await getDashboardSummaryMetrics(userId, startDate, endDate);

  return {
    ...metrics,
    currentBalance: metrics.totalIncome - metrics.totalExpense,
    monthlySavings: metrics.monthlyIncome - metrics.monthlyExpense,
  };
};
