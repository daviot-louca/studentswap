
function ArticleDetailOwner({ owner, city }) {
    const initial = owner?.charAt(0)?.toUpperCase() || "U";
  
    return (
      <div className="mt-5 flex items-center gap-3 rounded-2xl bg-background p-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/10 font-bold text-primary">
          {initial}
        </div>
  
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-text">
            {owner}
          </p>
  
          <p className="text-xs text-muted">
            {city}
          </p>
        </div>
      </div>
    );
  }
  
  export default ArticleDetailOwner;