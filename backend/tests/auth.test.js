import { describe, it, expect } from "vitest";
import request from "supertest";

import app from "../src/app.js";

describe("AUTH - Authentification", () => {
  it("doit permettre de créer un utilisateur", async () => {
    const email = `test-${Date.now()}@studentswap.test`;

    const response = await request(app)
      .post("/api/auth/register")
      .send({
        prenom: "Test",
        nom: "Utilisateur",
        pseudo: `testeur${Date.now()}`,
        email,
        password: "StudentSwap123!",
        Id_villes: "11111111-1111-4111-8111-111111111111",
      });

    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);
  });

  it("doit refuser une inscription avec un email invalide", async () => {
    const response = await request(app)
      .post("/api/auth/register")
      .send({
        prenom: "Test",
        nom: "Utilisateur",
        pseudo: "testinvalide",
        email: "email-invalide",
        password: "StudentSwap123!",
        Id_villes: "11111111-1111-4111-8111-111111111111",
      });

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
  });

  it("doit permettre à un utilisateur de se connecter", async () => {
    const response = await request(app)
      .post("/api/auth/login")
      .send({
        email: "louca@studentswap.test",
        password: "StudentSwap123!",
      });

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.token).toBeDefined();
expect(typeof response.body.token).toBe("string");
  });

  it("doit refuser une connexion avec un mauvais mot de passe", async () => {
    const response = await request(app)
      .post("/api/auth/login")
      .send({
        email: "louca@studentswap.test",
        password: "MauvaisMotDePasse123!",
      });

    expect(response.status).toBe(401);
    expect(response.body.success).toBe(false);
  });

  it("doit refuser une connexion avec un email inexistant", async () => {
    const response = await request(app)
      .post("/api/auth/login")
      .send({
        email: "inexistant@studentswap.test",
        password: "StudentSwap123!",
      });

    expect(response.status).toBe(401);
    expect(response.body.success).toBe(false);
  });

  it("doit refuser /me sans token JWT", async () => {
    const response = await request(app)
      .get("/api/auth/me");

    expect(response.status).toBe(401);
    expect(response.body.success).toBe(false);
  });

  it("doit refuser /me avec un token invalide", async () => {
    const response = await request(app)
      .get("/api/auth/me")
      .set(
        "Authorization",
        "Bearer ceci-est-un-faux-token",
      );

    expect(response.status).toBe(401);
    expect(response.body.success).toBe(false);
  });
});