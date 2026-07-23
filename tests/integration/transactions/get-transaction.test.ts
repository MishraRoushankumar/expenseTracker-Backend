import request from "supertest";
import { beforeEach, describe, expect, it } from "vitest";
import app from "../test-app.js";
import { truncateAllTables } from "../test-db.js";
import { createAuthenticatedUser } from "../helpers/auth.helper.js";

describe("GET /api/v1/transactions/:id", () => {
  beforeEach(async () => {
    await truncateAllTables();
  });

  it("should fetch a specific transaction by ID", async () => {
    const { token } = await createAuthenticatedUser();

    const createRes = await request(app)
      .post("/api/v1/transactions")
      .set("Authorization", `Bearer ${token}`)
      .send({
        type: "income",
        amount: 2000,
        transactionDate: "2026-07-01T10:00:00.000Z",
      });

    const transactionId = createRes.body.data.id;

    const response = await request(app)
      .get(`/api/v1/transactions/${transactionId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.data.id).toBe(transactionId);
    expect(response.body.data.amount).toBe(2000);
  });

  it("should return 404 for a non-existent transaction", async () => {
    const { token } = await createAuthenticatedUser();

    const response = await request(app)
      .get("/api/v1/transactions/9999")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(404);
    expect(response.body.success).toBe(false);
  });
});
