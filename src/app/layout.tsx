import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "The Last Ride - 9 de Mayo 2026",
  description: "La fiesta del año en Hermosillo. Prepárate para la mejor noche de tu vida.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="h-full">
      <body className="h-full min-h-screen">{children}</body>
    </html>
  );
}