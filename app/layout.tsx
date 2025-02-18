import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: "Search Discogs",
  description: "Search for music on Discogs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className="relative min-h-screen"
      >
        <Header />
        <main className="pb-24">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
