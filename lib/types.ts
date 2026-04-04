export type Messenger = "telegram" | "viber"

export interface Category {
  id: string
  label: string
  icon: string
}

export interface Product {
  id: string
  slug: string
  name: string
  category: string
  price: number
  image: string
  description: string
  badge?: string
  badgeColor?: string
  featured?: boolean
}

export interface ContactLink {
  label: string
  href: string
  value: string
}

export interface SiteSettings {
  brandName: string
  telegram: ContactLink
  viber: ContactLink
  instagram: ContactLink
  phone: string
  workingHours: string
  location: string
}

export interface HeroContent {
  badge: string
  titlePrefix: string
  titleAccent: string
  titleSuffix: string
  description: string
  image: string
  floatingCardLeftTitle: string
  floatingCardLeftText: string
  floatingCardRightTitle: string
  floatingCardRightText: string
}

export interface AboutFeature {
  title: string
}

export interface AboutContent {
  eyebrow: string
  title: string
  description: string
  gallery: Array<{
    src: string
    alt: string
  }>
  heading: string
  paragraphs: string[]
  features: AboutFeature[]
}

export interface ProductionStep {
  number: string
  title: string
  description: string
}

export interface ProductionContent {
  eyebrow: string
  title: string
  description: string
  steps: ProductionStep[]
  bannerImage: string
  bannerTitle: string
  bannerText: string
}

export interface VisitFeature {
  title: string
  text: string
}

export interface VisitContent {
  eyebrow: string
  title: string
  description: string
  gallery: Array<{
    src: string
    alt: string
  }>
  heading: string
  paragraphs: string[]
  features: VisitFeature[]
  ctaLabel: string
  ctaLink: string
  bannerTitle: string
  bannerText: string
}

export interface PurchaseOption {
  title: string
  description: string
  action: string
  link: string
  highlight?: boolean
}

export interface SiteContent {
  categories: Category[]
  products: Product[]
  settings: SiteSettings
  hero: HeroContent
  about: AboutContent
  production: ProductionContent
  visit: VisitContent
  purchaseOptions: PurchaseOption[]
}

export interface InquiryPayload {
  type: "order" | "contact"
  customerName: string
  phone: string
  messenger: Messenger
  comment?: string
  productId?: string
  productName?: string
}
