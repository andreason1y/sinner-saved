"use client";

import { useFormState, useFormStatus } from "react-dom";
import { signInAction } from "@/lib/actions/auth";
import { Loader2 } from "lucide-react";

const initialState: { error?: string } = {};

export function LoginForm({ next }: { next?: string }) {
  const [state, formAction] = useFormState(signInAction, initialState);

  return (
    <form action={formAction} className="mt-10 space-y-4">
      <input type="hidden" name="next" value={next ?? "/admin"} />
      <Field name="email" label="Email" type="email" required autoFocus />
      <Field name="password" label="Password" type="password" required />
      {state.error && (
        <p className="rounded-lg border border-crimson-500/30 bg-crimson-500/5 px-4 py-2 text-sm text-crimson-600">
          {state.error}
        </p>
      )}
      <SubmitButton />
    </form>
  );
}

function Field({
  name,
  label,
  type,
  required,
  autoFocus,
}: {
  name: string;
  label: string;
  type: string;
  required?: boolean;
  autoFocus?: boolean;
}) {
  return (
    <label className="block">
      <span className="text-xs uppercase tracking-[0.28em] text-ink-500">
        {label}
      </span>
      <input
        name={name}
        type={type}
        required={required}
        autoFocus={autoFocus}
        className="mt-2 w-full rounded-xl border border-ink-900/15 bg-white px-4 py-3 text-sm text-ink-900 outline-none transition-shadow focus:border-ink-900 focus:ring-2 focus:ring-sacred-500/40"
      />
    </label>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-ink-900 px-4 py-3 text-sm font-medium text-parchment transition-transform hover:scale-[1.01] disabled:opacity-60"
    >
      {pending ? <Loader2 size={14} className="animate-spin" /> : null}
      {pending ? "Memproses…" : "Masuk"}
    </button>
  );
}
