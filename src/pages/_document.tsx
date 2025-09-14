// src/pages/_document.tsx
import { Html, Head, Main, NextScript } from "next/document";

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

export default function Document() {
  return (
    <Html lang="en" className="h-full">
      <Head>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
      </Head>
      <body className="h-full">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
