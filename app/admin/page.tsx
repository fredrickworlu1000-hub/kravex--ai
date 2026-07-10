"use client";

import { useState, useEffect, type FormEvent } from "react";
import { Loader2 } from "lucide-react";

interface Lead {
  id: string;
  created_at: string;
  name: string;
  email: string;
  company: string | null;
  message: string;
  category: string | null;
  urgency: string | null;
  summary: string | null;
  ai_draft: string | null;
  status: string | null;
}

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [checking, setChecking] = useState(true);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loggingIn, setLoggingIn] = useState(false);

  const [leads, setLeads] = useState<Lead[]>([]);
  const [loadingLeads, setLoadingLeads] = useState(false);

  useEffect(() => {
    fetch("/api/admin/leads")
      .then((res) => {
        if (res.ok) {
          setAuthed(true);
          return res.json();
        }
        return null;
      })
      .then((data) => {
        if (data) setLeads(data.leads);
      })
      .finally(() => setChecking(false));
  }, []);

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setLoggingIn(true);
    setLoginError("");

    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (!res.ok) {
      const data = await res.json();
      setLoginError(data.error ?? "Something went wrong.");
      setLoggingIn(false);
      return;
    }

    setAuthed(true);
    setLoggingIn(false);
    loadLeads();
  };

  const loadLeads = async () => {
    setLoadingLeads(true);
    const res = await fetch("/api/admin/leads");
    if (res.ok) {
      const data = await res.json();
      setLeads(data.leads);
    }
    setLoadingLeads(false);
  };

  if (checking) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-bg">
        <Loader2 className="h-6 w-6 animate-spin text-accent" />
      </div>
    );
  }

  if (!authed) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-bg px-6">
        <form onSubmit={handleLogin} className="w-full max-w-sm space-y-4">
          <h1 className="font-display text-2xl text-text-primary">
            Dashboard login
          </h1>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="field"
            autoFocus
          />
          {loginError && <p className="field-error">{loginError}</p>}
          <button
            type="submit"
            disabled={loggingIn}
            className="w-full rounded-xl bg-accent px-4 py-3 text-sm font-medium text-bg"
          >
            {loggingIn ? "Checking..." : "Log in"}
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg px-6 py-10 md:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="font-display text-2xl text-text-primary">Leads</h1>
          <button
            onClick={loadLeads}
            className="text-sm text-text-muted hover:text-text-primary"
          >
            {loadingLeads ? "Refreshing..." : "Refresh"}
          </button>
        </div>

        {leads.length === 0 ? (
          <p className="text-text-muted">No leads yet.</p>
        ) : (
          <div className="space-y-4">
            {leads.map((lead) => (
              <div
                key={lead.id}
                className="rounded-2xl border border-border bg-surface p-6"
              >
                <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <p className="font-display text-lg text-text-primary">
                      {lead.name}
                    </p>
                    <p className="text-sm text-text-muted">
                      {lead.email} {lead.company ? `· ${lead.company}` : ""}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    {lead.urgency && (
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium ${
                          lead.urgency === "high"
                            ? "bg-red-500/15 text-red-400"
                            : lead.urgency === "medium"
                            ? "bg-yellow-500/15 text-yellow-400"
                            : "bg-green-500/15 text-green-400"
                        }`}
                      >
                        {lead.urgency}
                      </span>
                    )}
                    {lead.category && (
                      <span className="rounded-full border border-border px-3 py-1 text-xs text-text-muted">
                        {lead.category}
                      </span>
                    )}
                  </div>
                </div>

                {lead.summary && (
                  <p className="mb-2 text-sm text-text-muted">
                    <span className="text-text-primary">Summary:</span>{" "}
                    {lead.summary}
                  </p>
                )}

                <p className="mb-3 text-sm text-text-primary">{lead.message}</p>

                {lead.ai_draft && (
                  <details className="rounded-xl border border-border bg-bg p-4">
                    <summary className="cursor-pointer text-sm text-accent">
                      Suggested reply
                    </summary>
                    <p className="mt-2 text-sm text-text-muted">
                      {lead.ai_draft}
                    </p>
                  </details>
                )}

                <p className="mt-3 text-xs text-text-muted">
                  {new Date(lead.created_at).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}