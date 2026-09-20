import { useState } from "react";

function MessageInput({
  onSend,
  isSending,
}) {
  const [message, setMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const value = message.trim();

    if (!value || isSending) {
      return;
    }

    await onSend(value);

    setMessage("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="sticky bottom-0 flex items-end gap-2 border-t border-gray-100 bg-white p-3"
    >
      <textarea
        value={message}
        onChange={(event) =>
          setMessage(event.target.value)
        }
        onKeyDown={(event) => {
          if (
            event.key === "Enter" &&
            !event.shiftKey
          ) {
            event.preventDefault();
            handleSubmit(event);
          }
        }}
        rows={1}
        placeholder="Écrire un message..."
        className="max-h-32 min-h-11 flex-1 resize-none rounded-2xl border border-gray-200 bg-background px-4 py-3 text-sm text-text outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
      />

      <button
        type="submit"
        disabled={!message.trim() || isSending}
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary text-lg text-white transition hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-50"
        aria-label="Envoyer"
      >
        {isSending ? "…" : "↑"}
      </button>
    </form>
  );
}

export default MessageInput;