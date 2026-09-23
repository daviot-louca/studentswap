import {
  formatMessageDate,
  getMessageContent,
  getMessageDate,
  isMessageFromCurrentUser,
} from "../utils/conversations.utils";

function MessageBubble({
  message,
  currentUser,
}) {
  const isMine = isMessageFromCurrentUser(
    message,
    currentUser,
  );

  const content = getMessageContent(message);

  const date = formatMessageDate(
    getMessageDate(message),
  );

  const photoUrl = message?.photo_url
    ? message.photo_url.startsWith("http://") ||
      message.photo_url.startsWith("https://")
      ? message.photo_url
      : `${import.meta.env.VITE_API_URL ||
      "http://localhost:3000"
      }${message.photo_url}`
    : null;

  return (
    <div
      className={`flex ${isMine
          ? "justify-end"
          : "justify-start"
        }`}
    >
      <div
        className={`max-w-[80%] overflow-hidden rounded-2xl px-4 py-3 ${isMine
            ? "rounded-br-md bg-primary text-white"
            : "rounded-bl-md bg-white text-text shadow-sm"
          }`}
      >
        {photoUrl && (
          <img
            src={photoUrl}
            alt="Photo envoyée"
            className="mb-2 max-h-72 max-w-full rounded-xl object-cover"
            onError={(event) => {
              console.error(
                "❌ Impossible de charger la photo du message :",
                {
                  photoUrl,
                  message,
                },
              );

              event.currentTarget.style.display =
                "none";
            }}
          />
        )}

        {content && (
          <p className="whitespace-pre-wrap wrap-break-word text-sm leading-5">
            {content}
          </p>
        )}

        {date && (
          <p
            className={`mt-1 text-[10px] ${isMine
                ? "text-white/70"
                : "text-muted"
              }`}
          >
            {date}
          </p>
        )}
      </div>
    </div>
  );
}

export default MessageBubble;