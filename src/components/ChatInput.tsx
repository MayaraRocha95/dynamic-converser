import React, { useState } from "react";

type Props = {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
};

const ChatInput: React.FC<Props> = ({ onSendMessage, disabled }) => {
  const [value, setValue] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // evita reload (GET /)
    const text = value.trim();
    if (!text || disabled) return;
    onSendMessage(text);
    setValue("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      const text = value.trim();
      if (!text || disabled) return;
      onSendMessage(text);
      setValue("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <textarea
        className="flex-1 resize-none rounded-xl border px-3 py-2"
        placeholder="Digite sua mensagem..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        rows={1}
        disabled={disabled}
      />
      <button
        type="submit" // ok pois tratamos preventDefault no handleSubmit
        className="px-4 py-2 rounded-xl border"
        disabled={disabled}
      >
        Enviar
      </button>
    </form>
  );
};

export default ChatInput;
