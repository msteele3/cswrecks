// app/layout.tsx

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CSWrecks",
  description: "Unofficial Georgia Tech CS Student Portfolio Directory",
  openGraph: {
    title: "CSWrecks Directory",
    description: "Unofficial Directory of Georgia Tech CS Student Portfolios",
    url: "https://cswrecks.com",
    siteName: "CSWrecks",
    images: [
      {
        url: "/cswrecks-logo.png",
        width: 400,
        height: 300,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CSWrecks Directory",
    description: "List of Georgia Tech CS Student Portfolios",
    images: ["/cswrecks-logo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
      
    </html>
  );
}