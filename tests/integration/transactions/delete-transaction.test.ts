import request from "supertest";
import { beforeEach, describe, expect, it } from "vitest";
import app from "../test-app.js";
import { truncateAllTables } from "../test-db.js";
import { createAuthenticatedUser } from "../helpers/auth.helper.js";

describe("DELETE /api/v1/transactions/:id", () => {
  beforeEach(async () => {
    await truncateAllTables();
  });

  it("should delete an existing transaction", async () => {
    const { token } = await createAuthenticatedUser();

    const createRes = await request(app)
      .post("/api/v1/transactions")
      .set("Authorization", `Bearer ${token}`)
      .send({
        type: "expense",
        amount: 50,
        transactionDate: "2026-07-01T10:00:00.000Z",
      });

    const transactionId = createRes.body.data.id;

    const response = await request(app)
      .delete(`/api/v1/transactions/${transactionId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
  });

  it("should reject deleting someone else's transaction", async () => {
    const user1 = await createAuthenticatedUser({ email: "user1@example.com" });
    const user2 = await createAuthenticatedUser({ email: "user2@example.com" });

    const createRes = await request(app)
      .post("/api/v1/transactions")
      .set("Authorization", `Bearer ${user1.token}`)
      .send({
        type: "expense",
        amount: 50,
        transactionDate: "2026-07-01T10:00:00.000Z",
      });

    const transactionId = createRes.body.data.id;

    const response = await request(app)
      .delete(`/api/v1/transactions/${transactionId}`)
      .set("Authorization", `Bearer ${user2.token}`);

    expect(response.status).toBe(404);
  });
});
