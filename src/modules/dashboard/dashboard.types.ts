export interface DashboardSummary {
  totalIncome: number;
  totalExpense: number;
  currentBalance: number;

  monthlyIncome: number;
  monthlyExpense: number;
  monthlySavings: number;

  transactionCount: number;
}

export interface DashboardSummaryMetrics {
  totalIncome: number;
  totalExpense: number;
  monthlyIncome: number;
  monthlyExpense: number;
  transactionCount: number;
}

export interface MonthlyTrendRaw {
  year: number;
  month: number;
  income: number;
  expense: number;
}

export interface MonthlyTrend {
  period: string;
  label: string;
  income: number;
  expense: number;
  balance: number;
}
