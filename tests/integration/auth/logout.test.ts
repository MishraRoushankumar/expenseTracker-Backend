import request from "supertest";
import { beforeEach, describe, expect, it } from "vitest";

import app from "../test-app.js";
import { truncateAllTables } from "../test-db.js";
import { createAuthenticatedUser } from "../helpers/auth.helper.js";

describe("POST /api/v1/auth/logout", () => {
  beforeEach(async () => {
    await truncateAllTables();
  });

  it("should logout successfully", async () => {
    const { token } = await createAuthenticatedUser();

    const response = await request(app)
      .post("/api/v1/auth/logout")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);

    expect(response.body.success).toBe(true);

    expect(response.body.message).toBe("Logged out successfully.");
  });

  it("should reject requests without an authorization header", async () => {
    const response = await request(app).post("/api/v1/auth/logout");

    expect(response.status).toBe(401);

    expect(response.body.success).toBe(false);
  });

  it("should reject invalid tokens", async () => {
    const response = await request(app)
      .post("/api/v1/auth/logout")
      .set("Authorization", "Bearer invalid-token");

    expect(response.status).toBe(401);

    expect(response.body.success).toBe(false);
  });

  it("should reject malformed authorization headers", async () => {
    const response = await request(app)
      .post("/api/v1/auth/logout")
      .set("Authorization", "invalid-token");

    expect(response.status).toBe(401);

    expect(response.body.success).toBe(false);
  });
});
