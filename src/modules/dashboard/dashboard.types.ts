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
