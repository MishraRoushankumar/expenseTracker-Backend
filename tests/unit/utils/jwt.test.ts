import { describe, expect, it } from "vitest";

import { generateToken, verifyToken } from "../../../src/utils/auth/jwt";

describe("JWT Utilities", () => {
  const payload = {
    userId: 1,
    email: "john@example.com",
    role: "user",
  } as const;

  describe("generateToken", () => {
    it("should generate a JWT token", () => {
      const token = generateToken(payload);

      expect(token).toBeTypeOf("string");
      expect(token.length).toBeGreaterThan(0);
    });
  });

  describe("verifyToken", () => {
    it("should verify a valid token", () => {
      const token = generateToken(payload);

      const decoded = verifyToken(token);

      expect(decoded.userId).toBe(payload.userId);
      expect(decoded.email).toBe(payload.email);
      expect(decoded.role).toBe(payload.role);
    });

    it("should throw for an invalid token", () => {
      expect(() => verifyToken("invalid-token")).toThrow();
    });
  });
});
