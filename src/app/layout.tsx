import "./globals.css";
import Navbar from "./_components/Navbar";

export const metadata = {
  title: "Spy Cats Dashboard",
  description: "Manage spy cats",
};

const themeInit = `
(function() {
  try {
    const ls = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const dark = ls === 'dark' || (!ls && prefersDark);
    const root = document.documentElement;
    if (dark) root.classList.add('dark'); else root.classList.remove('dark');
  } catch(_) {}
})();
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
      </head>
      <body className="h-full">
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

        <main className="container-page">{children}</main>

        <footer className="container-page pb-10 pt-6 text-xs text-ink-500 dark:text-ink-400">
          API: <code>{process.env.NEXT_PUBLIC_API_URL}</code>
        </footer>
      </body>
    </html>
  );
}
