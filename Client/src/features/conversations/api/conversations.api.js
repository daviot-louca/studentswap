import client from "../../../shared/lib/api";

export async function getConversations() {
  const { data } = await client.get("/conversations");

  return (
    data?.conversations ??
    data?.data ??
    (Array.isArray(data) ? data : [])
  );
}

export async function getConversation(id) {
  const { data } = await client.get(`/conversations/${id}`);

  return (
    data?.conversation ??
    data?.data ??
    data
  );
}

export async function getConversationMessages(id) {
  const { data } = await client.get(
    `/conversations/${id}/messages`,
  );

  return (
    data?.messages ??
    data?.data ??
    (Array.isArray(data) ? data : [])
  );
}

export async function sendMessage(conversationId, content) {
  const { data } = await client.post(
    `/conversations/${conversationId}/messages`,
    {
      contenu: content,
    },
  );

  return (
    data?.message ??
    data?.data ??
    data
  );
}