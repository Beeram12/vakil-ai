"use client";
import { useState, useRef, useEffect } from "react";
import { Scale, Send, Plus, Trash2, ChevronRight, BookOpen } from "lucide-react";
import Link from "next/link";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

type Conversation = {
  id: string;
  title: string;
};

const SAMPLE_QUESTIONS = [
  "What are my rights if arrested without a warrant?",
  "Explain Article 21 of the Indian Constitution.",
  "Can I file an FIR against my employer?",
  "What is anticipatory bail and how to get it?",
];

const DEMO_RESPONSE = `**Summary**
Under Article 22 of the Indian Constitution, every person has the right to be informed of the grounds of arrest and the right to consult a legal practitioner of their choice.

**Relevant Articles**
- **Article 21** — No person shall be deprived of their life or personal liberty except according to procedure established by law.
- **Article 22(1)** — No person who is arrested shall be detained without being informed of the grounds for such arrest.
- **Article 22(2)** — Every arrested person must be produced before the nearest magistrate within 24 hours.

**Your Rights**
1. Right to know why you are being arrested
2. Right to remain silent (you cannot be forced to self-incriminate — Article 20)
3. Right to consult and be defended by a lawyer
4. Right to be produced before a magistrate within 24 hours

**Recommended Action Steps**
- Immediately ask the officer for the reason for arrest
- Contact a lawyer or have a family member do so
- If no lawyer is affordable, request a Legal Aid lawyer (right under Article 39A)
- Ensure you are produced before a magistrate within 24 hours

**Sources**
- Constitution of India, Part III (Fundamental Rights)
- *D.K. Basu v. State of West Bengal* (1997) — landmark SC judgment on arrest guidelines`;

