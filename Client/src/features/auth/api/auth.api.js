import client from "../../../shared/lib/api";

export async function register(userData) {
  const { data } = await client.post("/auth/register", userData);
  return data;
}

export async function login(credentials) {
  try {
    const { data } = await client.post("/auth/login", credentials);
    return data;
  } catch (error) {
    console.error("Erreur login API :", error.response?.data);
    throw error;
  }
}