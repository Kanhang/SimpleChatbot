// app/products/error.tsx
'use client'; // Error components must be client components

import { useEffect } from 'react';
import type { JSXElement } from "@fluentui/react-components";
import { Button } from "@fluentui/react-components";
import type { ButtonProps } from "@fluentui/react-components";

export default function Error({
  error,
  reset,
}: {
  error: any
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-row justify-center font-xl p-10 m-10">
      <h2>AI chat bot is tried, please try again later</h2>
      <Button onClick={() => reset()}>Try again</Button>
    </div>
  );
}