//import { FluentProvider, webLightTheme } from '@fluentui/react-components';
import { Providers } from "./providers"; // Adjust path as needed

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
