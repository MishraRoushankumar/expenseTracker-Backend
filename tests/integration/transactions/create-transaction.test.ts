import request from "supertest";
import { beforeEach, describe, expect, it } from "vitest";
import app from "../test-app.js";
import { truncateAllTables } from "../test-db.js";
import { createAuthenticatedUser } from "../helpers/auth.helper.js";

const now = new Date();

const transactionDate = now.toISOString();

describe("POST /api/v1/transactions", () => {
  beforeEach(async () => {
    await truncateAllTables();
  });

  it("should create a valid transaction", async () => {
    const { token } = await createAuthenticatedUser();

    const response = await request(app)
      .post("/api/v1/transactions")
      .set("Authorization", `Bearer ${token}`)
      .send({
        type: "income",
        amount: 5000,
        transactionDate,
        description: "Salary",
      });

    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);
    expect(response.body.data.amount).toBe(5000);
  });

  it("should reject transactions with a non-existent category", async () => {
    const { token } = await createAuthenticatedUser();

    const response = await request(app)
      .post("/api/v1/transactions")
      .set("Authorization", `Bearer ${token}`)
      .send({
        type: "expense",
        amount: 100,
        categoryId: 9999,
        transactionDate,
      });

    expect(response.status).toBe(404);
    expect(response.body.success).toBe(false);
  });

  it("should reject negative amounts", async () => {
    const { token } = await createAuthenticatedUser();

    const response = await request(app)
      .post("/api/v1/transactions")
      .set("Authorization", `Bearer ${token}`)
      .send({
        type: "expense",
        amount: -50,
        transactionDate,
      });

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
  });
});
