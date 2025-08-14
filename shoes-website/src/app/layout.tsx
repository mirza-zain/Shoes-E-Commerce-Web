import type { Metadata } from "next";
import "./globals.css";
import 'remixicon/fonts/remixicon.css';
import Navbar from "../components/Navbar";
import { Footer } from "../components/Footer";


export const metadata: Metadata = {
  title: "Random Fashion - Premium Footwear & Sneakers",
  description: "Discover premium footwear and sneakers designed for movement. Shop Nike, Adidas, Puma and more at Random Fashion.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className="antialiased min-h-screen flex flex-col items-center"
        suppressHydrationWarning={true}
      >
        <Navbar />
        <div className="flex-1">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
