export function getConversationId(conversation) {
  return (
    conversation?.Id_conversations ??
    conversation?.id ??
    conversation?.Id_conversation ??
    null
  );
}

export function getMessageId(message) {
  return (
    message?.Id_messages ??
    message?.id ??
    message?.Id_message ??
    null
  );
}

export function getMessageContent(message) {
  return (
    message?.contenu ??
    message?.content ??
    message?.message ??
    ""
  );
}

export function getMessageDate(message) {
  return (
    message?.createdAt ??
    message?.created_at ??
    message?.date_creation ??
    message?.date ??
    null
  );
}

function getOtherParticipant(conversation) {
  const participants = Array.isArray(conversation?.participants)
    ? conversation.participants
    : [];

  if (participants.length === 0) {
    return null;
  }

  const currentUserId =
    conversation?.currentUser?.Id_users ??
    conversation?.currentUser?.id ??
    conversation?.me?.Id_users ??
    conversation?.me?.id ??
    null;

  const otherParticipant = participants.find((participant) => {
    const participantUser = participant?.user ?? participant;

    const participantUserId =
      participantUser?.Id_users ??
      participantUser?.id ??
      participantUser?.Id_user ??
      null;

    if (!currentUserId || !participantUserId) {
      return true;
    }

    return String(participantUserId) !== String(currentUserId);
  });

  return otherParticipant?.user ?? otherParticipant ?? null;
}

export function getConversationTitle(conversation) {
  const otherUser = getOtherParticipant(conversation);

  if (otherUser) {
    return (
      otherUser?.pseudo ||
      `${otherUser?.prenom || ""} ${otherUser?.nom || ""}`.trim() ||
      "Utilisateur"
    );
  }

  if (conversation?.titre) {
    return conversation.titre;
  }

  if (conversation?.name) {
    return conversation.name;
  }

  const user =
    conversation?.user ??
    conversation?.otherUser ??
    conversation?.participant ??
    conversation?.destinataire;

  if (user) {
    return (
      user?.pseudo ||
      `${user?.prenom || ""} ${user?.nom || ""}`.trim() ||
      "Utilisateur"
    );
  }

  return "Conversation";
}

export function getConversationUser(conversation) {
  const otherUser = getOtherParticipant(conversation);

  if (otherUser) {
    return otherUser;
  }

  return (
    conversation?.user ??
    conversation?.otherUser ??
    conversation?.participant ??
    conversation?.destinataire ??
    null
  );
}

export function getUserName(user) {
  if (!user) {
    return "Utilisateur";
  }

  return (
    user?.pseudo ||
    `${user?.prenom || ""} ${user?.nom || ""}`.trim() ||
    "Utilisateur"
  );
}

export function getUserAvatar(user) {
  return (
    user?.photo ||
    user?.image ||
    user?.avatar ||
    user?.url ||
    null
  );
}

export function formatMessageDate(date) {
  if (!date) {
    return "";
  }

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "";
  }

  return parsedDate.toLocaleTimeString("fr-FR", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function formatConversationDate(date) {
  if (!date) {
    return "";
  }

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "";
  }

  return parsedDate.toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "2-digit",
  });
}

export function isMessageFromCurrentUser(message, currentUser) {
  if (!message || !currentUser) {
    return false;
  }

  const messageUserId =
    message?.Id_users ??
    message?.userId ??
    message?.user?.Id_users ??
    message?.user?.id;

  const currentUserId =
    currentUser?.Id_users ??
    currentUser?.id;

  if (!messageUserId || !currentUserId) {
    return false;
  }

  return String(messageUserId) === String(currentUserId);
}