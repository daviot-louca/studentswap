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

describe("REPORTS", () => {
  it("doit refuser la création sans authentification", async () => {
    const response = await request(app)
      .post("/api/reports")
      .send({});

    expect(response.status).toBe(401);
  });

  it("doit refuser la liste sans authentification", async () => {
    const response = await request(app)
      .get("/api/reports");

    expect(response.status).toBe(401);
  });

  it("doit refuser la liste à un utilisateur normal", async () => {
    const token = await login();

    const response = await request(app)
      .get("/api/reports")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(403);
  });

  it("doit refuser un signalement invalide", async () => {
    const token = await login();

    const response = await request(app)
      .post("/api/reports")
      .set("Authorization", `Bearer ${token}`)
      .send({});

    expect(response.status).toBe(400);
  });
});