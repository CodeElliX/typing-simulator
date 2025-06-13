import type { Metadata } from "next";
import "./globals.css";
import Header from '../../components/header/Header';
import Footer from '../../components/footer/page';
import { Nunito } from 'next/font/google';
import { Providers } from './utils/providers';
import ScreenSizeWrapper from './utils/screen-size-wrapper/ScreenSizeWrapper';


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
        <ScreenSizeWrapper>
          <Header />
          <Providers>
            {children}
          </Providers>
        </ScreenSizeWrapper>
        <Footer />
      </body>
    </html>
  );
}
