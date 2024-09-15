import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
   title: 'Augmented PDF Loader',
   description:
      'An augmented PDF loader made with langchain. Read PDFs and answer questions with AI.',
};

export default function RootLayout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   return (
      <html className="dark" lang="en">
         <body className={inter.className}>{children}</body>
      </html>
   );
}
