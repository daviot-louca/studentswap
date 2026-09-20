import { describe, it, expect } from "vitest";
import request from "supertest";
import app from "../src/app.js";

const login = async () => {
  const response = await request(app)
    .post("/api/auth/login")
    .send({
      email: "louca@studentswap.test",
      password: "StudentSwap123!",
    });

  return response.body.token;
};

describe("NOTIFICATIONS", () => {
  it("doit refuser les notifications sans authentification", async () => {
    const response = await request(app)
      .get("/api/notifications");

    expect(response.status).toBe(401);
  });

  it("doit récupérer les notifications", async () => {
    const token = await login();

    const response = await request(app)
      .get("/api/notifications")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
  });
});