import { and, eq, gte, lte, sql } from "drizzle-orm";
import { db } from "../../db/index.js";
import type { DashboardSummaryMetrics } from "./dashboard.types.js";
import { transactions } from "../../db/schema/index.js";

/*
=================================================
GET DASHBOARD SUMMARY METRICS
=================================================
*/

export const getDashboardSummaryMetrics = async (
  userId: number,
  startDate: Date,
  endDate: Date,
): Promise<DashboardSummaryMetrics> => {
  const [lifetime] = await db
    .select({
      totalIncome: sql<number>`coalesce(sum(case when ${transactions.type} = 'income' then ${transactions.amount} else 0 end), 0)`,

      totalExpense: sql<number>`coalesce(sum(case when ${transactions.type} = 'expense' then ${transactions.amount} else 0 end), 0)`,

      transactionCount: sql<number>`count(*)`,
    })
    .from(transactions)
    .where(eq(transactions.userId, userId));

  const [monthly] = await db
    .select({
      monthlyIncome: sql<number>`coalesce(sum(case when ${transactions.type} = 'income' then ${transactions.amount} else 0 end), 0)`,

      monthlyExpense: sql<number>`coalesce(sum(case when ${transactions.type} = 'expense' then ${transactions.amount} else 0 end), 0)`,
    })
    .from(transactions)
    .where(
      and(
        eq(transactions.userId, userId),
        gte(transactions.transactionDate, startDate),
        lte(transactions.transactionDate, endDate),
      ),
    );

  return {
    totalIncome: Number(lifetime.totalIncome),
    totalExpense: Number(lifetime.totalExpense),

    monthlyIncome: Number(monthly.monthlyIncome),
    monthlyExpense: Number(monthly.monthlyExpense),

    transactionCount: Number(lifetime.transactionCount),
  };
};
