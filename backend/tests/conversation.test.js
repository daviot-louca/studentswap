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

describe("CONVERSATIONS", () => {
  it("doit refuser les conversations sans authentification", async () => {
    const response = await request(app)
      .get("/api/conversations");

    expect(response.status).toBe(401);
  });

  it("doit récupérer ses conversations", async () => {
    const token = await login();

    const response = await request(app)
      .get("/api/conversations")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
  });

  it("doit refuser la création sans authentification", async () => {
    const response = await request(app)
      .post("/api/conversations")
      .send({});

    expect(response.status).toBe(401);
  });

  it("doit refuser un participant invalide", async () => {
    const token = await login();

    const response = await request(app)
      .post("/api/conversations")
      .set("Authorization", `Bearer ${token}`)
      .send({
        participantId: "mauvais-id",
      });

    expect(response.status).toBe(400);
  });

  it("doit refuser une conversation inexistante", async () => {
    const token = await login();

    const response = await request(app)
      .get(`/api/conversations/${INVALID_ID}`)
      .set("Authorization", `Bearer ${token}`);

    expect([403, 404]).toContain(response.status);
  });

  it("doit refuser les messages sans authentification", async () => {
    const response = await request(app)
      .get(`/api/conversations/${INVALID_ID}/messages`);

    expect(response.status).toBe(401);
  });
});