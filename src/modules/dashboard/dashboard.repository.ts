import { and, eq, gte, lte, sql } from "drizzle-orm";
import { db } from "../../db/index.js";
import type {
  DashboardSummaryMetrics,
  MonthlyTrendRaw,
} from "./dashboard.types.js";
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
      totalIncome: sql<number>`
      coalesce(
        sum(
          case
            when ${transactions.type} = 'income' 
            then ${transactions.amount} 
            else 0 
          end
        ), 
        0
      )
    `,

      totalExpense: sql<number>`
      coalesce(
        sum(
          case
            when ${transactions.type} = 'expense'
            then ${transactions.amount}
            else 0
          end
        ),
        0
      )
    `,

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

/*
=================================================
GET MONTHLY TRENDS
=================================================
*/

export const getMonthlyTrendMetrics = async (
  userId: number,
): Promise<MonthlyTrendRaw[]> => {
  const yearSql = sql<number>`
extract(year from ${transactions.transactionDate})
`;

  const monthSql = sql<number>`
extract(month from ${transactions.transactionDate})
`;

  const trends = await db
    .select({
      year: yearSql,
      month: monthSql,

      income: sql<number>`
      coalesce(
        sum(
          case
            when ${transactions.type} = 'income'
            then ${transactions.amount}
            else 0
          end
        ),
        0
      )
    `,

      expense: sql<number>`
      coalesce(
        sum(
          case
            when ${transactions.type} = 'expense'
            then ${transactions.amount}
            else 0
          end
        ),
        0
      )
    `,
    })
    .from(transactions)
    .where(eq(transactions.userId, userId))
    .groupBy(yearSql, monthSql)
    .orderBy(yearSql, monthSql);

  return trends;
};
