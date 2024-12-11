import type { Metadata } from "next";

import { ThemeProvider } from "@/components/theme-provider";

import "./globals.css";

export const metadata: Metadata = {
  title: "ProjectHub - Project Management",
  description: "ProjectHub is a project management tool for developers.",
  icons: [
    {
      media: "(prefers-color-scheme: dark)",
      url: "/favicon-dark.svg",
      href: "/favicon-dark.svg",
    },
    {
      media: "(prefers-color-scheme: light)",
      url: "/favicon-light.svg",
      href: "/favicon-light.svg",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>📦</text></svg>"
        /> */}
      </head>
      <body className="h-screen w-screen">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
