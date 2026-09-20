function ArticleDetailActions({ onProposal }) {
  return (
    <div className="mt-5 pb-2">
      <button
        type="button"
        onClick={onProposal}
        className="w-full rounded-2xl bg-primary px-5 py-4 text-sm font-bold text-white shadow-sm transition hover:bg-primary-dark"
      >
        Proposer un échange
      </button>
    </div>
  );
}

export default ArticleDetailActions;