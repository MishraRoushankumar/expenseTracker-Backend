import request from "supertest";
import { beforeEach, describe, expect, it } from "vitest";

import app from "../test-app.js";
import { truncateAllTables } from "../test-db.js";
import { createAuthenticatedUser } from "../helpers/auth.helper.js";

describe("GET /api/v1/users/profile", () => {
  beforeEach(async () => {
    await truncateAllTables();
  });

  it("should return the authenticated user's profile", async () => {
    const { token, user } = await createAuthenticatedUser();

    const response = await request(app)
      .get("/api/v1/users/profile")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);

    expect(response.body.success).toBe(true);

    expect(response.body.message).toBe("Profile fetched successfully");

    expect(response.body.data).toEqual({
      id: expect.any(Number),
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: "user",
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
    });

    expect(response.body.data.passwordHash).toBeUndefined();
  });

  it("should reject requests without an authorization header", async () => {
    const response = await request(app).get("/api/v1/users/profile");

    expect(response.status).toBe(401);

    expect(response.body.success).toBe(false);
  });

  it("should reject requests with an invalid token", async () => {
    const response = await request(app)
      .get("/api/v1/users/profile")
      .set("Authorization", "Bearer invalid-token");

    expect(response.status).toBe(401);

    expect(response.body.success).toBe(false);
  });

  it("should reject malformed authorization headers", async () => {
    const response = await request(app)
      .get("/api/v1/users/profile")
      .set("Authorization", "invalid-token");

    expect(response.status).toBe(401);

    expect(response.body.success).toBe(false);
  });

  it("should reject empty bearer tokens", async () => {
    const response = await request(app)
      .get("/api/v1/users/profile")
      .set("Authorization", "Bearer ");

    expect(response.status).toBe(401);

    expect(response.body.success).toBe(false);
  });
});
