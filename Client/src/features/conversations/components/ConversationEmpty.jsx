function ConversationEmpty() {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center px-6 text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-primary/10 text-3xl">
          💬
        </div>
  
        <h2 className="mt-5 text-lg font-bold text-text">
          Aucune conversation
        </h2>
  
        <p className="mt-2 max-w-sm text-sm leading-5 text-muted">
          Vos conversations apparaîtront ici lorsque vous
          commencerez à échanger avec un autre étudiant.
        </p>
      </div>
    );
  }
  
  export default ConversationEmpty;