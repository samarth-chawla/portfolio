"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 bg-slate-100 px-4 text-neutral-950 dark:bg-[#131313] dark:text-[#EDE1DF]">
      <p className="text-xs uppercase tracking-[0.34em] text-neutral-500 dark:text-neutral-400">
        500 — Something Went Wrong
      </p>
      <h1 className="text-6xl font-medium leading-none sm:text-7xl">
        SYSTEM ERROR
      </h1>
      <p className="max-w-md text-center text-sm text-neutral-600 dark:text-neutral-400">
        An unexpected error occurred. Please try again.
      </p>
      <button
        type="button"
        onClick={reset}
        className="rounded-full border border-neutral-300 bg-white/70 px-5 py-2 text-sm font-medium text-neutral-800 transition hover:-translate-y-0.5 hover:border-neutral-950 hover:bg-white dark:border-white/10 dark:bg-white/4 dark:text-neutral-200 dark:hover:border-white/30 dark:hover:bg-white/8"
      >
        Try Again
      </button>
    </main>
  );
}
