import ChatContainer from "@/components/ChatContainer";

async function callOpenAI(prompt: string) {
  const res = await fetch("/api/openai", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt }),
  });
  return res.json();
}

const Index = () => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-5xl h-[90vh] shadow-2xl rounded-3xl overflow-hidden border border-border">
        <ChatContainer />
      </div>
    </div>
  );
};

export default Index;
