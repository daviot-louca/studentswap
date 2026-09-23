function SwipeActions({ onPass, onFavorite, onSwap }) {
    return (
      <div className="flex items-center justify-center gap-4">
        {/* Passer */}
        <button
          type="button"
          onClick={onPass}
          aria-label="Passer cet article"
          className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-red-500 shadow-md ring-1 ring-gray-100 transition hover:scale-105 hover:bg-red-50"
        >
          <img src="/images/croix.webp" alt="croix" />
        </button>
  
        {/* Favori */}
        <button
          type="button"
          onClick={onFavorite}
          aria-label="Ajouter aux favoris"
          className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white shadow-lg shadow-primary/25 transition hover:scale-105 hover:bg-primary-dark"
        >
          <img src="/images/liker.webp" alt="bouton non lijer" />
        </button>
  
        {/* Proposer un troc */}
        <button
          type="button"
          onClick={onSwap}
          aria-label="Proposer un échange"
          className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-accent shadow-md ring-1 ring-gray-100 transition hover:scale-105 hover:bg-emerald-50"
        >
        <img src="/images/proposer.webp" alt="bouton proposer" />
        </button>
      </div>
    );
  }
  
  export default SwipeActions;