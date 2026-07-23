import { DEFAULT_LOCALE } from "./dashboard.constants.js";
import {
  getCategoryAnalyticsMetrics,
  getDashboardInsightMetrics,
  getDashboardSummaryMetrics,
  getHighestExpenseCategory,
  getLargestExpense,
  getMonthlyTotals,
  getMonthlyTrendMetrics,
  getRecentTransactions,
} from "./dashboard.repository.js";
import type {
  CategoryAnalytics,
  DashboardInsights,
  DashboardSummary,
  MonthlyTrend,
  RecentTransaction,
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

export const getDashboardSummaryService = async (
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

export const getMonthlyTrendsService = async (
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

export const getDashboardInsightsService = async (
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

/*
=================================================
GET CATEGORY ANALYTICS
=================================================
*/

export const getCategoryAnalyticsService = async (
  userId: number,
): Promise<CategoryAnalytics[]> => {
  const metrics = await getCategoryAnalyticsMetrics(userId);

  const grandTotal = metrics.reduce(
    (sum, analytics) => sum + analytics.totalAmount,
    0,
  );

  return metrics.map((analytics) => {
    const percentage =
      grandTotal === 0
        ? 0
        : roundToTwoDecimals((analytics.totalAmount / grandTotal) * 100);
    return {
      categoryId: analytics.categoryId,
      categoryName: analytics.categoryName,
      totalAmount: analytics.totalAmount,
      transactionCount: analytics.transactionCount,
      percentage,
    };
  });
};

/*
=================================================
GET RECENT TRANSACTIONS
=================================================
*/

export const getRecentTransactionsService = async (
  userId: number,
  limit: number,
): Promise<RecentTransaction[]> => {
  const transactions = await getRecentTransactions(userId, limit);

  return transactions.map((transaction) => {
    return {
      ...transaction,
      transactionDate: transaction.transactionDate.toISOString().split("T")[0],
    };
  });
};
