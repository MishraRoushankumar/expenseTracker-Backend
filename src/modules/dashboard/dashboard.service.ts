import { DEFAULT_LOCALE } from "./dashboard.constants.js";
import {
  getDashboardSummaryMetrics,
  getMonthlyTrendMetrics,
} from "./dashboard.repository.js";
import type { DashboardSummary, MonthlyTrend } from "./dashboard.types.js";

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

/*
==========================================
GET MONTHLY TRENDS
==========================================
*/

export const getMonthlyTrends = async (
  userId: number,
): Promise<MonthlyTrend[]> => {
  const metrics = await getMonthlyTrendMetrics(userId);

  return metrics.map((trend) => {
    const period = `${trend.year}-${String(trend.month).padStart(2, "0")}`;

    const label = new Date(trend.year, trend.month - 1).toLocaleString(
      DEFAULT_LOCALE,
      {
        month: "short",
        year: "numeric",
      },
    );
    return {
      period,
      label,
      income: trend.income,
      expense: trend.expense,
      balance: trend.income - trend.expense,
    };
  });
};
