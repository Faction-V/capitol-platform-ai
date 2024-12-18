import type { ReactNode } from "react";
import type { Metadata } from "next";
import localFont from "next/font/local";
import "react-toastify/dist/ReactToastify.css";
import "./globals.css";
import { Toast } from "./toast";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Capitol Platform AI",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased h-dvh`}
      >
        {children}
        <Toast />
      </body>
    </html>
  );
}
