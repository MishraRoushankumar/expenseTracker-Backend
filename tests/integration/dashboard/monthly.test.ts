import request from "supertest";
import { beforeEach, describe, expect, it } from "vitest";
import app from "../test-app.js";
import { truncateAllTables } from "../test-db.js";
import { createAuthenticatedUser } from "../helpers/auth.helper.js";

describe("GET /api/v1/dashboard/monthly", () => {
  beforeEach(async () => {
    await truncateAllTables();
  });

  it("should return 401 Unauthorized without token", async () => {
    const response = await request(app).get("/api/v1/dashboard/monthly");
    expect(response.status).toBe(401);
    expect(response.body).toMatchObject({
      success: false,
      message: expect.any(String),
    });
  });

  it("should return an empty array for a user with no transactions", async () => {
    const { token } = await createAuthenticatedUser();
    const response = await request(app)
      .get("/api/v1/dashboard/monthly")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.data).toEqual([]);
  });

  it("should return monthly trends with correct multi-year ordering and contract", async () => {
    const { token } = await createAuthenticatedUser();

    const now = new Date();

    const curr = now.toISOString();

    const prevYear = new Date(
      now.getFullYear() - 1,
      now.getMonth(),
      15,
    ).toISOString();

    await request(app)
      .post("/api/v1/transactions")
      .set("Authorization", `Bearer ${token}`)
      .send({ type: "income", amount: 5000, transactionDate: curr });
    await request(app)
      .post("/api/v1/transactions")
      .set("Authorization", `Bearer ${token}`)
      .send({ type: "expense", amount: 3200, transactionDate: curr });
    await request(app)
      .post("/api/v1/transactions")
      .set("Authorization", `Bearer ${token}`)
      .send({ type: "expense", amount: 300, transactionDate: prevYear });

    const response = await request(app)
      .get("/api/v1/dashboard/monthly")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data.length).toBe(2);

    expect(response.body.data[0]).toMatchObject({
      period: "2025-07",
      income: 0,
      expense: 300,
      balance: -300,
    });

    expect(response.body.data[1]).toMatchObject({
      period: "2026-07",
      income: 5000,
      expense: 3200,
      balance: 1800,
    });
  });
});
