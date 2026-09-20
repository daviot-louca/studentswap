function ArticleDetailError({ message, onBack }) {
    return (
      <main className="min-h-screen bg-background px-4 py-6 text-text">
        <div className="mx-auto flex min-h-[70vh] max-w-2xl flex-col items-center justify-center text-center">
          <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-3xl bg-white text-3xl shadow-sm">
            📦
          </div>
  
          <h1 className="text-xl font-bold">
            Article introuvable
          </h1>
  
          <p className="mt-2 max-w-sm text-sm leading-5 text-muted">
            {message ||
              "Cet article n'existe pas ou n'est plus disponible."}
          </p>
  
          <button
            type="button"
            onClick={onBack}
            className="mt-6 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-white transition hover:bg-primary-dark"
          >
            Retour
          </button>
        </div>
      </main>
    );
  }
  
  export default ArticleDetailError;