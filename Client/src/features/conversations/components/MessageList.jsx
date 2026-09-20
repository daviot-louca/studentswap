import MessageBubble from "./MessageBubble";

function MessageList({
  messages,
  currentUser,
  isLoading,
}) {
  if (isLoading) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <div className="text-sm text-muted">
          Chargement des messages...
        </div>
      </div>
    );
  }

  if (!messages.length) {
    return (
      <div className="flex flex-1 items-center justify-center px-6 text-center">
        <div>
          <div className="text-4xl">
            💬
          </div>

          <p className="mt-3 text-sm font-semibold text-text">
            Aucun message
          </p>

          <p className="mt-1 text-xs text-muted">
            Envoyez le premier message de cette conversation.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 space-y-3 overflow-y-auto px-4 py-5">
      {messages.map((message, index) => (
        <MessageBubble
          key={
            message?.Id_messages ??
            message?.id ??
            index
          }
          message={message}
          currentUser={currentUser}
        />
      ))}
    </div>
  );
}

export default MessageList;