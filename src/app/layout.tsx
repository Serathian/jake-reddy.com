import type { Metadata } from 'next'
import { Syne, Lora, Geist_Mono } from 'next/font/google'
import Nav from '@/components/nav'
import Footer from '@/components/footer'
import './globals.css'

const syne = Syne({
  variable: '--font-syne',
  subsets: ['latin'],
  weight: ['400', '600', '700', '800'],
  display: 'swap',
})

const lora = Lora({
  variable: '--font-lora',
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  display: 'swap',
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Jake Reddy — Full Stack Developer',
    template: '%s · Jake Reddy',
  },
  description:
    'Full stack developer with 4 years of experience building production web systems — from self-hosted infrastructure to polished user interfaces.',
  metadataBase: new URL('https://jake-reddy.com'),
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${lora.variable} ${geistMono.variable}`}
    >
      <body>
        <Nav />
        <main className="pt-14 min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
