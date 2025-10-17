import { useState, useRef, useEffect } from "react";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

const ChatContainer = () => {
  const [messages, setMessages] = useState([
    { text: "Oie, tudo bem?", isUser: true },
    { text: "Meu nome é Maria. Como posso te ajudar hoje?", isUser: false },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessageToAPI = async (userMessage) => {
    // Usando chave fake por enquanto
    const OPENAI_API_KEY = "sua-chave-api-aqui";
    
    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "system",
              content: "Você é Maria, uma assistente virtual prestativa e amigável que responde em português do Brasil.",
            },
            ...messages.map((msg) => ({
              role: msg.isUser ? "user" : "assistant",
              content: msg.text,
            })),
            { role: "user", content: userMessage },
          ],
        }),
      });

      if (!response.ok) {
        throw new Error("Erro na API");
      }

      const data = await response.json();
      return data.choices[0].message.content;
    } catch (error) {
      console.error("Erro ao chamar API:", error);
      toast({
        title: "Erro",
        description: "Não foi possível obter resposta. Configure sua chave de API do OpenAI.",
        variant: "destructive",
      });
      return "Desculpe, não consegui processar sua mensagem. Verifique a chave de API.";
    }
  };

  const handleSendMessage = async (message) => {
    const userMessage = { text: message, isUser: true };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    const botResponse = await sendMessageToAPI(message);
    
    setMessages((prev) => [...prev, { text: botResponse, isUser: false }]);
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col h-full max-w-4xl mx-auto">
      <div className="bg-card border-b border-border px-6 py-6 rounded-t-3xl">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Chatbot com IA
        </h1>
        <p className="text-muted-foreground">
          Envie sua dúvida e seja respondido na hora! Estamos online 24/7!
        </p>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-6 bg-card/50">
        {messages.map((msg, index) => (
          <ChatMessage key={index} message={msg.text} isUser={msg.isUser} />
        ))}
        {isLoading && (
          <div className="flex items-center gap-2 text-muted-foreground mb-4">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span className="text-sm">Maria está digitando...</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="bg-card border-t border-border px-6 py-4 rounded-b-3xl">
        <ChatInput onSendMessage={handleSendMessage} disabled={isLoading} />
      </div>
    </div>
  );
};

export default ChatContainer;
