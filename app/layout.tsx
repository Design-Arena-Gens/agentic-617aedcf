import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Indian Multibagger Stock Predictor',
  description: 'AI-powered multibagger stock analysis for Indian companies',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="hi">
      <body>{children}</body>
    </html>
  )
}
