import { and, desc, eq, gte, lte, sql } from "drizzle-orm";
import { db } from "../../db/index.js";
import type {
  CategoryAnalyticsRaw,
  DashboardInsightMetrics,
  DashboardSummaryMetrics,
  HighestExpenseCategory,
  LargestExpense,
  MonthlyTotals,
  MonthlyTrendRaw,
} from "./dashboard.types.js";
import { categories, transactions } from "../../db/schema/index.js";

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
      totalIncome: sql<number>`coalesce(sum(case when ${transactions.type} = 'income'  then ${transactions.amount}  else 0 end),0)`,

      totalExpense: sql<number>`coalesce(sum(case when ${transactions.type} = 'expense' then ${transactions.amount} else 0 end),0)`,

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
  const yearSql = sql<number>`extract(year from ${transactions.transactionDate})`;

  const monthSql = sql<number>`extract(month from ${transactions.transactionDate})`;

  const trends = await db
    .select({
      year: yearSql,
      month: monthSql,

      income: sql<number>`coalesce(sum(case when ${transactions.type} = 'income' then ${transactions.amount} else 0 end ),0)`,
      expense: sql<number>`coalesce(sum(case when ${transactions.type} = 'expense' then ${transactions.amount} else 0 end ),0)`,
    })
    .from(transactions)
    .where(eq(transactions.userId, userId))
    .groupBy(yearSql, monthSql)
    .orderBy(yearSql, monthSql);

  return trends;
};

/*
=================================================
GET HIGHEST EXPENSE CATEGORY
=================================================
*/

export const getHighestExpenseCategory = async (
  userId: number,
): Promise<HighestExpenseCategory | null> => {
  const [category] = await db
    .select({
      id: categories.id,
      name: categories.name,
      amount: sql<number>`
        coalesce(sum(${transactions.amount}), 0)
      `,
    })
    .from(transactions)
    .innerJoin(categories, eq(transactions.categoryId, categories.id))
    .where(
      and(eq(transactions.userId, userId), eq(transactions.type, "expense")),
    )
    .groupBy(categories.id, categories.name)
    .orderBy(desc(sql`sum(${transactions.amount})`))
    .limit(1);

  return category ?? null;
};
/*
=================================================
GET LARGEST EXPENSE
=================================================
*/

export const getLargestExpense = async (
  userId: number,
): Promise<LargestExpense | null> => {
  const [expense] = await db
    .select({
      id: transactions.id,
      amount: transactions.amount,
      category: categories.name,
      date: transactions.transactionDate,
    })
    .from(transactions)
    .leftJoin(categories, eq(transactions.categoryId, categories.id))
    .where(
      and(eq(transactions.userId, userId), eq(transactions.type, "expense")),
    )
    .orderBy(desc(transactions.amount))
    .limit(1);

  if (!expense) {
    return null;
  }

  return {
    ...expense,
    amount: Number(expense.amount),
  };
};

/*
=================================================
GET MONTHLY TOTALS
=================================================
*/

export const getMonthlyTotals = async (
  userId: number,
): Promise<MonthlyTotals[]> => {
  const monthSql = sql`date_trunc('month', ${transactions.transactionDate})`;

  const monthlyTotals = await db
    .select({
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
    .groupBy(monthSql);

  return monthlyTotals.map((month) => ({
    income: Number(month.income),
    expense: Number(month.expense),
  }));
};

/*
=================================================
GET DASHBOARD INSIGHTS METRICS
=================================================
*/

export const getDashboardInsightMetrics = async (
  userId: number,
): Promise<DashboardInsightMetrics> => {
  const [metrics] = await db
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

      transactionCount: sql<number>`
        count(*)
      `,

      activeMonths: sql<number>`
        count(
          distinct date_trunc(
            'month',
            ${transactions.transactionDate}
          )
        )
      `,
    })
    .from(transactions)
    .where(eq(transactions.userId, userId));

  return {
    totalIncome: Number(metrics.totalIncome),
    totalExpense: Number(metrics.totalExpense),
    transactionCount: Number(metrics.transactionCount),
  };
};

/*
=================================================
GET CATEGORY ANALYTICS
=================================================
*/

export const getCategoryAnalyticsMetrics = async (
  userId: number,
): Promise<CategoryAnalyticsRaw[]> => {
  const totalAmountSql = sql<number>`
    coalesce(sum(${transactions.amount}), 0)
  `;

  const analytics = await db
    .select({
      categoryId: categories.id,
      categoryName: categories.name,
      totalAmount: totalAmountSql,
      transactionCount: sql<number>`count(*)`,
    })
    .from(transactions)
    .innerJoin(categories, eq(transactions.categoryId, categories.id))
    .where(
      and(eq(transactions.userId, userId), eq(transactions.type, "expense")),
    )
    .groupBy(categories.id, categories.name)
    .orderBy(desc(totalAmountSql));

  return analytics.map((category) => ({
    categoryId: category.categoryId,
    categoryName: category.categoryName,
    totalAmount: Number(category.totalAmount),
    transactionCount: Number(category.transactionCount),
  }));
};
