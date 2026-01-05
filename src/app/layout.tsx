import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import StyledComponentsRegistry from "@/lib/styled-components-registry";
import GlobalStyle from "@/components/GlobalStyle";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-party",
  weight: ["400", "500", "600", "700"],
});

const description =
  "Честит рожден ден на Богдан Лозанов. Вземи си бонбон и се забавлявай.";

export const metadata: Metadata = {
  title: "Party Night — Bogdan Lozanov",
  description,
  openGraph: {
    title: "Party Night — Bogdan Lozanov",
    description,
    type: "website",
    images: ["/opengraph-image"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Party Night — Bogdan Lozanov",
    description,
    images: ["/twitter-image"],
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
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
