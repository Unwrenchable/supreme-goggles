import type { Metadata } from 'next';
import "./globals.css";
import '@rainbow-me/rainbowkit/styles.css';
import Providers from '@/components/Providers';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'AtomicFizzCaps Universal Naming Service',
  description:
    'Register Web3 domains with lifetime ownership across Solana, Ethereum, and 15+ blockchains. Pay once, own forever.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className="antialiased bg-gradient-to-br from-slate-900 via-purple-950/30 to-slate-900 min-h-screen font-sans"
      >
        <Providers>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
