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
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 6l12 12M18 6L6 18"
            />
          </svg>
        </button>
  
        {/* Favori */}
        <button
          type="button"
          onClick={onFavorite}
          aria-label="Ajouter aux favoris"
          className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white shadow-lg shadow-primary/25 transition hover:scale-105 hover:bg-primary-dark"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M20.8 8.8c0 5.5-8.8 10.2-8.8 10.2S3.2 14.3 3.2 8.8A4.8 4.8 0 0 1 12 6.2a4.8 4.8 0 0 1 8.8 2.6Z"
            />
          </svg>
        </button>
  
        {/* Proposer un troc */}
        <button
          type="button"
          onClick={onSwap}
          aria-label="Proposer un échange"
          className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-accent shadow-md ring-1 ring-gray-100 transition hover:scale-105 hover:bg-emerald-50"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M7 7h11l-3-3"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17 17H6l3 3"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M18 7l-3-3M6 17l3 3"
            />
          </svg>
        </button>
      </div>
    );
  }
  
  export default SwipeActions;