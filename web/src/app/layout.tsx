import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Weather App",
  description: "A modern weather app with city forecasts",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gradient-to-b from-blue-400/60 to-blue-200/30 text-gray-900">
        {children}
      </body>
    </html>
  );
}
