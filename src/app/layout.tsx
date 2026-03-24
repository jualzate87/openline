import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "The Open Line",
  description:
    "A safe harbor for the things unsaid. Anonymous, objective, and purely for the growth of our team.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="h-full">{children}</body>
    </html>
  );
}
