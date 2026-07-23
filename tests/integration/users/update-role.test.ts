import request from "supertest";
import { beforeEach, describe, expect, it } from "vitest";
import { eq } from "drizzle-orm";
import app from "../test-app.js";
import { truncateAllTables } from "../test-db.js";
import { createAuthenticatedUser } from "../helpers/auth.helper.js";
import { db } from "../../../src/db/index.js";
import { users } from "../../../src/db/schema/index.js";

describe("PATCH /api/v1/users/:id/role", () => {
  beforeEach(async () => {
    await truncateAllTables();
  });

  const setupAdminUser = async () => {
    const data = await createAuthenticatedUser({
      email: "admin@example.com",
    });

    await db
      .update(users)
      .set({ role: "admin" })
      .where(eq(users.email, data.user.email));

    const loginRes = await request(app)
      .post("/api/v1/auth/login")
      .send({ email: "admin@example.com", password: "Password123" });

    return { ...data, token: loginRes.body.data.accessToken };
  };

  const setupMaintainerUser = async () => {
    const data = await createAuthenticatedUser({
      email: "maintainer@example.com",
    });

    await db
      .update(users)
      .set({ role: "maintainer" })
      .where(eq(users.email, data.user.email));

    const loginRes = await request(app)
      .post("/api/v1/auth/login")
      .send({ email: "maintainer@example.com", password: "Password123" });

    return { ...data, token: loginRes.body.data.accessToken };
  };

  it("should allow an admin to update a user's role", async () => {
    const { token: adminToken } = await setupAdminUser();

    await createAuthenticatedUser({
      email: "target@example.com",
    });

    const targetUserInDb = await db
      .select()
      .from(users)
      .where(eq(users.email, "target@example.com"));
    const targetUserId = targetUserInDb[0].id;

    const response = await request(app)
      .patch(`/api/v1/users/${targetUserId}/role`)
      .set("Authorization", `Bearer ${adminToken}`)
      .send({ role: "maintainer" });

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data.role).toBe("maintainer");
  });

  it("should block a maintainer from updating roles", async () => {
    const { token: maintainerToken } = await setupMaintainerUser();

    await createAuthenticatedUser({
      email: "target@example.com",
    });

    const targetUserInDb = await db
      .select()
      .from(users)
      .where(eq(users.email, "target@example.com"));
    const targetUserId = targetUserInDb[0].id;

    const response = await request(app)
      .patch(`/api/v1/users/${targetUserId}/role`)
      .set("Authorization", `Bearer ${maintainerToken}`)
      .send({ role: "admin" });

    expect(response.status).toBe(403);
    expect(response.body.success).toBe(false);
  });

  it("should block a regular user from updating roles", async () => {
    const { token: regularToken } = await createAuthenticatedUser({
      email: "regular@example.com",
    });

    await createAuthenticatedUser({
      email: "target@example.com",
    });

    const targetUserInDb = await db
      .select()
      .from(users)
      .where(eq(users.email, "target@example.com"));
    const targetUserId = targetUserInDb[0].id;

    const response = await request(app)
      .patch(`/api/v1/users/${targetUserId}/role`)
      .set("Authorization", `Bearer ${regularToken}`)
      .send({ role: "admin" });

    expect(response.status).toBe(403);
    expect(response.body.success).toBe(false);
  });
});
