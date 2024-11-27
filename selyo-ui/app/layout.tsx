import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "@/components/providers";

const inter = Inter({ subsets: ["latin"] });

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Selyo",
  description:
    "Platform for tokenizing social interactions. We help organizers gather real-time data from their participants to help them run raffles, giveaways, and help understand attendees behavior to bring the best experience for your in-person events.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="preload"
          href="/font/Mokoto.ttf"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <meta name="dscvr:canvas:version" content="vNext" />
      </head>

      <body className={inter.className} suppressHydrationWarning={true}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