export default function ChatPage() {
  const [conversations, setConversations] = useState<Conversation[]>([
    { id: "1", title: "Article 21 — Right to Life" },
    { id: "2", title: "Anticipatory Bail" },
  ]);
  const [activeId, setActiveId] = useState("1");
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  function newConversation() {
    const id = Date.now().toString();
    setConversations((prev) => [{ id, title: "New conversation" }, ...prev]);
    setActiveId(id);
    setMessages([]);
  }

  function deleteConversation(id: string) {
    setConversations((prev) => prev.filter((c) => c.id !== id));
    if (activeId === id) { setMessages([]); setActiveId(""); }
  }

  async function sendMessage() {
    const text = input.trim();
    if (!text) return;

    const userMsg: Message = { id: Date.now().toString(), role: "user", content: text };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    // Update conversation title from first message
    if (messages.length === 0) {
      setConversations((prev) =>
        prev.map((c) => c.id === activeId ? { ...c, title: text.slice(0, 40) } : c)
      );
    }

    // Simulate streaming response (replace with real API in CP6)
    await new Promise((r) => setTimeout(r, 1500));
    setIsTyping(false);

    const aiMsg: Message = { id: (Date.now() + 1).toString(), role: "assistant", content: DEMO_RESPONSE };
    setMessages((prev) => [...prev, aiMsg]);
  }

  function handleKey(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); }
  }

  return (
    <div className="h-full flex" style={{ background: "var(--cream)" }}>

      {/* ── Sidebar ── */}
      <aside
        className="flex flex-col shrink-0 transition-all duration-200"
        style={{
          width: sidebarOpen ? "260px" : "0px",
          overflow: "hidden",
          borderRight: "3px solid var(--black)",
          background: "var(--white)",
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4"
             style={{ borderBottom: "3px solid var(--black)" }}>
          <Link href="/" className="flex items-center gap-2">
            <div className="w-7 h-7 brutal-border flex items-center justify-center"
                 style={{ background: "var(--black)" }}>
              <Scale size={14} color="var(--cream)" />
            </div>
            <span className="font-display font-bold text-sm">Vakil AI</span>
          </Link>
        </div>

        {/* New chat button */}
        <div className="p-3" style={{ borderBottom: "2px solid var(--black)" }}>
          <button
            onClick={newConversation}
            className="brutal-btn w-full py-2 text-xs"
            style={{ background: "var(--amber)", color: "var(--black)" }}
          >
            <Plus size={14} /> New Chat
          </button>
        </div>

        {/* Conversation list */}
        <div className="flex-1 overflow-y-auto p-2 flex flex-col gap-1">
          {conversations.map((conv) => (
            <div
              key={conv.id}
              onClick={() => setActiveId(conv.id)}
              className="flex items-center justify-between px-3 py-2 cursor-pointer group"
              style={{
                background: activeId === conv.id ? "var(--cream)" : "transparent",
                border: activeId === conv.id ? "2px solid var(--black)" : "2px solid transparent",
                fontFamily: "'Space Mono', monospace",
                fontSize: "11px",
              }}
            >
              <span className="truncate flex-1">{conv.title}</span>
              <button
                onClick={(e) => { e.stopPropagation(); deleteConversation(conv.id); }}
                className="opacity-0 group-hover:opacity-100 ml-2 hover:text-red-600 transition-opacity"
              >
                <Trash2 size={12} />
              </button>
            </div>
          ))}
        </div>

        {/* User stub */}
        <div className="p-3 font-mono text-xs" style={{ borderTop: "3px solid var(--black)", color: "#888" }}>
          user@vakil-ai.in
        </div>
      </aside>

      {/* ── Main ── */}
      <div className="flex-1 flex flex-col min-w-0">

        {/* Top bar */}
        <div className="flex items-center gap-3 px-4 py-3"
             style={{ borderBottom: "3px solid var(--black)", background: "var(--white)" }}>
          <button
            onClick={() => setSidebarOpen((v) => !v)}
            className="brutal-btn p-2"
            style={{ background: "var(--cream)" }}
          >
            <ChevronRight size={16} style={{ transform: sidebarOpen ? "rotate(180deg)" : "none", transition: "transform 0.2s" }} />
          </button>
          <span className="font-display font-bold text-base truncate">
            {conversations.find((c) => c.id === activeId)?.title ?? "New conversation"}
          </span>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-6 flex flex-col gap-6">

          {messages.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full gap-8 text-center">
              <div>
                <BookOpen size={40} style={{ color: "var(--amber)", margin: "0 auto 12px" }} />
                <h2 className="font-display text-2xl font-bold mb-2">Ask about Indian Law</h2>
                <p className="font-mono text-xs" style={{ color: "#888" }}>
                  Constitutional rights · Criminal law · Labour law · Consumer rights
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full max-w-xl">
                {SAMPLE_QUESTIONS.map((q) => (
                  <button
                    key={q}
                    onClick={() => { setInput(q); }}
                    className="brutal-card p-3 text-left text-xs font-mono hover:translate-x-[-2px] hover:translate-y-[-2px] transition-transform"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
              {msg.role === "assistant" && (
                <div className="w-7 h-7 brutal-border flex items-center justify-center mr-3 mt-1 shrink-0"
                     style={{ background: "var(--black)" }}>
                  <Scale size={13} color="var(--cream)" />
                </div>
              )}
              <div
                className="brutal-card px-4 py-3 max-w-[75%]"
                style={{
                  background: msg.role === "user" ? "var(--black)" : "var(--white)",
                  color: msg.role === "user" ? "var(--cream)" : "var(--black)",
                }}
              >
                {msg.role === "user" ? (
                  <p className="font-mono text-sm">{msg.content}</p>
                ) : (
                  <div
                    className="prose-legal text-sm"
                    dangerouslySetInnerHTML={{
                      __html: msg.content
                        .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
                        .replace(/^- (.+)$/gm, "<li>$1</li>")
                        .replace(/\n\n/g, "<br/><br/>")
                        .replace(/^\d+\. (.+)$/gm, "<li>$1</li>"),
                    }}
                  />
                )}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex items-start gap-3">
              <div className="w-7 h-7 brutal-border flex items-center justify-center shrink-0"
                   style={{ background: "var(--black)" }}>
                <Scale size={13} color="var(--cream)" />
              </div>
              <div className="brutal-card px-4 py-4 flex gap-2">
                <span className="typing-dot w-2 h-2 rounded-full inline-block" style={{ background: "var(--amber)" }} />
                <span className="typing-dot w-2 h-2 rounded-full inline-block" style={{ background: "var(--amber)" }} />
                <span className="typing-dot w-2 h-2 rounded-full inline-block" style={{ background: "var(--amber)" }} />
              </div>
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className="px-4 py-4" style={{ borderTop: "3px solid var(--black)", background: "var(--white)" }}>
          <div className="brutal-border flex items-end gap-0 max-w-3xl mx-auto"
               style={{ boxShadow: "4px 4px 0 var(--black)" }}>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder="Ask about your legal rights..."
              rows={1}
              className="flex-1 resize-none bg-transparent px-4 py-3 font-mono text-sm outline-none"
              style={{ fontFamily: "'DM Sans', sans-serif", minHeight: "48px", maxHeight: "160px" }}
            />
            <button
              onClick={sendMessage}
              disabled={!input.trim() || isTyping}
              className="brutal-btn m-2 p-3"
              style={{
                background: input.trim() && !isTyping ? "var(--black)" : "var(--cream)",
                color: input.trim() && !isTyping ? "var(--cream)" : "#aaa",
                border: "2px solid var(--black)",
                boxShadow: "none",
              }}
            >
              <Send size={16} />
            </button>
          </div>
          <p className="font-mono text-xs text-center mt-2" style={{ color: "#aaa" }}>
            Not legal advice · Always consult a qualified lawyer
          </p>
        </div>
      </div>
    </div>
  );
}
