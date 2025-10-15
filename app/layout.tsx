import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { CommentSystem } from '@/components/CommentSystem'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Admin Permissions Wireframe',
  description: 'Healthcare admin tool wireframe',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <CommentSystem />
      </body>
    </html>
  )
}
