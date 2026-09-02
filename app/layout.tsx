import type { Metadata } from 'next'
import { Cormorant_Garamond, Inter } from 'next/font/google'
import { CartProvider } from '@/components/cart-provider'
import { SiteContentProvider } from '@/components/site-content-provider'
import { VisitBookingProvider } from '@/components/visit-booking-provider'
import { defaultSiteContent } from '@/lib/site-content'
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
  metadataBase: new URL('https://lavandabel.by'),
  title: 'Лавандовое поле «Блакітны сад» — лаванда из Беларуси',
  description:
    'Натуральная лаванда, выращенная на собственном поле в Беларуси. Букеты, композиции и саше ручной работы. Посещение лавандового поля, доставка по Беларуси.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Лавандовое поле «Блакітны сад» — лаванда из Беларуси',
    description:
      'Натуральная лаванда с собственного поля в Беларуси. Букеты, композиции и саше ручной работы.',
    url: 'https://lavandabel.by/',
    siteName: 'Лавандовое поле «Блакітны сад»',
    locale: 'ru_RU',
    type: 'website',
    images: [{ url: '/images/lavender-2.jpg', width: 1600, height: 1067 }],
  },
  icons: {
    icon: [{ url: '/icon.svg', type: 'image/svg+xml' }],
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
        <SiteContentProvider initialContent={defaultSiteContent}>
          <CartProvider>
            <VisitBookingProvider>{children}</VisitBookingProvider>
          </CartProvider>
        </SiteContentProvider>
      </body>
    </html>
  )
}
