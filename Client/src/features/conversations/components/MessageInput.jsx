import { useRef, useState } from "react";

function MessageInput({
  onSend,
  isSending,
}) {
  const [message, setMessage] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const fileInputRef = useRef(null);

  const handleImageChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    if (!file.type.startsWith("image/")) {
      event.target.value = "";
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      event.target.value = "";
      return;
    }

    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
    }

    setSelectedImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const removeImage = () => {
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
    }

    setSelectedImage(null);
    setImagePreview("");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const value = message.trim();

    if ((!value && !selectedImage) || isSending) {
      return;
    }

    await onSend({
      contenu: value,
      photo: selectedImage,
    });

    setMessage("");
    removeImage();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="sticky bottom-0 border-t border-gray-100 bg-white p-3"
    >
      {imagePreview && (
        <div className="relative mb-3 w-fit">
          <img
            src={imagePreview}
            alt="Aperçu de la photo"
            className="h-24 w-24 rounded-2xl object-cover"
          />

          <button
            type="button"
            onClick={removeImage}
            disabled={isSending}
            className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full bg-black text-sm text-white shadow disabled:opacity-50"
            aria-label="Supprimer la photo"
          >
            ×
          </button>
        </div>
      )}

      <div className="flex items-end gap-2">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          onChange={handleImageChange}
          className="hidden"
        />

        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={isSending}
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-background text-lg text-text transition hover:bg-primary/10 disabled:cursor-not-allowed disabled:opacity-50"
          aria-label="Ajouter une photo"
          title="Ajouter une photo"
        >
          📷
        </button>

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
          disabled={isSending}
          className="max-h-32 min-h-11 flex-1 resize-none rounded-2xl border border-gray-200 bg-background px-4 py-3 text-sm text-text outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 disabled:opacity-60"
        />

        <button
          type="submit"
          disabled={
            (!message.trim() && !selectedImage) ||
            isSending
          }
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary text-lg text-white transition hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-50"
          aria-label="Envoyer"
        >
          {isSending ? "…" : "↑"}
        </button>
      </div>
    </form>
  );
}

export default MessageInput;