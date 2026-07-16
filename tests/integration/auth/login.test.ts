import request from "supertest";
import { beforeEach, describe, expect, it } from "vitest";

import app from "../test-app.js";
import { truncateAllTables } from "../test-db.js";
import { verifyToken } from "../../../src/utils/auth/jwt.js";

describe("POST /api/v1/auth/login", () => {
  const validUser = {
    email: "john@example.com",
    password: "Password123",
    firstName: "John",
    lastName: "Doe",
  };

  beforeEach(async () => {
    await truncateAllTables();

    await request(app).post("/api/v1/auth/register").send(validUser);
  });

  it("should login successfully", async () => {
    const response = await request(app).post("/api/v1/auth/login").send({
      email: validUser.email,
      password: validUser.password,
    });

    expect(response.status).toBe(200);

    expect(response.body.success).toBe(true);

    expect(response.body.message).toBe("Login successfully");

    expect(response.body.data.accessToken).toBeDefined();

    const payload = verifyToken(response.body.data.accessToken);

    expect(payload.email).toBe(validUser.email);
    expect(payload.role).toBe("user");
    expect(payload.userId).toBeGreaterThan(0);
  });

  it("should reject unknown email", async () => {
    const response = await request(app).post("/api/v1/auth/login").send({
      email: "unknown@example.com",
      password: validUser.password,
    });

    expect(response.status).toBe(401);

    expect(response.body.success).toBe(false);
  });

  it("should reject incorrect password", async () => {
    const response = await request(app).post("/api/v1/auth/login").send({
      email: validUser.email,
      password: "WrongPassword123",
    });

    expect(response.status).toBe(401);

    expect(response.body.success).toBe(false);
  });

  it("should reject invalid email", async () => {
    const response = await request(app).post("/api/v1/auth/login").send({
      email: "invalid-email",
      password: validUser.password,
    });

    expect(response.status).toBe(400);

    expect(response.body.success).toBe(false);
  });

  it("should reject missing password", async () => {
    const response = await request(app).post("/api/v1/auth/login").send({
      email: validUser.email,
    });

    expect(response.status).toBe(400);

    expect(response.body.success).toBe(false);
  });

  it("should reject invalid payload types", async () => {
    const response = await request(app).post("/api/v1/auth/login").send({
      email: 123,
      password: true,
    });

    expect(response.status).toBe(400);

    expect(response.body.success).toBe(false);
  });
});
