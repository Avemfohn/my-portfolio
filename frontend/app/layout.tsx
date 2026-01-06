import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from '@/context/LanguageContext';
import LanguageToggle from '@/components/navigation/LanguageToggle';
import ScrollProgress from '@/components/ui/ScrollProgress';
import ScrollToTop from "@/components/ui/ScrollToTop";
import HomeLink from '@/components/navigation/HomeLink';
import { dictionary } from '@/lib/dictionary';


const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


const t = dictionary.en;

export const metadata: Metadata = {
  title: "Mertcan | Portfolio",
  description: t.blog.description,
  metadataBase: new URL('https://mertcanercan.com'),
  openGraph: {
      title: 'Mertcan Ercan | Portfolio',
      description: t.blog.description,
      url: 'https://mertcanercan.com',
      siteName: 'Mertcan Ercan Portfolio',
      locale: 'en_US',
      type: 'website',
      images: [
        {
          url: '/favicon.ico',
          width: 1200,
          height: 630,
          alt: 'Mertcan Ercan - Portfolio Cover',
        },
      ],
    },
  twitter: {
    card: 'summary_large_image',
    title: 'Mertcan Ercan | Global Traveller & Tech Enthusiast',
    description: t.blog.description,
    images: ['/favicon.ico'],
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        suppressHydrationWarning={true}
        className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} antialiased bg-slate-900 text-slate-200`}
      >
        <LanguageProvider>
          <ScrollProgress />


          <HomeLink />
          <LanguageToggle />


          <main className="min-h-screen relative z-10">
             {children}
          </main>

          <ScrollToTop/>
        </LanguageProvider>
      </body>
    </html>
  );
}