import client from "../../../shared/lib/api";

export async function getProposals() {
  const { data } = await client.get("/propositions");

  return data?.propositions ?? [];
}

export async function getProposal(id) {
  const { data } = await client.get(
    `/propositions/${id}`,
  );

  return data?.proposition ?? null;
}

export async function createProposal(
  articleId,
  message = "",
  type = "exchange",
  articleProposeId = null,
) {
  const { data } = await client.post(
    "/propositions",
    {
      Id_articles: articleId,
      message: message.trim() || undefined,
      type,
      ...(articleProposeId
        ? {
            Id_article_propose:
              articleProposeId,
          }
        : {}),
    },
  );

  return data?.proposition ?? null;
}

export async function updateProposal(
  id,
  statut,
  message,
) {
  const { data } = await client.patch(
    `/propositions/${id}`,
    {
      statut,
      ...(message !== undefined
        ? { message }
        : {}),
    },
  );

  return data?.proposition ?? null;
}

export async function deleteProposal(id) {
  const { data } = await client.delete(
    `/propositions/${id}`,
  );

  return data;
}