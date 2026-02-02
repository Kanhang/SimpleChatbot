// app/providers.tsx
"use client"; // This directive is crucial for client-side functionality

import * as React from "react";
import { FluentProvider, webLightTheme, SSRProvider, RendererProvider, createDOMRenderer } from "@fluentui/react-components";

export function Providers({ children }: { children: React.ReactNode }) {
  const [hasMounted, setHasMounted] = React.useState(false);

  React.useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null; // Render nothing on the server
  }

  const renderer = createDOMRenderer();

  return (
    <RendererProvider renderer={renderer}>
      <SSRProvider>
        <FluentProvider theme={webLightTheme}>
          {children}
        </FluentProvider>
      </SSRProvider>
    </RendererProvider>
  );
}