import request from "supertest";
import { beforeEach, describe, expect, it } from "vitest";
import app from "../test-app.js";
import { truncateAllTables } from "../test-db.js";
import { createAuthenticatedUser } from "../helpers/auth.helper.js";

describe("GET /api/v1/categories", () => {
  beforeEach(async () => {
    await truncateAllTables();
  });

  it("should fetch only the authenticated user's categories", async () => {
    const user1 = await createAuthenticatedUser({ email: "user1@example.com" });
    const user2 = await createAuthenticatedUser({ email: "user2@example.com" });

    await request(app)
      .post("/api/v1/categories")
      .set("Authorization", `Bearer ${user1.token}`)
      .send({ name: "User1Category" });

    await request(app)
      .post("/api/v1/categories")
      .set("Authorization", `Bearer ${user2.token}`)
      .send({ name: "User2Category" });

    const response = await request(app)
      .get("/api/v1/categories")
      .set("Authorization", `Bearer ${user1.token}`);

    expect(response.status).toBe(200);
    expect(response.body.data).toHaveLength(1);
    expect(response.body.data[0].name).toBe("user1category");
  });
});
