"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { AlertCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/client";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);

  // If already logged in, redirect to dashboard
  React.useEffect(() => {
    const checkUser = async () => {
      const supabase = createClient();
      const { data } = await supabase.auth.getUser();
      if (data?.user) {
        router.push("/admin/dashboard");
      }
    };
    checkUser();
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const supabase = createClient();
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) {
        throw authError;
      }

      if (data?.user) {
        router.push("/admin/dashboard");
        router.refresh();
      }
    } catch (err: any) {
      console.error("Login error:", err);
      setError(err?.message || "Invalid credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-zinc-950 text-white flex flex-col justify-center items-center px-6 relative overflow-hidden">
      {/* Dynamic Background Glow */}
      <div className="absolute top-1/2 left-1/2 -z-10 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-3xl opacity-50" />

      {/* Brand Title */}
      <div className="flex items-center space-x-2.5 mb-8">
        <img src="/images/logo-mark.png" alt="DIYNEZA logo" width={36} height={36} className="h-9 w-9 object-contain" />
        <span className="font-heading text-2xl font-black tracking-tight text-white">
          DIYNEZA<span className="text-primary">.</span>
        </span>
      </div>

      {/* Login Box */}
      <div className="w-full max-w-md rounded-2xl border border-zinc-800 bg-zinc-900/40 p-8 shadow-2xl backdrop-blur-md relative">
        <div className="absolute top-0 right-0 h-24 w-24 rounded-full bg-primary/5 blur-xl pointer-events-none" />

        <h2 className="font-heading text-xl font-bold text-zinc-100">
          Admin Portal Sign In
        </h2>
        <p className="mt-1 text-xs text-zinc-500 font-semibold">
          Enter your operations manager credentials to continue.
        </p>

        {/* Errors */}
        {error && (
          <div className="mt-6 flex items-start space-x-2 rounded-lg border border-red-500/20 bg-red-500/10 p-3 text-xs text-red-400">
            <AlertCircle className="h-4.5 w-4.5 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleLogin} className="mt-6 space-y-4">
          <div className="space-y-1.5">
            <label htmlFor="email" className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block">
              Work Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@diyneza.com"
              required
              disabled={loading}
              className="w-full rounded-lg border border-zinc-850 bg-zinc-950 px-4.5 py-3 text-xs text-white placeholder-zinc-650 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary disabled:opacity-50"
            />
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between items-center">
              <label htmlFor="password" className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block">
                Security Password
              </label>
            </div>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              required
              disabled={loading}
              className="w-full rounded-lg border border-zinc-850 bg-zinc-950 px-4.5 py-3 text-xs text-white placeholder-zinc-650 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary disabled:opacity-50"
            />
          </div>

          <Button
            type="submit"
            variant="primary"
            disabled={loading}
            className="w-full flex items-center justify-center space-x-2 py-3 mt-8 font-semibold text-xs uppercase tracking-wider"
          >
            <span>{loading ? "Authenticating..." : "Sign In to Terminal"}</span>
            {!loading && <ArrowRight className="h-4 w-4" />}
          </Button>
        </form>
      </div>

      {/* Footer Info */}
      <span className="text-[10px] text-zinc-600 mt-8 font-semibold">
        DIYNEZA Restaurant Operating System © 2026. All rights secured.
      </span>
    </main>
  );
}
