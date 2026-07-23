import request from "supertest";
import { beforeEach, describe, expect, it } from "vitest";
import app from "../test-app.js";
import { truncateAllTables } from "../test-db.js";
import { createAuthenticatedUser } from "../helpers/auth.helper.js";

interface LocalCategoryAnalytics {
  categoryId: number | null;
  categoryName: string | null;
  totalAmount: number;
  transactionCount: number;
  percentage: number;
}

describe("GET /api/v1/dashboard/category-analytics", () => {
  beforeEach(async () => {
    await truncateAllTables();
  });

  it("should return 401 Unauthorized without token", async () => {
    const response = await request(app).get(
      "/api/v1/dashboard/category-analytics",
    );
    expect(response.status).toBe(401);
    expect(response.body).toMatchObject({
      success: false,
      message: expect.any(String),
    });
  });

  it("should return an empty array for a user with no transactions", async () => {
    const { token } = await createAuthenticatedUser();
    const response = await request(app)
      .get("/api/v1/dashboard/category-analytics")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.data).toEqual([]);
  });

  it("should return aggregated category analytics for active categories and ignore deleted ones", async () => {
    const { token } = await createAuthenticatedUser();

    const cat1 = await request(app)
      .post("/api/v1/categories")
      .set("Authorization", `Bearer ${token}`)
      .send({ name: "housing" });
    const cat2 = await request(app)
      .post("/api/v1/categories")
      .set("Authorization", `Bearer ${token}`)
      .send({ name: "food" });
    const cat3 = await request(app)
      .post("/api/v1/categories")
      .set("Authorization", `Bearer ${token}`)
      .send({ name: "temp" });

    const now = new Date();

    const curr = now.toISOString();

    await request(app)
      .post("/api/v1/transactions")
      .set("Authorization", `Bearer ${token}`)
      .send({
        type: "expense",
        amount: 2000,
        categoryId: cat1.body.data.id,
        transactionDate: curr,
      });
    await request(app)
      .post("/api/v1/transactions")
      .set("Authorization", `Bearer ${token}`)
      .send({
        type: "expense",
        amount: 300,
        categoryId: cat1.body.data.id,
        transactionDate: curr,
      });
    await request(app)
      .post("/api/v1/transactions")
      .set("Authorization", `Bearer ${token}`)
      .send({
        type: "expense",
        amount: 1000,
        categoryId: cat2.body.data.id,
        transactionDate: curr,
      });
    await request(app)
      .post("/api/v1/transactions")
      .set("Authorization", `Bearer ${token}`)
      .send({
        type: "expense",
        amount: 500,
        categoryId: cat2.body.data.id,
        transactionDate: curr,
      });

    await request(app)
      .post("/api/v1/transactions")
      .set("Authorization", `Bearer ${token}`)
      .send({
        type: "expense",
        amount: 200,
        categoryId: cat3.body.data.id,
        transactionDate: curr,
      });

    await request(app)
      .delete(`/api/v1/categories/${cat3.body.data.id}`)
      .set("Authorization", `Bearer ${token}`);

    const response = await request(app)
      .get("/api/v1/dashboard/category-analytics")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);

    const housing = response.body.data.find(
      (c: LocalCategoryAnalytics) => c.categoryName === "housing",
    );
    const food = response.body.data.find(
      (c: LocalCategoryAnalytics) => c.categoryName === "food",
    );
    const deleted = response.body.data.find(
      (c: LocalCategoryAnalytics) => c.categoryId === null,
    );

    const totalPercentage = response.body.data.reduce(
      (sum: number, c: LocalCategoryAnalytics) => sum + c.percentage,
      0,
    );

    expect(totalPercentage).toBeCloseTo(100, 2);

    expect(housing).toMatchObject({
      totalAmount: 2300,
      transactionCount: 2,
      percentage: 60.53,
    });

    expect(food).toMatchObject({
      totalAmount: 1500,
      transactionCount: 2,
      percentage: 39.47,
    });

    expect(deleted).toBeUndefined();
  });
});
