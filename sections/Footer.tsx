"use client";

import { Space_Grotesk } from "next/font/google";
import { GitHub, X } from "@deemlol/next-icons";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
});

const Footer = () => {
  return (
    <footer
      className={`bg-slate-100 px-4 pb-8 text-neutral-950 dark:bg-[#131313] dark:text-[#EDE1DF] sm:px-6 md:px-12 lg:px-20 ${spaceGrotesk.className}`}
    >
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-5 border-t border-neutral-300/80 pt-6 dark:border-white/10 md:flex-row md:items-center md:justify-between">
        <div className="space-y-1">
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            Built with{" "}
            <span className="font-semibold text-neutral-950 dark:text-white">
              Next.js
            </span>
          </p>
          <p className="text-sm text-neutral-500 dark:text-neutral-500">
            © {new Date().getFullYear()} Samarth Chawla. All rights
            reserved.
          </p>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap md:justify-end">
          <a
            href="https://github.com/samarth-chawla/portfolio"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-full border border-neutral-300 bg-white/70 px-4 text-sm font-medium text-neutral-800 transition hover:-translate-y-0.5 hover:border-neutral-950 hover:bg-white dark:border-white/10 dark:bg-white/[0.04] dark:text-neutral-200 dark:hover:border-white/30 dark:hover:bg-white/[0.08] sm:w-fit"
            aria-label="View this portfolio project repository on GitHub"
          >
            <GitHub size={16} />
            View Repository
          </a>

          <a
            href="https://x.com/_samarth_chawla"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-full border border-neutral-300 bg-white/70 px-4 text-sm font-medium text-neutral-800 transition hover:-translate-y-0.5 hover:border-neutral-950 hover:bg-white dark:border-white/10 dark:bg-white/[0.04] dark:text-neutral-200 dark:hover:border-white/30 dark:hover:bg-white/[0.08] sm:w-fit"
            aria-label="Connect with Samarth Chawla on X"
          >
            <X size={16} />
            Connect on X
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
