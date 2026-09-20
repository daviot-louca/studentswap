import ArticleDetailOwner from "./ArticleDetailOwner";

function ArticleDetailInfo({
  title,
  description,
  category,
  subCategory,
  state,
  owner,
  city,
}) {
  return (
    <div className="p-5">
      <div className="flex flex-wrap gap-2">
        <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
          {category}
        </span>

        {subCategory && (
          <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-muted">
            {subCategory}
          </span>
        )}

        <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-muted">
          {state}
        </span>
      </div>

      <h2 className="mt-4 text-2xl font-bold leading-tight text-text">
        {title}
      </h2>

      <ArticleDetailOwner
        owner={owner}
        city={city}
      />

      <div className="mt-6">
        <h3 className="text-sm font-bold text-text">
          Description
        </h3>

        <p className="mt-2 whitespace-pre-line text-sm leading-6 text-muted">
          {description}
        </p>
      </div>
    </div>
  );
}

export default ArticleDetailInfo;