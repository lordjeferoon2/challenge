import "../styles/globals.css";
import React from "react";

export const metadata = {
  title: "Mi App",
  description: "Frontend con PrimeReact y Next.js",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
