import type { Metadata } from 'next'
import { Cormorant_Garamond, Inter } from 'next/font/google'
import { CartProvider } from '@/components/cart-provider'
import { Analytics } from '@vercel/analytics/next'
import { SiteContentProvider } from '@/components/site-content-provider'
import './globals.css'

const cormorant = Cormorant_Garamond({ 
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant"
});

const inter = Inter({ 
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter"
});

export const metadata: Metadata = {
  title: 'Лаванда | Магазин лавандовых букетов и композиций',
  description: 'Натуральная лаванда из Прованса. Букеты, композиции, эфирные масла и саше ручной работы.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ru">
      <body className={`${cormorant.variable} ${inter.variable} font-sans antialiased`}>
        <SiteContentProvider>
          <CartProvider>{children}</CartProvider>
        </SiteContentProvider>
        <Analytics />
      </body>
    </html>
  )
}
