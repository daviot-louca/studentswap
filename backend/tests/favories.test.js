import { describe, it, expect } from "vitest";
import request from "supertest";
import app from "../src/app.js";

const ARTICLE_ID = "90000000-0000-4000-8000-000000000001";

const login = async () => {
  const response = await request(app).post("/api/auth/login").send({
    email: "louca@studentswap.test",
    password: "StudentSwap123!",
  });

  return response.body.token;
};

describe("FAVORIS", () => {
  it("doit refuser la liste sans authentification", async () => {
    const response = await request(app).get("/api/favories");

    expect(response.status).toBe(401);
  });

  it("doit récupérer les favoris", async () => {
    const token = await login();

    const response = await request(app)
      .get("/api/favories")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
  });

  it("doit refuser l'ajout sans authentification", async () => {
    const response = await request(app)
      .post(`/api/favories/${ARTICLE_ID}`)
      .send({});

    expect(response.status).toBe(401);
  });

  it("doit refuser la suppression sans authentification", async () => {
    const response = await request(app).delete(`/api/favories/${ARTICLE_ID}`);

    expect(response.status).toBe(401);
  });
});
