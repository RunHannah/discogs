import type { Metadata } from "next";
import { Teko } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

const teko = Teko({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-teko",
});

export const metadata: Metadata = {
  title: "Music Search",
  description: "Search for music on Discogs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${teko.variable} relative min-h-screen`}>
        <Header />
        <main className="pb-24">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
