import { describe, it, expect } from "vitest";
import request from "supertest";
import app from "../src/app.js";

const INVALID_ID = "99999999-9999-4999-8999-999999999999";

const login = async () => {
  const response = await request(app)
    .post("/api/auth/login")
    .send({
      email: "louca@studentswap.test",
      password: "StudentSwap123!",
    });

  return response.body.token;
};

describe("VILLES", () => {
  it("doit récupérer les villes", async () => {
    const token = await login();

    const response = await request(app)
      .get("/api/villes")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
  });

  it("doit refuser une ville inexistante", async () => {
    const token = await login();

    const response = await request(app)
      .get(`/api/villes/${INVALID_ID}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(404);
  });
});