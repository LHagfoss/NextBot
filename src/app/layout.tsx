import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import "./globals.css";
import AuthProvider from '@/providers/session-provider';

const rubik = Rubik({
  variable: "--rubik",
  subsets: ["latin"],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "NextBot",
  description: "Meet NextBot: Your all-in-one Discord sidekick, here to streamline chats, manage tasks, and elevate your server experience effortlessly.",
  openGraph: {
    title: "NextBot",
    description: "Meet NextBot: Your all-in-one Discord sidekick, here to streamline chats, manage tasks, and elevate your server experience effortlessly.",
    images: [
      {
        url: "/opengraph.png",
        width: 1280,
        height: 720,
        alt: "NextBot",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={rubik.variable}>
      <body className="antialiased">
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
