function ArticleDetailLoading() {
    return (
      <main className="min-h-screen bg-background px-4 py-6 text-text">
        <div className="mx-auto max-w-2xl animate-pulse space-y-4">
          <div className="flex justify-between">
            <div className="h-11 w-11 rounded-full bg-gray-200" />
            <div className="h-6 w-32 rounded-lg bg-gray-200" />
            <div className="h-11 w-11 rounded-full bg-gray-200" />
          </div>
  
          <div className="aspect-square rounded-3xl bg-gray-200" />
  
          <div className="rounded-3xl bg-white p-5">
            <div className="h-5 w-1/3 rounded bg-gray-200" />
  
            <div className="mt-4 h-8 w-3/4 rounded bg-gray-200" />
  
            <div className="mt-5 h-14 rounded-2xl bg-gray-200" />
  
            <div className="mt-6 space-y-2">
              <div className="h-4 w-24 rounded bg-gray-200" />
              <div className="h-4 w-full rounded bg-gray-200" />
              <div className="h-4 w-5/6 rounded bg-gray-200" />
            </div>
          </div>
        </div>
      </main>
    );
  }
  
  export default ArticleDetailLoading;