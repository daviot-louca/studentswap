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
  
    return (
      <div
        className={`flex ${
          isMine ? "justify-end" : "justify-start"
        }`}
      >
        <div
          className={`max-w-[80%] rounded-2xl px-4 py-3 ${
            isMine
              ? "rounded-br-md bg-primary text-white"
              : "rounded-bl-md bg-white text-text shadow-sm"
          }`}
        >
          <p className="whitespace-pre-wrap wrap-break-word text-sm leading-5">
            {content}
          </p>
  
          {date && (
            <p
              className={`mt-1 text-[10px] ${
                isMine
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