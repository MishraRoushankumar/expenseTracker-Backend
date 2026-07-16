import request from "supertest";
import app from "../test-app.ts";

const defaultUser = {
  email: "john@example.com",
  password: "Password123",
  firstName: "John",
  lastName: "Doe",
};

export const createAuthenticatedUser = async (
  overrides: Partial<typeof defaultUser> = {},
) => {
  const user = {
    ...defaultUser,
    ...overrides,
  };

  await request(app).post("/api/v1/auth/register").send(user).expect(200);

  const loginResponse = await request(app)
    .post("/api/v1/auth/login")
    .send({
      email: user.email,
      password: user.password,
    })
    .expect(200);

  return {
    user,
    token: loginResponse.body.data.accessToken,
  };
};
