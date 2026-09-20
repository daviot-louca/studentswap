import client from "../../../shared/lib/api";

export async function getVilles() {
  const { data } = await client.get("/villes");

  return Array.isArray(data) ? data : data.villes ?? [];
}