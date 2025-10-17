import { cn } from "@/lib/utils";

const ChatMessage = ({ message, isUser }) => {
  return (
    <div
      className={cn(
        "flex w-full mb-4 animate-fade-in",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      <div
        className={cn(
          "max-w-[80%] rounded-2xl px-5 py-3 shadow-lg",
          isUser
            ? "bg-chat-gradient text-primary-foreground"
            : "bg-card text-card-foreground border border-border"
        )}
      >
        <p className="text-sm leading-relaxed whitespace-pre-wrap">{message}</p>
      </div>
    </div>
  );
};

export default ChatMessage;
