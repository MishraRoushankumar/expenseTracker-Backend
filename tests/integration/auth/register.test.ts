import request from "supertest";
import { beforeEach, describe, expect, it } from "vitest";

import app from "../test-app.js";
import { db } from "../../../src/db/index.js";
import { truncateAllTables } from "../test-db.js";
import { users } from "../../../src/db/schema/index.js";
import { eq, sql } from "drizzle-orm";

describe("POST /api/v1/auth/register", () => {
  const validUser = {
    email: "john@example.com",
    password: "Password123",
    firstName: "John",
    lastName: "Doe",
  };

  beforeEach(async () => {
    await truncateAllTables();
  });

  it("should register a new user", async () => {
    const response = await request(app)
      .post("/api/v1/auth/register")
      .send(validUser);

    expect(response.status).toBe(200);

    expect(response.body).toEqual({
      success: true,
      message: "User registered successfully",
    });

    const result = await db
      .select()
      .from(users)
      .where(eq(users.email, validUser.email));

    expect(result).toHaveLength(1);

    expect(result[0].email).toBe(validUser.email);
    expect(result[0].firstName).toBe(validUser.firstName);
    expect(result[0].lastName).toBe(validUser.lastName);
    expect(result[0].role).toBe("user");

    expect(result[0].passwordHash).not.toBe(validUser.password);
  });

  it("should reject duplicate email", async () => {
    await request(app).post("/api/v1/auth/register").send(validUser);

    const response = await request(app)
      .post("/api/v1/auth/register")
      .send(validUser);

    expect(response.status).toBe(409);

    expect(response.body.success).toBe(false);

    const result = await db
      .select({
        count: sql<number>`count(*)`,
      })
      .from(users)
      .where(eq(users.email, validUser.email));

    expect(Number(result[0].count)).toBe(1);
  });

  it("should reject invalid email", async () => {
    const response = await request(app)
      .post("/api/v1/auth/register")
      .send({
        ...validUser,
        email: "invalid-email",
      });

    expect(response.status).toBe(400);

    expect(response.body.success).toBe(false);
  });

  it("should reject weak password", async () => {
    const response = await request(app)
      .post("/api/v1/auth/register")
      .send({
        ...validUser,
        password: "123",
      });

    expect(response.status).toBe(400);

    expect(response.body.success).toBe(false);
  });

  it("should reject missing required fields", async () => {
    const response = await request(app).post("/api/v1/auth/register").send({});

    expect(response.status).toBe(400);

    expect(response.body.success).toBe(false);
  });

  it("should reject invalid payload types", async () => {
    const response = await request(app).post("/api/v1/auth/register").send({
      email: 123,
      password: true,
      firstName: [],
      lastName: {},
    });

    expect(response.status).toBe(400);

    expect(response.body.success).toBe(false);
  });
});
