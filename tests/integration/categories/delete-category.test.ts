import request from "supertest";
import { beforeEach, describe, expect, it } from "vitest";
import app from "../test-app.js";
import { truncateAllTables } from "../test-db.js";
import { createAuthenticatedUser } from "../helpers/auth.helper.js";

describe("DELETE /api/v1/categories/:id", () => {
  beforeEach(async () => {
    await truncateAllTables();
  });

  it("should delete a category", async () => {
    const { token } = await createAuthenticatedUser();

    const createResponse = await request(app)
      .post("/api/v1/categories")
      .set("Authorization", `Bearer ${token}`)
      .send({ name: "Food" });

    const categoryId = createResponse.body.data.id;

    const deleteResponse = await request(app)
      .delete(`/api/v1/categories/${categoryId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(deleteResponse.status).toBe(200);
  });

  it("should reject deleting a category that belongs to another user", async () => {
    const user1 = await createAuthenticatedUser({ email: "user1@example.com" });
    const user2 = await createAuthenticatedUser({ email: "user2@example.com" });

    const createResponse = await request(app)
      .post("/api/v1/categories")
      .set("Authorization", `Bearer ${user1.token}`)
      .send({ name: "Food" });

    const categoryId = createResponse.body.data.id;

    const deleteResponse = await request(app)
      .delete(`/api/v1/categories/${categoryId}`)
      .set("Authorization", `Bearer ${user2.token}`);

    expect(deleteResponse.status).toBe(404);
  });
});
