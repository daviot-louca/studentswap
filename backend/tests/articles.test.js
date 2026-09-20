import { describe, it, expect } from "vitest";
import request from "supertest";
import app from "../src/app.js";

const USER_ID = "80000000-0000-4000-8000-000000000001";
const SUBCATEGORY_ID = "60000000-0000-4000-8000-000000000001";
const ETAT_ID = "70000000-0000-4000-8000-000000000002";
const ARTICLE_ID = "90000000-0000-4000-8000-000000000001";

const login = async () => {
  const response = await request(app).post("/api/auth/login").send({
    email: "louca@studentswap.test",
    password: "StudentSwap123!",
  });

  return {
    token: response.body.token,
    user: response.body.user,
  };
};

describe("ARTICLES - Articles", () => {
  it("doit permettre de récupérer la liste des articles", async () => {
    const { token } = await login();

    const response = await request(app)
      .get("/api/articles")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
  });

  it("doit permettre de récupérer un article existant", async () => {
    const { token } = await login();

    const response = await request(app)
      .get(`/api/articles/${ARTICLE_ID}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
  });

  it("doit refuser un article inexistant", async () => {
    const { token } = await login();

    const response = await request(app)
      .get("/api/articles/99999999-9999-4999-8999-999999999999")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(404);
    expect(response.body.success).toBe(false);
  });

  it("doit refuser la création d'un article sans authentification", async () => {
    const response = await request(app).post("/api/articles").send({
      titre: "Article de test",
      description: "Description de test pour StudentSwap",
      Id_subCategories: SUBCATEGORY_ID,
      Id_etatArticle: ETAT_ID,
    });

    expect(response.status).toBe(401);
    expect(response.body.success).toBe(false);
  });

  it("doit permettre à un utilisateur authentifié de créer un article", async () => {
    const { token } = await login();

    const response = await request(app)
      .post("/api/articles")
      .set("Authorization", `Bearer ${token}`)
      .send({
        titre: `Article test ${Date.now()}`,
        description: "Article créé automatiquement pendant les tests.",
        Id_subCategories: SUBCATEGORY_ID,
        Id_etatArticle: ETAT_ID,
      });

    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);
  });

  it("doit refuser la création avec des données invalides", async () => {
    const { token } = await login();

    const response = await request(app)
      .post("/api/articles")
      .set("Authorization", `Bearer ${token}`)
      .send({
        titre: "",
        description: "",
        Id_subCategories: "mauvais-id",
        Id_etatArticle: "mauvais-id",
      });

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
  });

  it("doit permettre de modifier son article", async () => {
    const { token } = await login();

    const response = await request(app)
      .patch(`/api/articles/${ARTICLE_ID}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        titre: `Chaise modifiée ${Date.now()}`,
        description: "Description modifiée pendant le test.",
      });

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
  });

  it("doit refuser la modification sans authentification", async () => {
    const response = await request(app)
      .patch(`/api/articles/${ARTICLE_ID}`)
      .send({
        titre: "Modification non autorisée",
      });

    expect(response.status).toBe(401);
    expect(response.body.success).toBe(false);
  });

  it("doit refuser la suppression sans authentification", async () => {
    const response = await request(app).delete(`/api/articles/${ARTICLE_ID}`);

    expect(response.status).toBe(401);
    expect(response.body.success).toBe(false);
  });
});
