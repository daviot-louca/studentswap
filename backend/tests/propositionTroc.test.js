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

describe("PROPOSITIONS TROC", () => {
  it("doit refuser la liste sans authentification", async () => {
    const response = await request(app)
      .get("/api/propositionTroc");

    expect(response.status).toBe(401);
  });

  it("doit récupérer ses propositions", async () => {
    const token = await login();

    const response = await request(app)
      .get("/api/propositionTroc")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
  });

  it("doit refuser une création sans authentification", async () => {
    const response = await request(app)
      .post("/api/propositionTroc")
      .send({});

    expect(response.status).toBe(401);
  });

  it("doit refuser des données invalides", async () => {
    const token = await login();

    const response = await request(app)
      .post("/api/propositionTroc")
      .set("Authorization", `Bearer ${token}`)
      .send({});

    expect(response.status).toBe(400);
  });
});