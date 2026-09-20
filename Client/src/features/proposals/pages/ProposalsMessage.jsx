import { useMemo } from "react";

function getPhotoUrl(article) {
  const photos = Array.isArray(article?.photos)
    ? article.photos
    : [];

  const firstPhoto = photos[0];

  if (typeof firstPhoto === "string") {
    return firstPhoto;
  }

  return (
    firstPhoto?.url ||
    firstPhoto?.URL ||
    firstPhoto?.path ||
    firstPhoto?.chemin ||
    firstPhoto?.src ||
    firstPhoto?.photo ||
    article?.image ||
    null
  );
}

function ArticlePreview({ label, article }) {
  const photo = getPhotoUrl(article);

  return (
    <div className="rounded-2xl bg-background p-3">
      <p className="mb-2 text-xs font-semibold text-muted">
        {label}
      </p>

      <div className="flex items-center gap-3">
        {photo ? (
          <img
            src={photo}
            alt={article?.titre || "Article"}
            className="h-16 w-16 shrink-0 rounded-xl object-cover"
          />
        ) : (
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-white text-2xl">
            📦
          </div>
        )}

        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-bold text-text">
            {article?.titre || "Article sans titre"}
          </p>

          {article?.description && (
            <p className="mt-1 line-clamp-2 text-xs leading-4 text-muted">
              {article.description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

function ProposalsMessage({
  message,
  currentUserId,
  onAccept,
  onRefuse,
  isUpdating = false,
}) {
  const proposition = message?.proposition;

  const type =
    proposition?.type === "don"
      ? "don"
      : "exchange";

  const status =
    proposition?.statut || "en_attente";

  const isOwner = useMemo(() => {
    const ownerId =
      proposition?.article?.Id_users ||
      proposition?.article?.user?.Id_users;

    return Boolean(
      ownerId &&
        currentUserId &&
        String(ownerId) === String(currentUserId),
    );
  }, [proposition, currentUserId]);

  if (!proposition) {
    return null;
  }

  const isPending = status === "en_attente";
  const isAccepted = status === "acceptee";
  const isRefused = status === "refusee";
  const isCancelled = status === "annulee";

  const statusLabel = isAccepted
    ? "Demande acceptée"
    : isRefused
      ? "Demande refusée"
      : isCancelled
        ? "Demande annulée"
        : "En attente de réponse";

  const statusClass = isAccepted
    ? "bg-emerald-50 text-emerald-700"
    : isRefused || isCancelled
      ? "bg-red-50 text-red-600"
      : "bg-amber-50 text-amber-700";

  return (
    <article className="w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-gray-100">
      <div className="p-4 sm:p-5">
        <div className="flex items-start gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-xl">
            {type === "don" ? "🎁" : "🔄"}
          </div>

          <div className="min-w-0 flex-1">
            <h3 className="text-sm font-bold text-text sm:text-base">
              {type === "don"
                ? "Demande de don"
                : "Proposition d'échange"}
            </h3>

            <span
              className={`mt-1 inline-flex rounded-full px-2.5 py-1 text-[11px] font-semibold ${statusClass}`}
            >
              {statusLabel}
            </span>
          </div>
        </div>

        <div className="mt-4 space-y-3">
          <ArticlePreview
            label={
              type === "don"
                ? "Article demandé"
                : "Tu demandes"
            }
            article={proposition.article}
          />

          {type === "exchange" &&
            proposition.articlePropose && (
              <ArticlePreview
                label="Tu proposes"
                article={proposition.articlePropose}
              />
            )}
        </div>

        {proposition.message && (
          <div className="mt-4 rounded-2xl border border-gray-100 bg-white p-3">
            <p className="text-sm leading-5 text-text">
              {proposition.message}
            </p>
          </div>
        )}

        {isPending && isOwner && (
          <div className="mt-4 grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={onRefuse}
              disabled={isUpdating}
              className="min-h-11 rounded-xl border border-gray-200 px-3 py-2 text-sm font-semibold text-text transition active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50"
            >
              Refuser
            </button>

            <button
              type="button"
              onClick={onAccept}
              disabled={isUpdating}
              className="min-h-11 rounded-xl bg-primary px-3 py-2 text-sm font-semibold text-white transition active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isUpdating ? "..." : "Accepter"}
            </button>
          </div>
        )}

        {isPending && !isOwner && (
          <p className="mt-4 rounded-xl bg-background px-3 py-2 text-center text-xs font-medium text-muted">
            En attente de la réponse du propriétaire.
          </p>
        )}
      </div>
    </article>
  );
}

export default ProposalsMessage;