import request from "supertest";
import { beforeEach, describe, expect, it } from "vitest";
import { eq } from "drizzle-orm";
import app from "../test-app.js";
import { truncateAllTables } from "../test-db.js";
import { createAuthenticatedUser } from "../helpers/auth.helper.js";
import { db } from "../../../src/db/index.js";
import { users } from "../../../src/db/schema/index.js";

describe("DELETE /api/v1/users/:id", () => {
  beforeEach(async () => {
    await truncateAllTables();
  });

  const setupAdminUser = async () => {
    const data = await createAuthenticatedUser({
      email: "admin@example.com",
    });

    const updatedUser = await db
      .update(users)
      .set({ role: "admin" })
      .where(eq(users.email, data.user.email))
      .returning();

    const loginRes = await request(app)
      .post("/api/v1/auth/login")
      .send({ email: "admin@example.com", password: "Password123" });

    return {
      ...data,
      id: updatedUser[0].id,
      token: loginRes.body.data.accessToken,
    };
  };

  const setupMaintainerUser = async () => {
    const data = await createAuthenticatedUser({
      email: "maintainer@example.com",
    });

    const updatedUser = await db
      .update(users)
      .set({ role: "maintainer" })
      .where(eq(users.email, data.user.email))
      .returning();

    const loginRes = await request(app)
      .post("/api/v1/auth/login")
      .send({ email: "maintainer@example.com", password: "Password123" });

    return {
      ...data,
      id: updatedUser[0].id,
      token: loginRes.body.data.accessToken,
    };
  };

  const setupRegularUser = async (email: string) => {
    const data = await createAuthenticatedUser({ email });
    const userInDb = await db
      .select()
      .from(users)
      .where(eq(users.email, email));
    return { ...data, id: userInDb[0].id };
  };

  it("should allow an admin to delete a regular user", async () => {
    const admin = await setupAdminUser();
    const target = await setupRegularUser("target@example.com");

    const response = await request(app)
      .delete(`/api/v1/users/${target.id}`)
      .set("Authorization", `Bearer ${admin.token}`);

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);

    const deletedUser = await db
      .select()
      .from(users)
      .where(eq(users.id, target.id));
    expect(deletedUser).toHaveLength(0);
  });

  it("should allow a maintainer to delete a regular user", async () => {
    const maintainer = await setupMaintainerUser();
    const target = await setupRegularUser("target@example.com");

    const response = await request(app)
      .delete(`/api/v1/users/${target.id}`)
      .set("Authorization", `Bearer ${maintainer.token}`);

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
  });

  it("should block a maintainer from deleting an admin (hierarchy check)", async () => {
    const maintainer = await setupMaintainerUser();
    const admin = await setupAdminUser();

    const response = await request(app)
      .delete(`/api/v1/users/${admin.id}`)
      .set("Authorization", `Bearer ${maintainer.token}`);

    expect(response.status).toBe(403);
    expect(response.body.success).toBe(false);
  });

  it("should block a user from deleting anyone", async () => {
    const regular = await setupRegularUser("regular@example.com");
    const target = await setupRegularUser("target@example.com");

    const response = await request(app)
      .delete(`/api/v1/users/${target.id}`)
      .set("Authorization", `Bearer ${regular.token}`);

    expect(response.status).toBe(403);
    expect(response.body.success).toBe(false);
  });

  it("should prevent an admin from deleting themselves", async () => {
    const admin = await setupAdminUser();

    const response = await request(app)
      .delete(`/api/v1/users/${admin.id}`)
      .set("Authorization", `Bearer ${admin.token}`);

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
  });
});
