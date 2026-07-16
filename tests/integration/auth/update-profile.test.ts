import request from "supertest";
import { beforeEach, describe, expect, it } from "vitest";

import app from "../test-app.js";
import { truncateAllTables } from "../test-db.js";
import { createAuthenticatedUser } from "../helpers/auth.helper.js";

describe("PATCH /api/v1/users/profile", () => {
  beforeEach(async () => {
    await truncateAllTables();
  });

  it("should update the authenticated user's profile", async () => {
    const { token } = await createAuthenticatedUser();

    const updateResponse = await request(app)
      .patch("/api/v1/users/profile")
      .set("Authorization", `Bearer ${token}`)
      .send({
        firstName: "Jane",
        lastName: "Smith",
      });

    expect(updateResponse.status).toBe(200);

    expect(updateResponse.body.success).toBe(true);

    expect(updateResponse.body.data.firstName).toBe("Jane");

    expect(updateResponse.body.data.lastName).toBe("Smith");

    const profileResponse = await request(app)
      .get("/api/v1/users/profile")
      .set("Authorization", `Bearer ${token}`);

    expect(profileResponse.status).toBe(200);

    expect(profileResponse.body.data.firstName).toBe("Jane");

    expect(profileResponse.body.data.lastName).toBe("Smith");
  });

  it("should update only the first name", async () => {
    const { token, user } = await createAuthenticatedUser();

    const response = await request(app)
      .patch("/api/v1/users/profile")
      .set("Authorization", `Bearer ${token}`)
      .send({
        firstName: "Jane",
      });

    console.log(response.body);
    expect(response.status).toBe(200);

    expect(response.body.data.firstName).toBe("Jane");

    expect(response.body.data.lastName).toBe(user.lastName);
  });

  it("should update only the last name", async () => {
    const { token, user } = await createAuthenticatedUser();

    const response = await request(app)
      .patch("/api/v1/users/profile")
      .set("Authorization", `Bearer ${token}`)
      .send({
        lastName: "Smith",
      });

    console.log(response.body);

    expect(response.status).toBe(200);

    expect(response.body.data.firstName).toBe(user.firstName);

    expect(response.body.data.lastName).toBe("Smith");
  });

  it("should reject an invalid first name", async () => {
    const { token } = await createAuthenticatedUser();

    const response = await request(app)
      .patch("/api/v1/users/profile")
      .set("Authorization", `Bearer ${token}`)
      .send({
        firstName: "A",
      });

    expect(response.status).toBe(400);

    expect(response.body.success).toBe(false);
  });

  it("should reject an invalid last name", async () => {
    const { token } = await createAuthenticatedUser();

    const response = await request(app)
      .patch("/api/v1/users/profile")
      .set("Authorization", `Bearer ${token}`)
      .send({
        lastName: "B",
      });

    expect(response.status).toBe(400);

    expect(response.body.success).toBe(false);
  });

  it("should reject requests without an authorization header", async () => {
    const response = await request(app).patch("/api/v1/users/profile").send({
      firstName: "Jane",
    });

    expect(response.status).toBe(401);

    expect(response.body.success).toBe(false);
  });

  it("should reject requests with an invalid token", async () => {
    const response = await request(app)
      .patch("/api/v1/users/profile")
      .set("Authorization", "Bearer invalid-token")
      .send({
        firstName: "Jane",
      });

    expect(response.status).toBe(401);

    expect(response.body.success).toBe(false);
  });

  it("should reject malformed authorization headers", async () => {
    const response = await request(app)
      .patch("/api/v1/users/profile")
      .set("Authorization", "invalid-token")
      .send({
        firstName: "Jane",
      });

    expect(response.status).toBe(401);

    expect(response.body.success).toBe(false);
  });
});
