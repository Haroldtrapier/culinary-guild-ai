"use client";

import { useState, useRef, useEffect } from "react";
import {
  Send,
  ChefHat,
  User,
  Sparkles,
  Loader2,
  Lightbulb,
} from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const suggestedPrompts = [
  "What can I make with chicken, rice, and broccoli?",
  "How do I make the perfect pasta al dente?",
  "Suggest a quick vegetarian dinner for two",
  "What's a good substitute for eggs in baking?",
  "Teach me a classic French sauce",
  "What spices go well together in Indian cooking?",
];

export default function AssistantPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);

    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, { role: "user", content: userMessage }],
        }),
      });

      const data = await response.json();
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.message },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "I apologize, but I'm having trouble connecting right now. Please try again in a moment.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestionClick = (prompt: string) => {
    setInput(prompt);
    textareaRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    e.target.style.height = "auto";
    e.target.style.height = `${Math.min(e.target.scrollHeight, 150)}px`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-brand-50/30 to-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col h-[calc(100vh-10rem)]">
          {/* Header */}
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold">
              AI <span className="text-gradient">Culinary Assistant</span>
            </h1>
            <p className="text-gray-500 mt-2">
              Ask me anything about cooking, recipes, techniques, or ingredients
            </p>
          </div>

          {/* Chat Area */}
          <div className="flex-1 overflow-y-auto rounded-2xl bg-white border border-gray-100 shadow-sm mb-4">
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full p-8">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-brand-100 to-brand-200 flex items-center justify-center mb-6">
                  <ChefHat className="h-10 w-10 text-brand-600" />
                </div>
                <h2 className="text-xl font-semibold mb-2">
                  Welcome to the Culinary Guild
                </h2>
                <p className="text-gray-500 text-center max-w-md mb-8">
                  I&apos;m your AI chef assistant. Ask me about recipes, cooking
                  techniques, ingredient substitutions, meal planning, and more.
                </p>

                <div className="w-full max-w-lg">
                  <div className="flex items-center gap-2 text-sm text-gray-400 mb-3">
                    <Lightbulb className="h-4 w-4" />
                    Try asking...
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {suggestedPrompts.map((prompt) => (
                      <button
                        key={prompt}
                        onClick={() => handleSuggestionClick(prompt)}
                        className="text-left text-sm px-4 py-3 rounded-xl border border-gray-200 hover:border-brand-300 hover:bg-brand-50/50 text-gray-600 hover:text-brand-700 transition-all"
                      >
                        {prompt}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-6 space-y-6">
                {messages.map((msg, i) => (
                  <div
                    key={i}
                    className={`flex gap-4 ${
                      msg.role === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    {msg.role === "assistant" && (
                      <div className="flex-shrink-0 w-9 h-9 rounded-full bg-gradient-to-br from-brand-100 to-brand-200 flex items-center justify-center">
                        <ChefHat className="h-5 w-5 text-brand-600" />
                      </div>
                    )}
                    <div
                      className={`max-w-[75%] rounded-2xl px-5 py-3 ${
                        msg.role === "user"
                          ? "bg-gradient-to-r from-brand-500 to-brand-600 text-white"
                          : "bg-gray-50 text-gray-800 border border-gray-100"
                      }`}
                    >
                      <p className="whitespace-pre-wrap leading-relaxed text-[15px]">
                        {msg.content}
                      </p>
                    </div>
                    {msg.role === "user" && (
                      <div className="flex-shrink-0 w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center">
                        <User className="h-5 w-5 text-gray-600" />
                      </div>
                    )}
                  </div>
                ))}

                {isLoading && (
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-9 h-9 rounded-full bg-gradient-to-br from-brand-100 to-brand-200 flex items-center justify-center">
                      <ChefHat className="h-5 w-5 text-brand-600" />
                    </div>
                    <div className="bg-gray-50 rounded-2xl px-5 py-3 border border-gray-100">
                      <div className="flex items-center gap-2 text-gray-400">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span className="text-sm">Cooking up a response...</span>
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>
            )}
          </div>

          {/* Input Area */}
          <form
            onSubmit={handleSubmit}
            className="relative flex items-end gap-3 bg-white rounded-2xl border border-gray-200 shadow-sm p-3 focus-within:border-brand-300 focus-within:ring-2 focus-within:ring-brand-100 transition-all"
          >
            <Sparkles className="h-5 w-5 text-brand-400 flex-shrink-0 mb-2" />
            <textarea
              ref={textareaRef}
              value={input}
              onChange={handleTextareaChange}
              onKeyDown={handleKeyDown}
              placeholder="Ask me about recipes, techniques, ingredients..."
              rows={1}
              className="flex-1 resize-none bg-transparent outline-none text-gray-800 placeholder-gray-400 text-[15px] leading-relaxed max-h-[150px]"
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-r from-brand-500 to-brand-600 text-white flex items-center justify-center hover:from-brand-600 hover:to-brand-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>

          <p className="text-center text-xs text-gray-400 mt-3">
            Culinary Guild AI provides cooking guidance. Always use your best
            judgment regarding food safety.
          </p>
        </div>
      </div>
    </div>
  );
}
