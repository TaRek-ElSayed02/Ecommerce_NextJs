import { Geist, Geist_Mono } from "next/font/google";
import { metadata } from "@/app/metadata";
import { auth } from "@/util/auth";
import ClientWrapper from "@/components/ClientWrapper";
import "./globals.css";
import { SessionProvider } from "next-auth/react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  
  const session = await auth().catch((err) => {
    console.error("Auth Error:", err);
    return null; 
  });

  console.log("Session Data:", session);

  return (
    <html lang="en" dir="ltr">
      <head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <SessionProvider>
        <ClientWrapper session={session}>{children}</ClientWrapper>
        </SessionProvider>
      </body>
    </html>
  );
}
