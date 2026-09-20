import ConversationItem from "./ConversationItem";
import ConversationEmpty from "./ConversationEmpty";

function ConversationList({
  conversations,
  isLoading,
}) {
  if (isLoading) {
    return (
      <div className="space-y-1">
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className="flex animate-pulse items-center gap-4 bg-white px-4 py-4"
          >
            <div className="h-14 w-14 rounded-full bg-gray-200" />

            <div className="flex-1 space-y-2">
              <div className="h-4 w-1/3 rounded bg-gray-200" />
              <div className="h-3 w-2/3 rounded bg-gray-200" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!conversations.length) {
    return <ConversationEmpty />;
  }

  return (
    <div className="overflow-hidden rounded-3xl bg-white shadow-sm">
      {conversations.map((conversation) => (
        <ConversationItem
          key={
            conversation?.Id_conversations ??
            conversation?.id
          }
          conversation={conversation}
        />
      ))}
    </div>
  );
}

export default ConversationList;