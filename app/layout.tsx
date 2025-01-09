import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
// import { ClerkProvider } from "@clerk/nextjs";

export const metadata: Metadata = {
  title: "Notion Clone",
  description: "Cloned by drCoder with NextJs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // <ClerkProvider>
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
          storageKey="notion-clone-theme">
          {children}

        </ThemeProvider>
      </body>
    </html>
    // </ClerkProvider>
  );
}
