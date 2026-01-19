import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { NavBar } from "@/components/NavBar";
import { TailButton } from "@/components/TailButton";



const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Dora-Pocket: A Digital Companion",
  description: "A digital 4D pocket for every Nobita. Interactive gadgets, anywhere door, and more!",
  keywords: ["Doraemon", "Nobita", "Gadgets", "Interactive", "Next.js", "Neumorphism"],
  openGraph: {
    title: "Dora-Pocket",
    description: "Your personal 4D pocket.",
    type: "website",
    images: [
      {
        url: "/opengraph-image.jpg",
        width: 1200,
        height: 630,
        alt: "Dora-Pocket Preview",
      }
    ],
  },
  icons: {
    icon: '/icon.png',
    apple: '/icon.png',
  }
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
      </head>
      <body
        className={`${outfit.variable} antialiased min-h-screen`}
      >
        <div className="fixed top-0 left-0 w-full h-full -z-50 bg-[var(--background)] opacity-50 bg-[radial-gradient(#0096D7_1px,transparent_1px)] [background-size:20px_20px]" />
        {children}
        <NavBar />
        <TailButton />
      </body>
    </html>
  );
}
