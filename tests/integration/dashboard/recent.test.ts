import request from "supertest";
import { beforeEach, describe, expect, it } from "vitest";
import app from "../test-app.js";
import { truncateAllTables } from "../test-db.js";
import { createAuthenticatedUser } from "../helpers/auth.helper.js";

interface LocalRecentTransaction {
  id: number;
  amount: number;
  transactionDate: string;
  categoryId: number | null;
  categoryName: string | null;
}

describe("GET /api/v1/dashboard/recent", () => {
  beforeEach(async () => {
    await truncateAllTables();
  });

  it("should return 401 Unauthorized without token", async () => {
    const response = await request(app).get("/api/v1/dashboard/recent");
    expect(response.status).toBe(401);
  });

  it("should return an empty array for a user with no transactions", async () => {
    const { token } = await createAuthenticatedUser();
    const response = await request(app)
      .get("/api/v1/dashboard/recent")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.data).toEqual([]);
  });

  it("should use default limit and return newest transactions first", async () => {
    const { token } = await createAuthenticatedUser();

    const now = new Date();

    for (let i = 1; i <= 15; i++) {
      const date = new Date(now.getTime() + i * 1000);

      await request(app)
        .post("/api/v1/transactions")
        .set("Authorization", `Bearer ${token}`)
        .send({
          type: "income",
          amount: 100 * i,
          transactionDate: date,
        });
    }

    const response = await request(app)
      .get("/api/v1/dashboard/recent")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data.length).toBe(10);

    const dates = response.body.data.map((t: LocalRecentTransaction) =>
      new Date(t.transactionDate).getTime(),
    );
    const isSorted = dates.every(
      (val: number, i: number, arr: number[]) => !i || arr[i - 1] >= val,
    );
    expect(isSorted).toBe(true);
  });

  it("should respect boundary limits", async () => {
    const { token } = await createAuthenticatedUser();

    for (let i = 1; i <= 5; i++) {
      await request(app)
        .post("/api/v1/transactions")
        .set("Authorization", `Bearer ${token}`)
        .send({
          type: "income",
          amount: 100,
          transactionDate: new Date().toISOString(),
        });
    }

    const resLimit1 = await request(app)
      .get("/api/v1/dashboard/recent?limit=1")
      .set("Authorization", `Bearer ${token}`);
    expect(resLimit1.body.data).toHaveLength(1);

    const resLimit50 = await request(app)
      .get("/api/v1/dashboard/recent?limit=50")
      .set("Authorization", `Bearer ${token}`);
    expect(resLimit50.body.data.length).toBe(5);

    const resLimit400 = await request(app)
      .get("/api/v1/dashboard/recent?limit=400")
      .set("Authorization", `Bearer ${token}`);
    expect(resLimit400.status).toBe(400);
    expect(resLimit400.body).toMatchObject({
      success: false,
      message: expect.any(String),
    });

    const resLimit0 = await request(app)
      .get("/api/v1/dashboard/recent?limit=0")
      .set("Authorization", `Bearer ${token}`);
    expect(resLimit0.status).toBe(400);
    expect(resLimit0.body).toMatchObject({
      success: false,
      message: expect.any(String),
    });
  });

  it("should return null for category details if the category was deleted", async () => {
    const { token } = await createAuthenticatedUser();

    const cat = await request(app)
      .post("/api/v1/categories")
      .set("Authorization", `Bearer ${token}`)
      .send({ name: "temp" });

    await request(app)
      .post("/api/v1/transactions")
      .set("Authorization", `Bearer ${token}`)
      .send({
        type: "expense",
        amount: 200,
        categoryId: cat.body.data.id,
        transactionDate: new Date().toISOString(),
      });
    await request(app)
      .delete(`/api/v1/categories/${cat.body.data.id}`)
      .set("Authorization", `Bearer ${token}`);

    const response = await request(app)
      .get("/api/v1/dashboard/recent")
      .set("Authorization", `Bearer ${token}`);

    const deletedCategoryTx = response.body.data.find(
      (t: LocalRecentTransaction) => t.amount === 200,
    );
    expect(deletedCategoryTx).toMatchObject({
      categoryId: null,
      categoryName: null,
    });
  });
});
