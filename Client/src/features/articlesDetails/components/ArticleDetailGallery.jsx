function ArticleDetailGallery({
    photoUrls,
    currentPhoto,
    onPrevious,
    onNext,
    onSelectPhoto,
    title,
  }) {
    const mainPhoto = photoUrls[currentPhoto] || null;
  
    return (
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        {mainPhoto ? (
          <img
            src={mainPhoto}
            alt={title}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <div className="text-center">
              <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-2xl shadow-sm">
                📦
              </div>
  
              <p className="text-sm font-medium text-muted">
                Aucune photo disponible
              </p>
            </div>
          </div>
        )}
  
        {photoUrls.length > 1 && (
          <>
            <button
              type="button"
              onClick={onPrevious}
              className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-xl text-white transition hover:bg-black/60"
              aria-label="Photo précédente"
            >
              ←
            </button>
  
            <button
              type="button"
              onClick={onNext}
              className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-xl text-white transition hover:bg-black/60"
              aria-label="Photo suivante"
            >
              →
            </button>
  
            <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5 rounded-full bg-black/40 px-3 py-1.5">
              {photoUrls.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => onSelectPhoto(index)}
                  aria-label={`Afficher la photo ${index + 1}`}
                  className={`h-1.5 rounded-full transition-all ${
                    index === currentPhoto
                      ? "w-5 bg-white"
                      : "w-1.5 bg-white/60"
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    );
  }
  
  export default ArticleDetailGallery;