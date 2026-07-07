"use client";

import { useState, type FormEvent } from "react";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  contactFormSchema,
  type ContactFormFieldErrors,
} from "@/lib/validation/contact";

type Status = "idle" | "submitting" | "success" | "error";

interface ContactFormProps {
  variant?: "compact" | "full";
  className?: string;
}

const initialValues = {
  name: "",
  email: "",
  company: "",
  message: "",
  company_website: "",
};

export function ContactForm({ variant = "full", className }: ContactFormProps) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<ContactFormFieldErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverMessage, setServerMessage] = useState<string | null>(null);

  const handleChange =
    (field: keyof typeof values) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setValues((prev) => ({ ...prev, [field]: e.target.value }));
      if (errors[field]) {
        setErrors((prev) => ({ ...prev, [field]: undefined }));
      }
    };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const result = contactFormSchema.safeParse(values);
    if (!result.success) {
      const fieldErrors: ContactFormFieldErrors = {};
      for (const issue of result.error.issues) {
        const field = issue.path[0];
        if (typeof field === "string" && !fieldErrors[field as keyof typeof fieldErrors]) {
          fieldErrors[field as keyof typeof fieldErrors] = issue.message;
        }
      }
      setErrors(fieldErrors);
      return;
    }

    setStatus("submitting");
    setServerMessage(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(result.data),
      });

      const data = await res.json();

      if (!res.ok) {
        setStatus("error");
        setServerMessage(data.error ?? "Something went wrong. Please try again.");
        return;
      }

      setStatus("success");
      setValues(initialValues);
    } catch {
      setStatus("error");
      setServerMessage("Couldn't reach the server. Check your connection and try again.");
    }
  };

  if (status === "success") {
    return (
      <div
        role="status"
        className={cn(
          "flex flex-col items-center gap-3 rounded-2xl border border-border bg-surface px-6 py-12 text-center",
          className
        )}
      >
        <CheckCircle2 className="h-8 w-8 text-accent" aria-hidden="true" />
        <p className="font-display text-xl text-text-primary">Message sent.</p>
        <p className="max-w-sm text-sm text-text-muted">
          We&apos;ll get back to you within one business day.
        </p>
        <Button variant="secondary" size="sm" onClick={() => setStatus("idle")}>
          Send another message
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className={cn("space-y-5", className)}>
      <div className="hidden" aria-hidden="true">
        <label htmlFor="company_website">Leave this field empty</label>
        <input
          id="company_website"
          name="company_website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={values.company_website}
          onChange={handleChange("company_website")}
        />
      </div>

      <div className={cn("grid gap-5", variant === "full" && "sm:grid-cols-2")}>
        <div>
          <label htmlFor="name" className="field-label">Name</label>
          <input
            id="name"
            type="text"
            autoComplete="name"
            value={values.name}
            onChange={handleChange("name")}
            className={cn("field", errors.name && "field-invalid")}
            placeholder="Jane Doe"
          />
          {errors.name && <p className="field-error">{errors.name}</p>}
        </div>

        <div>
          <label htmlFor="email" className="field-label">Email</label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            value={values.email}
            onChange={handleChange("email")}
            className={cn("field", errors.email && "field-invalid")}
            placeholder="jane@company.com"
          />
          {errors.email && <p className="field-error">{errors.email}</p>}
        </div>
      </div>

      {variant === "full" && (
        <div>
          <label htmlFor="company" className="field-label">
            Company <span className="normal-case text-text-muted/60">(optional)</span>
          </label>
          <input
            id="company"
            type="text"
            autoComplete="organization"
            value={values.company}
            onChange={handleChange("company")}
            className={cn("field", errors.company && "field-invalid")}
            placeholder="Acme Realty"
          />
          {errors.company && <p className="field-error">{errors.company}</p>}
        </div>
      )}

      <div>
        <label htmlFor="message" className="field-label">What do you need automated?</label>
        <textarea
          id="message"
          rows={variant === "full" ? 5 : 3}
          value={values.message}
          onChange={handleChange("message")}
          className={cn("field resize-none", errors.message && "field-invalid")}
          placeholder="Tell us about your current lead flow and where it breaks down."
        />
        {errors.message && <p className="field-error">{errors.message}</p>}
      </div>

      {status === "error" && serverMessage && (
        <div role="alert" className="flex items-start gap-2 rounded-xl border border-red-500/30 bg-red-500/5 px-4 py-3 text-sm text-red-400">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
          <p>{serverMessage}</p>
        </div>
      )}

      <Button
        type="submit"
        size={variant === "full" ? "lg" : "default"}
        disabled={status === "submitting"}
        className="w-full sm:w-auto"
      >
        {status === "submitting" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
            Sending...
          </>
        ) : (
          "Send message"
        )}
      </Button>
    </form>
  );
}