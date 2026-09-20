function HomeFilter() {
    return (
      <div className="flex items-center justify-between rounded-2xl bg-white px-4 py-3 shadow-sm ring-1 ring-gray-100">
        <div>
          <p className="text-sm font-semibold text-text">
            Autour de toi
          </p>
  
          <p className="text-xs text-muted">
            Articles disponibles dans ta région
          </p>
        </div>
  
        <button
          type="button"
          className="rounded-xl bg-primary/10 px-3 py-2 text-xs font-semibold text-primary transition hover:bg-primary/15"
        >
          Filtrer
        </button>
      </div>
    );
  }
  
  export default HomeFilter;