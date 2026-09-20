import { describe, it, expect } from "vitest";
import request from "supertest";
import app from "../src/app.js";

const ARTICLE_ID = "90000000-0000-4000-8000-000000000001";

describe("PHOTOS ARTICLES", () => {
  it("doit refuser l'ajout sans authentification", async () => {
    const response = await request(app)
      .post(`/api/articlePhoto/article/${ARTICLE_ID}`)
      .send({});

    expect(response.status).toBe(401);
  });
});