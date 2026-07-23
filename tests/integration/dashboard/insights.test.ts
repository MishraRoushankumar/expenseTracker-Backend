import request from "supertest";
import { beforeEach, describe, expect, it } from "vitest";
import app from "../test-app.js";
import { truncateAllTables } from "../test-db.js";
import { createAuthenticatedUser } from "../helpers/auth.helper.js";

describe("GET /api/v1/dashboard/insights", () => {
  beforeEach(async () => {
    await truncateAllTables();
  });

  it("should return 401 Unauthorized without token", async () => {
    const response = await request(app).get("/api/v1/dashboard/insights");
    expect(response.status).toBe(401);
    expect(response.body).toMatchObject({
      success: false,
      message: expect.any(String),
    });
  });

  it("should return sensible defaults for an empty state", async () => {
    const { token } = await createAuthenticatedUser();
    const response = await request(app)
      .get("/api/v1/dashboard/insights")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.data).toMatchObject({
      highestExpenseCategory: null,
      largestExpense: null,
      averageTransactionAmount: 0,
      averageMonthlyIncome: 0,
      averageMonthlyExpense: 0,
      savingsRate: 0,
    });
  });

  it("should calculate correct averages and savings rate", async () => {
    const { token } = await createAuthenticatedUser();

    const cat = await request(app)
      .post("/api/v1/categories")
      .set("Authorization", `Bearer ${token}`)
      .send({ name: "housing" });

    const now = new Date();

    const curr = now.toISOString();

    const prev = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      15,
    ).toISOString();

    await request(app)
      .post("/api/v1/transactions")
      .set("Authorization", `Bearer ${token}`)
      .send({ type: "income", amount: 5000, transactionDate: curr });
    await request(app)
      .post("/api/v1/transactions")
      .set("Authorization", `Bearer ${token}`)
      .send({
        type: "expense",
        amount: 2000,
        categoryId: cat.body.data.id,
        transactionDate: curr,
      });
    await request(app)
      .post("/api/v1/transactions")
      .set("Authorization", `Bearer ${token}`)
      .send({
        type: "expense",
        amount: 300,
        categoryId: cat.body.data.id,
        transactionDate: prev,
      });

    const response = await request(app)
      .get("/api/v1/dashboard/insights")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);

    expect(response.body.data.largestExpense.date).toBe(curr.split("T")[0]);

    expect(response.body.data).toMatchObject({
      highestExpenseCategory: { name: "housing", amount: 2300 },
      largestExpense: { amount: 2000, category: "housing" },
      averageTransactionAmount: 2433.33,
      averageMonthlyIncome: 2500,
      averageMonthlyExpense: 1150,
      savingsRate: 54,
    });
  });
});
