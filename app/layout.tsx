import type { Metadata } from "next";
import {inter } from '@/app/ui/fonts';
import "./globals.css";


export const metadata: Metadata = {
  title: {
    template: '%s | RMW',
    default: 'Ride my way',
  },
  description: 'Ride sharing service if persons are traveling in the same direction',
};


export default function RootLayout({children,}: Readonly<{children: React.ReactNode;}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}
