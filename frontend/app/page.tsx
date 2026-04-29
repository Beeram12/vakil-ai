"use client";
import Link from "next/link";
import { Scale, BookOpen, Shield, ArrowRight, Gavel, FileText, Users } from "lucide-react";

const features = [
  { icon: Scale,    title: "Constitutional Rights",  desc: "Fundamental rights under Articles 12–35, explained plainly." },
  { icon: Gavel,    title: "Landmark Judgments",     desc: "Decades of Supreme Court precedent, instantly searchable." },
  { icon: Shield,   title: "Know Your Rights",       desc: "Understand what protections apply to your situation." },
  { icon: FileText, title: "Actionable Steps",       desc: "Not just answers — what you can actually do next." },
  { icon: BookOpen, title: "Cited Sources",           desc: "Every answer references the actual law and judgment." },
  { icon: Users,    title: "Plain Language",          desc: "Legal language decoded into plain English (and Hindi soon)." },
];

export default function LandingPage() {
  return (
    <div className="min-h-full" style={{ background: "var(--cream)" }}>

      {/* ── Nav ── */}
      <nav style={{ borderBottom: "3px solid var(--black)", background: "var(--cream)" }}
           className="flex items-center justify-between px-6 py-4 sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 brutal-card flex items-center justify-center"
               style={{ background: "var(--black)" }}>
            <Scale size={18} color="var(--cream)" />
          </div>
          <span className="font-display text-xl font-bold tracking-tight">Vakil AI</span>
        </div>
        <Link href="/login">
          <button className="brutal-btn px-5 py-2 text-sm"
                  style={{ background: "var(--amber)", color: "var(--black)" }}>
            Sign In →
          </button>
        </Link>
      </nav>

      {/* ── Hero ── */}
      <section className="px-6 py-20 max-w-5xl mx-auto">
        <div className="brutal-card p-2 inline-block mb-6 font-mono text-xs"
             style={{ background: "var(--red)", color: "var(--cream)" }}>
          ⚖ BETA — INDIAN LAW · ENGLISH
        </div>

        <h1 className="font-display text-6xl md:text-7xl font-black leading-tight mb-6"
            style={{ maxWidth: "720px" }}>
          Your Rights.<br />
          <span style={{ color: "var(--amber)" }}>Explained.</span><br />
          Instantly.
        </h1>

        <p className="text-xl mb-10 leading-relaxed"
           style={{ maxWidth: "540px", color: "#444" }}>
          Ask any question about Indian constitutional law, criminal rights, or labour
          protections — get a cited answer in seconds, not days.
        </p>

        <div className="flex flex-wrap gap-4">
          <Link href="/login">
            <button className="brutal-btn px-8 py-4 text-base"
                    style={{ background: "var(--black)", color: "var(--cream)" }}>
              Start for free <ArrowRight size={16} />
            </button>
          </Link>
          <Link href="/app">
            <button className="brutal-btn px-8 py-4 text-base"
                    style={{ background: "var(--cream)", color: "var(--black)" }}>
              Try a question
            </button>
          </Link>
        </div>
      </section>

      {/* ── Ticker ── */}
      <div style={{ borderTop: "3px solid var(--black)", borderBottom: "3px solid var(--black)", background: "var(--black)", color: "var(--amber-light)" }}
           className="py-3 px-6 font-mono text-sm overflow-hidden whitespace-nowrap">
        ◆ Article 21 — Right to Life &nbsp;&nbsp;◆ Article 22 — Protection Against Arrest &nbsp;&nbsp;◆ Article 14 — Right to Equality &nbsp;&nbsp;◆ Article 19 — Freedom of Speech &nbsp;&nbsp;◆ IPC Section 302 &nbsp;&nbsp;◆ POSH Act 2013 &nbsp;&nbsp;◆ RTI Act 2005 &nbsp;&nbsp;◆ Consumer Protection Act &nbsp;&nbsp;
      </div>

      {/* ── Features ── */}
      <section className="px-6 py-20 max-w-5xl mx-auto">
        <h2 className="font-display text-4xl font-bold mb-12">
          Why Vakil AI?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="brutal-card p-6 hover:translate-x-[-2px] hover:translate-y-[-2px] transition-transform"
                 style={{ boxShadow: "6px 6px 0 var(--black)" }}>
              <div className="w-10 h-10 brutal-border flex items-center justify-center mb-4"
                   style={{ background: "var(--amber-light)" }}>
                <Icon size={18} />
              </div>
              <h3 className="font-display font-bold text-lg mb-2">{title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: "#555" }}>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Sample questions ── */}
      <section className="px-6 py-16 max-w-5xl mx-auto">
        <h2 className="font-display text-4xl font-bold mb-8">Ask anything like…</h2>
        <div className="flex flex-col gap-3">
          {[
            "What are my rights if I'm arrested without a warrant?",
            "Can my employer fire me for going on strike?",
            "What does Article 21 guarantee to every citizen?",
            "How do I file an RTI request?",
            "What is the procedure to apply for anticipatory bail?",
          ].map((q) => (
            <Link href="/app" key={q}>
              <div className="brutal-card p-4 flex items-center justify-between hover:translate-x-[-2px] hover:translate-y-[-2px] transition-transform cursor-pointer">
                <span className="font-mono text-sm">{q}</span>
                <ArrowRight size={16} />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Footer ── */}
      <footer style={{ borderTop: "3px solid var(--black)", background: "var(--black)", color: "var(--cream)" }}
              className="px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Scale size={16} />
          <span className="font-display font-bold">Vakil AI</span>
        </div>
        <p className="font-mono text-xs" style={{ color: "#999" }}>
          Not a substitute for legal advice. Always consult a qualified lawyer.
        </p>
      </footer>

    </div>
  );
}
