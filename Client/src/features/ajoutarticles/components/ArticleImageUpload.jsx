function ArticleImageUpload({
    images = [],
    onChange,
    maxImages = 5,
  }) {
    const handleChange = (event) => {
      const selectedFiles = Array.from(
        event.target.files || [],
      );
  
      if (!selectedFiles.length) {
        return;
      }
  
      const availableSlots =
        maxImages - images.length;
  
      const filesToAdd = selectedFiles
        .slice(0, availableSlots)
        .map((file) => ({
          file,
          preview: URL.createObjectURL(file),
        }));
  
      onChange([
        ...images,
        ...filesToAdd,
      ]);
  
      event.target.value = "";
    };
  
    const handleRemove = (index) => {
      const image = images[index];
  
      if (image?.preview) {
        URL.revokeObjectURL(image.preview);
      }
  
      onChange(
        images.filter(
          (_, imageIndex) => imageIndex !== index,
        ),
      );
    };
  
    return (
      <div>
        <div className="mb-2 flex items-center justify-between">
          <label className="text-sm font-semibold text-text">
            Photos
          </label>
  
          <span className="text-xs text-muted">
            {images.length}/{maxImages}
          </span>
        </div>
  
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {images.map((image, index) => (
            <div
              key={`${image.preview}-${index}`}
              className="group relative aspect-square overflow-hidden rounded-2xl bg-gray-100"
            >
              <img
                src={image.preview}
                alt={`Aperçu ${index + 1}`}
                className="h-full w-full object-cover"
              />
  
              <button
                type="button"
                onClick={() => handleRemove(index)}
                className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-white/95 text-sm font-bold text-red-500 shadow-sm transition hover:scale-105"
                aria-label={`Supprimer la photo ${index + 1}`}
              >
                ×
              </button>
  
              {index === 0 && (
                <span className="absolute bottom-2 left-2 rounded-full bg-white/95 px-2.5 py-1 text-[10px] font-semibold text-text">
                  Photo principale
                </span>
              )}
            </div>
          ))}
  
          {images.length < maxImages && (
            <label className="flex aspect-square cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-200 bg-white text-center transition hover:border-primary hover:bg-primary/5">
              <span className="text-3xl text-primary">
                +
              </span>
  
              <span className="mt-1 text-xs font-semibold text-text">
                Ajouter
              </span>
  
              <span className="mt-1 px-2 text-[10px] text-muted">
                JPG, PNG
              </span>
  
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp"
                multiple
                onChange={handleChange}
                className="hidden"
              />
            </label>
          )}
        </div>
      </div>
    );
  }
  
  export default ArticleImageUpload;