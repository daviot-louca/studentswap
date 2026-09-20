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

describe("CATEGORIES", () => {
  it("doit permettre de récupérer les catégories", async () => {
    const token = await login();

    const response = await request(app)
      .get("/api/categories")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
  });

  it("doit refuser une catégorie inexistante", async () => {
    const token = await login();

    const response = await request(app)
      .get(`/api/categories/${INVALID_ID}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(404);
    expect(response.body.success).toBe(false);
  });

  it("doit refuser une création sans authentification", async () => {
    const response = await request(app)
      .post("/api/categories")
      .send({
        nom: "Test",
      });

    expect(response.status).toBe(401);
  });
});