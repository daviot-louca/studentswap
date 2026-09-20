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

describe("ROLES", () => {
  it("doit refuser l'accès sans authentification", async () => {
    const response = await request(app)
      .get("/api/roles");

    expect(response.status).toBe(401);
  });

  it("doit permettre à un utilisateur authentifié de récupérer les rôles", async () => {
    const token = await login();

    const response = await request(app)
      .get("/api/roles")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
  });
});