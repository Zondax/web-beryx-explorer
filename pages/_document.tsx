import { Head, Html, Main, NextScript } from 'next/document'

/**
 * Document function returns a universal HTML layout.
 * This is important for setting HTML document-level markup,
 * like meta tags and link that need to be included even before styled-jsx and other styles are included in the page.
 * @returns A component with the basic HTML layout.
 */
export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Link to various version of the website's favicon */}
        <link rel="icon" href="/favicon-192.svg" type="image/svg+xml" />
        <link rel="alternate icon" href="/favicon.ico" />
        <link rel="mask-icon" href="/favicon-192.svg" />
        <link rel="apple-touch-icon" href="/favicon-192.png" />

        {/* Preconnect to Google fonts for performance optimization */}
        <link rel="preconnect" href="https://fonts.googleapis.com?display=optional" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Link to Google fonts used on the website */}
        <link href="https://fonts.googleapis.com/css2?family=Sora:wght@100;200;300;400;500;600;700;800&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&display=swap" rel="stylesheet" />
        {/* <link href="https://fonts.googleapis.com/css2?family=DM+Mono:wght@300;400;500&display=swap" rel="stylesheet" /> */}
        <link href="https://fonts.googleapis.com/css2?family=Fragment+Mono&display=swap" rel="stylesheet" />
      </Head>
      <body>
        {/* Main document body with Next.js Main and NextScript component for handling SSR pages */}
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
