function ArticleDetailHeader({
    isFavorite,
    isFavoriteLoading,
    onBack,
    onFavorite,
  }) {
    return (
      <header className="mb-5 flex items-center justify-between">
        <button
          type="button"
          onClick={onBack}
          className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-xl shadow-sm transition hover:scale-105"
          aria-label="Retour"
        >
          ←
        </button>
  
        <h1 className="text-base font-bold text-rose">
          Détail de l'article
        </h1>
  
        <button
          type="button"
          onClick={onFavorite}
          disabled={isFavoriteLoading}
          className={`flex h-11 w-11 items-center justify-center rounded-full bg-white text-2xl shadow-sm transition hover:scale-105 disabled:cursor-not-allowed disabled:opacity-60 ${
            isFavorite ? "text-primary" : "text-muted"
          }`}
          aria-label={
            isFavorite
              ? "Retirer des favoris"
              : "Ajouter aux favoris"
          }
        >
          {isFavorite ? "♥" : "♡"}
        </button>
      </header>
    );
  }
  
  export default ArticleDetailHeader;