import { describe, it, expect } from "vitest";
import request from "supertest";
import app from "../src/app.js";

describe("NOTATIONS", () => {
  it("doit refuser la création sans authentification", async () => {
    const response = await request(app)
      .post("/api/notations")
      .send({});

    expect(response.status).toBe(401);
  });
});