import "./globals.css";
import Providers from "./providers";
export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="h-full flex flex-col">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
