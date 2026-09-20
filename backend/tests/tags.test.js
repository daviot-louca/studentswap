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

describe("TAGS", () => {
  it("doit récupérer les tags", async () => {
    const token = await login();

    const response = await request(app)
      .get("/api/tags")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
  });

  it("doit refuser un tag inexistant", async () => {
    const token = await login();

    const response = await request(app)
      .get(`/api/tags/${INVALID_ID}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(404);
  });

  it("doit refuser la création sans authentification", async () => {
    const response = await request(app)
      .post("/api/tags")
      .send({
        nom: "Test",
      });

    expect(response.status).toBe(401);
  });
});