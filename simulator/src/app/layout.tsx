import type { Metadata } from "next";
import "./globals.css";
import Header from '../../components/header/Header';
import { Nunito } from 'next/font/google';
import { Providers } from './utils/providers'
const nunito = Nunito({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: "Техніка сліпого друку",
  description: "Симулятор для вивчення техніки сліпого друку",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uk">
      <body className={nunito.className}>
        <Header />
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
