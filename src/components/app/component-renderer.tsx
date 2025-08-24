
'use client';

import * as React from 'react';

interface ComponentRendererProps {
  code?: string;
  framework?: 'html' | 'tailwindcss';
  html?: string;
}

export function ComponentRenderer({ code, framework, html }: ComponentRendererProps) {
  const getIframeSrcDoc = () => {
    // If a full HTML document is provided (e.g., from the server-side image generation flow), use it directly.
    if (html) {
      // Ensure the provided HTML is a full document. If not, wrap it.
      if (html.trim().startsWith('<')) {
        return html;
      }
    }

    // Otherwise, construct the srcDoc for client-side previewing of generated code.
    if (!code) return '';

    // Base styles to ensure proper centering and background.
    const baseStyles = `
      body {
        font-family: Inter, sans-serif;
        background-color: transparent; /* Allows parent background to show through */
      }
      /* This wrapper is crucial for centering content of any size */
      .render-wrapper {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        min-height: 100vh; /* Use min-height to handle components of varying sizes */
        padding: 1rem;
        box-sizing: border-box;
      }
    `;

    const bodyContent = `<div class="render-wrapper">${code}</div>`;

    // Construct the full HTML document for the iframe, including the Tailwind CDN.
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <script src="https://cdn.tailwindcss.com"></script>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
          <link href="https://fonts.googleapis.com/css2?family=Source+Code+Pro:wght@400;500&display=swap" rel="stylesheet" />
          <style>${baseStyles}</style>
        </head>
        <body>
          ${bodyContent}
        </body>
      </html>
    `;
  };

  const iframeSrcDoc = getIframeSrcDoc();

  // Use a key to force re-render when the content changes, which is crucial for iframe updates.
  return (
    <div className="relative w-full h-full rounded-md overflow-hidden bg-transparent">
        <iframe
            key={iframeSrcDoc}
            srcDoc={iframeSrcDoc}
            title="Component Preview"
            sandbox="allow-scripts allow-same-origin"
            className="w-full h-full border-0 bg-transparent"
        />
    </div>
  );
}
