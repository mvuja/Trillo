import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Trillo',
  description: 'Organize anything, together. Trillo is a collaboration tool that organizes your projects into boards. In one glance, know what\'s being worked on, who\'s working on what, and where something is in a process.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <div className="layout">
          {children}
        </div>
      </body>
    </html>
  )
}
