import { useNavigate } from "react-router-dom";

import {
  getConversationId,
  getConversationTitle,
  getConversationUser,
  getUserAvatar,
} from "../utils/conversations.utils";

function ConversationItem({ conversation, unreadCount = 0 }) {
  const navigate = useNavigate();

  const id = getConversationId(conversation);
  const title = getConversationTitle(conversation);
  const user = getConversationUser(conversation);
  const avatar = getUserAvatar(user);

  const lastMessage =
    conversation?.lastMessage ??
    conversation?.dernierMessage ??
    conversation?.message ??
    null;

  const preview =
    lastMessage?.contenu ??
    lastMessage?.content ??
    lastMessage?.message ??
    conversation?.lastMessageContent ??
    "Aucun message";

  const date =
    lastMessage?.createdAt ??
    conversation?.updatedAt ??
    conversation?.createdAt ??
    null;

  const unread = Number(unreadCount) || 0;

  const handleClick = () => {
    if (!id) {
      return;
    }

    navigate(`/messages/${id}`);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="flex w-full items-center gap-4 border-b border-gray-100 bg-white px-4 py-4 text-left transition hover:bg-background"
    >
      {avatar ? (
        <img
          src={avatar}
          alt={title}
          className="h-14 w-14 shrink-0 rounded-full object-cover"
        />
      ) : (
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-primary/10 text-lg font-bold text-primary">
          {title.charAt(0).toUpperCase()}
        </div>
      )}

      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-3">
          <h2 className="truncate text-sm font-bold text-text">
            {title}
          </h2>

          {date && (
            <span className="shrink-0 text-xs text-muted">
              {new Date(date).toLocaleDateString("fr-FR", {
                day: "2-digit",
                month: "2-digit",
              })}
            </span>
          )}
        </div>

        <div className="mt-1 flex items-center gap-2">
          <p
            className={`min-w-0 flex-1 truncate text-sm ${
              unread > 0
                ? "font-semibold text-text"
                : "text-muted"
            }`}
          >
            {preview}
          </p>

          {unread > 0 && (
            <span className="flex h-6 min-w-6 shrink-0 items-center justify-center rounded-full bg-primary px-2 text-xs font-bold text-white">
              {unread > 99 ? "99+" : unread}
            </span>
          )}
        </div>
      </div>

      <span className="text-lg text-muted">
        ›
      </span>
    </button>
  );
}

export default ConversationItem;