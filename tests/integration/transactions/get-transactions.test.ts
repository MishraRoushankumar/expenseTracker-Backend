import request from "supertest";
import { beforeEach, describe, expect, it } from "vitest";
import app from "../test-app.js";
import { truncateAllTables } from "../test-db.js";
import { createAuthenticatedUser } from "../helpers/auth.helper.js";

describe("GET /api/v1/transactions", () => {
  beforeEach(async () => {
    await truncateAllTables();
  });

  it("should fetch transactions with default pagination", async () => {
    const { token } = await createAuthenticatedUser();

    await request(app)
      .post("/api/v1/transactions")
      .set("Authorization", `Bearer ${token}`)
      .send({
        type: "income",
        amount: 1000,
        transactionDate: "2026-07-01T10:00:00.000Z",
      });

    const response = await request(app)
      .get("/api/v1/transactions")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.data).toHaveLength(1);
    expect(response.body.pagination.page).toBe(1);
    expect(response.body.pagination.totalItems).toBe(1);
  });

  it("should filter transactions by type", async () => {
    const { token } = await createAuthenticatedUser();

    await request(app)
      .post("/api/v1/transactions")
      .set("Authorization", `Bearer ${token}`)
      .send({
        type: "income",
        amount: 1000,
        transactionDate: "2026-07-01T10:00:00.000Z",
      });

    await request(app)
      .post("/api/v1/transactions")
      .set("Authorization", `Bearer ${token}`)
      .send({
        type: "expense",
        amount: 500,
        transactionDate: "2026-07-02T10:00:00.000Z",
      });

    const response = await request(app)
      .get("/api/v1/transactions?type=expense")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.data).toHaveLength(1);
    expect(response.body.data[0].type).toBe("expense");
  });

  it("should isolate transactions between users", async () => {
    const user1 = await createAuthenticatedUser({ email: "user1@example.com" });
    const user2 = await createAuthenticatedUser({ email: "user2@example.com" });

    await request(app)
      .post("/api/v1/transactions")
      .set("Authorization", `Bearer ${user1.token}`)
      .send({
        type: "income",
        amount: 1000,
        transactionDate: "2026-07-01T10:00:00.000Z",
      });

    const response = await request(app)
      .get("/api/v1/transactions")
      .set("Authorization", `Bearer ${user2.token}`);

    expect(response.status).toBe(200);
    expect(response.body.data).toHaveLength(0);
  });
});
