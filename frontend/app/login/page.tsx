"use client";
import { Scale } from "lucide-react";
import Link from "next/link";

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-full flex flex-col items-center justify-center px-4"
         style={{ background: "var(--cream)" }}>

      {/* Back link */}
      <div className="w-full max-w-md mb-6">
        <Link href="/" className="font-mono text-sm hover:underline">← Back</Link>
      </div>

      {/* Card */}
      <div className="brutal-card w-full max-w-md p-8"
           style={{ boxShadow: "8px 8px 0 var(--black)" }}>

        {/* Logo */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 brutal-border flex items-center justify-center"
               style={{ background: "var(--black)" }}>
            <Scale size={18} color="var(--cream)" />
          </div>
          <div>
            <p className="font-display font-bold text-xl leading-none">Vakil AI</p>
            <p className="font-mono text-xs mt-1" style={{ color: "#777" }}>Indian Legal Assistant</p>
          </div>
        </div>

        <h1 className="font-display text-3xl font-black mb-2">Sign In</h1>
        <p className="text-sm mb-8" style={{ color: "#555" }}>
          Access your legal queries and conversation history.
        </p>

        {/* Google button */}
        <button
          className="brutal-btn w-full py-4 text-sm"
          style={{ background: "var(--white)", color: "var(--black)" }}
          onClick={() => alert("Google OAuth — coming in Checkpoint 2")}
        >
          <GoogleIcon />
          Continue with Google
        </button>

        <div className="flex items-center gap-3 my-6">
          <div className="flex-1 h-[2px]" style={{ background: "var(--black)" }} />
          <span className="font-mono text-xs" style={{ color: "#888" }}>or</span>
          <div className="flex-1 h-[2px]" style={{ background: "var(--black)" }} />
        </div>

        {/* Email form */}
        <div className="flex flex-col gap-4">
          <div>
            <label className="font-mono text-xs font-bold block mb-2">EMAIL</label>
            <input
              type="email"
              placeholder="you@example.com"
              className="brutal-input"
            />
          </div>
          <div>
            <label className="font-mono text-xs font-bold block mb-2">PASSWORD</label>
            <input
              type="password"
              placeholder="••••••••"
              className="brutal-input"
            />
          </div>
          <button
            className="brutal-btn w-full py-4 text-sm mt-2"
            style={{ background: "var(--amber)", color: "var(--black)" }}
            onClick={() => alert("Email auth — coming in Checkpoint 2")}
          >
            Sign In →
          </button>
        </div>

        <p className="font-mono text-xs text-center mt-6" style={{ color: "#888" }}>
          No account? &nbsp;
          <span className="underline cursor-pointer" style={{ color: "var(--black)" }}>
            Sign up free
          </span>
        </p>
      </div>

      <p className="font-mono text-xs mt-8 text-center" style={{ color: "#aaa", maxWidth: "360px" }}>
        Not a substitute for legal advice. Always consult a qualified lawyer for your situation.
      </p>
    </div>
  );
}
