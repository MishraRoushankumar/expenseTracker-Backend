import request from "supertest";
import { beforeEach, describe, expect, it } from "vitest";
import app from "../test-app.js";
import { truncateAllTables } from "../test-db.js";
import { createAuthenticatedUser } from "../helpers/auth.helper.js";

describe("POST /api/v1/categories", () => {
  beforeEach(async () => {
    await truncateAllTables();
  });

  it("should create a new category", async () => {
    const { token } = await createAuthenticatedUser();

    const response = await request(app)
      .post("/api/v1/categories")
      .set("Authorization", `Bearer ${token}`)
      .send({ name: "Groceries" });

    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);
    expect(response.body.data.name).toBe("groceries");
  });

  it("should reject duplicate category names for the same user", async () => {
    const { token } = await createAuthenticatedUser();

    await request(app)
      .post("/api/v1/categories")
      .set("Authorization", `Bearer ${token}`)
      .send({ name: "Groceries" });

    const response = await request(app)
      .post("/api/v1/categories")
      .set("Authorization", `Bearer ${token}`)
      .send({ name: "Groceries" });

    expect(response.status).toBe(409);
    expect(response.body.success).toBe(false);
  });

  it("should allow different users to have the same category name", async () => {
    const user1 = await createAuthenticatedUser({ email: "user1@example.com" });
    const user2 = await createAuthenticatedUser({ email: "user2@example.com" });

    await request(app)
      .post("/api/v1/categories")
      .set("Authorization", `Bearer ${user1.token}`)
      .send({ name: "Groceries" });

    const response = await request(app)
      .post("/api/v1/categories")
      .set("Authorization", `Bearer ${user2.token}`)
      .send({ name: "Groceries" });

    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);
  });
});
