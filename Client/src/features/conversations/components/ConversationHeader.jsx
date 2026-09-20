import { useNavigate } from "react-router-dom";

import {
  getConversationTitle,
  getConversationUser,
  getUserAvatar,
} from "../utils/conversations.utils";

function ConversationHeader({ conversation }) {
  const navigate = useNavigate();

  const title = getConversationTitle(conversation);
  const user = getConversationUser(conversation);
  const avatar = getUserAvatar(user);

  return (
    <header className="sticky top-0 z-20 flex items-center gap-3 border-b border-gray-100 bg-white px-4 py-3">
      <button
        type="button"
        onClick={() => navigate("/messages")}
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-background text-xl transition hover:scale-105"
        aria-label="Retour"
      >
        ←
      </button>

      {avatar ? (
        <img
          src={avatar}
          alt={title}
          className="h-10 w-10 rounded-full object-cover"
        />
      ) : (
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 font-bold text-primary">
          {title.charAt(0).toUpperCase()}
        </div>
      )}

      <div className="min-w-0">
        <h1 className="truncate text-base font-bold text-text">
          {title}
        </h1>

        <p className="text-xs text-muted">
          StudentSwap
        </p>
      </div>
    </header>
  );
}

export default ConversationHeader;