import type { Metadata } from 'next';
import { Inter, Karla } from 'next/font/google';
import './globals.css';
import Background from '@/components/Background';

const inter = Inter({ subsets: ['latin'] });
const karla = Karla({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Quizzical',
  description: 'Test your knowledge with Quizzical!',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={`${inter.className} ${karla.className}`}>
        <main className='relative'>
          {children}
          <Background />
        </main>
      </body>
    </html>
  );
}
