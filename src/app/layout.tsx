import type { Metadata } from "next";
import "./globals.css";
import { geistSans, geistMono } from "@/app/ui/fonts";

export const metadata: Metadata = {
  title: "Github repository search",
  description: "Get user's repository by github api",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.className} ${geistMono.className} antialiased flex h-screen flex-col md:flex-row md:overflow-hidden 
        `}
      >
        <div className="flex-grow p-6 md:overflow-y-auto md:p-12 bg-github-black">
          {children}
        </div>
      </body>
    </html>
  );
}
