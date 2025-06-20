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

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: 'no',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uk">
      <head>
        <meta name="robots" content="noindex, nofollow" />
      </head>
      <body className={nunito.className} suppressHydrationWarning={true}>
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
