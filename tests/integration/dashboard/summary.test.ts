import request from "supertest";
import { beforeEach, describe, expect, it } from "vitest";
import app from "../test-app.js";
import { truncateAllTables } from "../test-db.js";
import { createAuthenticatedUser } from "../helpers/auth.helper.js";

describe("GET /api/v1/dashboard/summary", () => {
  beforeEach(async () => {
    await truncateAllTables();
  });

  it("should return 401 Unauthorized without token", async () => {
    const response = await request(app).get("/api/v1/dashboard/summary");
    expect(response.status).toBe(401);
    expect(response.body).toMatchObject({
      success: false,
      message: expect.any(String),
    });
  });

  it("should return sensible defaults for a new user with no transactions", async () => {
    const { token } = await createAuthenticatedUser();
    const response = await request(app)
      .get("/api/v1/dashboard/summary")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.data).toMatchObject({
      totalIncome: 0,
      totalExpense: 0,
      currentBalance: 0,
      monthlyIncome: 0,
      monthlyExpense: 0,
      monthlySavings: 0,
      transactionCount: 0,
    });
  });

  it("should isolate dashboard data between users", async () => {
    const user1 = await createAuthenticatedUser({ email: "user1@example.com" });
    const user2 = await createAuthenticatedUser({ email: "user2@example.com" });

    await request(app)
      .post("/api/v1/transactions")
      .set("Authorization", `Bearer ${user1.token}`)
      .send({
        type: "income",
        amount: 1000,
        transactionDate: new Date().toISOString(),
      });

    const response = await request(app)
      .get("/api/v1/dashboard/summary")
      .set("Authorization", `Bearer ${user2.token}`);
    expect(response.body.data.totalIncome).toBe(0);
    expect(response.status).toBe(200);

    expect(response.body.success).toBe(true);
  });

  it("should return the correct API contract and accurate summary metrics", async () => {
    const { token } = await createAuthenticatedUser();

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
      .send({ type: "expense", amount: 2000, transactionDate: curr });
    await request(app)
      .post("/api/v1/transactions")
      .set("Authorization", `Bearer ${token}`)
      .send({ type: "expense", amount: 1200, transactionDate: curr });
    await request(app)
      .post("/api/v1/transactions")
      .set("Authorization", `Bearer ${token}`)
      .send({ type: "expense", amount: 800, transactionDate: prev });

    const response = await request(app)
      .get("/api/v1/dashboard/summary")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      success: true,
      message: "Dashboard summary retrieved successfully.",
      data: {
        totalIncome: 5000,
        totalExpense: 4000,
        currentBalance: 1000,
        monthlyIncome: 5000,
        monthlyExpense: 3200,
        monthlySavings: 1800,
        transactionCount: 4,
      },
    });
  });
});
