import { DEFAULT_LOCALE } from "./dashboard.constants.js";
import {
  getDashboardInsightMetrics,
  getDashboardSummaryMetrics,
  getHighestExpenseCategory,
  getLargestExpense,
  getMonthlyTotals,
  getMonthlyTrendMetrics,
} from "./dashboard.repository.js";
import type {
  DashboardInsights,
  DashboardSummary,
  MonthlyTrend,
} from "./dashboard.types.js";

/*
==========================================
HELPERS
==========================================
*/

const roundToTwoDecimals = (value: number): number =>
  Math.round(value * 100) / 100;

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

/*
=================================================
GET DASHBOAR INSIGHTS
=================================================
*/

export const getDashboardInsights = async (
  userId: number,
): Promise<DashboardInsights> => {
  const [category, expense, metrics, monthlyTotals] = await Promise.all([
    getHighestExpenseCategory(userId),
    getLargestExpense(userId),
    getDashboardInsightMetrics(userId),
    getMonthlyTotals(userId),
  ]);

  const averageTransactionAmount =
    metrics.transactionCount === 0
      ? 0
      : (metrics.totalIncome + metrics.totalExpense) / metrics.transactionCount;

  const activeMonths = monthlyTotals.length;

  const averageMonthlyIncome =
    activeMonths === 0
      ? 0
      : monthlyTotals.reduce((sum, month) => sum + month.income, 0) /
        activeMonths;

  const averageMonthlyExpense =
    activeMonths === 0
      ? 0
      : monthlyTotals.reduce((sum, month) => sum + month.expense, 0) /
        activeMonths;

  const savingsRate =
    metrics.totalIncome === 0
      ? 0
      : ((metrics.totalIncome - metrics.totalExpense) / metrics.totalIncome) *
        100;

  return {
    highestExpenseCategory: category,
    largestExpense: expense
      ? {
          id: expense.id,
          amount: expense.amount,
          category: expense.category,
          date: expense.date.toISOString().split("T")[0],
        }
      : null,

    averageTransactionAmount: roundToTwoDecimals(averageTransactionAmount),
    averageMonthlyIncome: roundToTwoDecimals(averageMonthlyIncome),
    averageMonthlyExpense: roundToTwoDecimals(averageMonthlyExpense),
    savingsRate: roundToTwoDecimals(savingsRate),
  };
};
