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

describe("PHOTOS UTILISATEURS", () => {
  it("doit refuser l'ajout sans authentification", async () => {
    const response = await request(app)
      .post("/api/userPhotos")
      .send({});

    expect(response.status).toBe(401);
  });

  it("doit refuser une donnée invalide", async () => {
    const token = await login();

    const response = await request(app)
      .post("/api/userPhotos")
      .set("Authorization", `Bearer ${token}`)
      .send({});

    expect(response.status).not.toBe(500);
    expect(response.status).toBeGreaterThanOrEqual(400);
  });
});