import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import StyledComponentsRegistry from "@/lib/styled-components-registry";
import GlobalStyle from "@/components/GlobalStyle";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-party",
  weight: ["400", "500", "600", "700"],
});

const siteTitle = "Честит рожден ден на Богдан Лозанов 🎉";
const description = "Почерпи се с бонбони!";
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
const shouldRenderAnalytics = process.env.NODE_ENV === "production";
const ogImagePath = "/og/og-img.png";
const iconPath = "/icon.png";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: siteTitle,
  description,
  openGraph: {
    title: siteTitle,
    description,
    type: "website",
    siteName: "Party Night",
    locale: "bg_BG",
    images: [
      {
        url: ogImagePath,
        width: 1200,
        height: 630,
        alt: siteTitle,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description,
    images: [ogImagePath],
  },
  icons: {
    icon: iconPath,
    apple: iconPath,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="bg">
      <body className={spaceGrotesk.variable}>
        <StyledComponentsRegistry>
          <GlobalStyle />
          {children}
          {shouldRenderAnalytics ? <Analytics /> : null}
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
