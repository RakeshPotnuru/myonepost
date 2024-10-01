import { Inter } from "next/font/google";

import type { Metadata, Viewport } from "next";

import "@/styles/globals.css";
import { BreakpointViewer } from "@/components/modules/dev-tools/breakpoint-viewer";
import { ThemeToggleButton } from "@/components/modules/dev-tools/theme-toggle";
import { Toaster } from "@/components/ui/reusables/sonner";
import { siteConfig } from "@/config/site";
import Providers from "@/lib/providers";
import { cn } from "@/utils/cn";

const inter = Inter({
  display: "swap",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: `%s | ${siteConfig.title}`,
    default: siteConfig.title,
  },
  description: siteConfig.description,
  metadataBase: new URL(siteConfig.url),
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.title,
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    creator: siteConfig.twitter.creator,
    site: siteConfig.twitter.site,
  },
  appLinks: {
    web: {
      url: siteConfig.url,
    },
  },
  category: "Social Media",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: siteConfig.theme.color,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn("antialiased", inter.className)}>
        <Providers>
          {children}
          <Toaster richColors />
          {process.env.NODE_ENV === "development" && (
            <>
              <BreakpointViewer />
              <ThemeToggleButton />
            </>
          )}
        </Providers>
      </body>
    </html>
  );
}
