// src/pages/_app.tsx
import type { AppProps } from "next/app";
import "@/app/globals.css"; // <- важливо: тягнемо Tailwind та наші класи
import Navbar from "@/app/_components/Navbar";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <header className="sticky top-0 z-20 border-b border-ink-200/70 dark:border-ink-800 header-grad backdrop-blur">
        <div className="container-page flex items-center justify-between py-4">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-black dark:bg-agent-500" />
            <div>
              <div className="text-xl font-semibold tracking-tight">Spy Cats</div>
              <div className="text-xs text-ink-500 dark:text-ink-400">Internal Agency Console</div>
            </div>
          </div>
          <Navbar />
        </div>
      </header>

      <main className="container-page">
        <Component {...pageProps} />
      </main>

      <footer className="container-page pb-10 pt-6 text-xs text-ink-500 dark:text-ink-400">
        API: <code>{process.env.NEXT_PUBLIC_API_URL}</code>
      </footer>
    </>
  );
}
