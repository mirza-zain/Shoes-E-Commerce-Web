import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/Navbar";
import MaintenanceBanner from "./components/MaintenanceBanner";


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
        className="antialiased min-h-screen flex flex-col"
        suppressHydrationWarning={true}
      >
        <MaintenanceBanner />
        <Navbar />
        <div className="flex-1">
          {children}
        </div>
      </body>
    </html>
  );
}
