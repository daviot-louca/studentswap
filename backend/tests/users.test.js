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

describe("USERS - Utilisateurs", () => {
  it("doit permettre de récupérer son profil", async () => {
    const token = await login();

    const loginResponse = await request(app)
      .post("/api/auth/login")
      .send({
        email: "louca@studentswap.test",
        password: "StudentSwap123!",
      });

    const userId = loginResponse.body.user.Id_users;

    const response = await request(app)
      .get(`/api/users/${userId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
  });

  it("doit refuser l'accès sans token", async () => {
    const response = await request(app)
      .get("/api/users/11111111-1111-4111-8111-111111111111");

    expect(response.status).toBe(401);
    expect(response.body.success).toBe(false);
  });

  it("doit refuser un token invalide", async () => {
    const response = await request(app)
      .get("/api/users/11111111-1111-4111-8111-111111111111")
      .set("Authorization", "Bearer faux-token");

    expect(response.status).toBe(401);
    expect(response.body.success).toBe(false);
  });

  it("doit refuser un utilisateur inexistant", async () => {
    const token = await login();

    const response = await request(app)
      .get("/api/users/99999999-9999-4999-8999-999999999999")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(404);
    expect(response.body.success).toBe(false);
  });

  it("doit permettre de modifier son profil", async () => {
    const token = await login();

    const response = await request(app)
      .patch("/api/users/me")
      .set("Authorization", `Bearer ${token}`)
      .send({
        prenom: "Louca",
        nom: "Daviot",
        pseudo: `testeur${Date.now()}`,
      });

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
  });

  it("doit refuser des données de profil invalides", async () => {
    const token = await login();

    const response = await request(app)
      .patch("/api/users/me")
      .set("Authorization", `Bearer ${token}`)
      .send({
        prenom: "",
      });

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
  });

  it("doit refuser l'accès à la liste des utilisateurs sans rôle admin", async () => {
    const token = await login();

    const response = await request(app)
      .get("/api/users")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(403);
    expect(response.body.success).toBe(false);
  });
});