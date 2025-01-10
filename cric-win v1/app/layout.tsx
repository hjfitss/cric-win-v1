import './globals.css'
import { Inter } from 'next/font/google'
import AspectToggle from './components/AspectToggle'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'CricWin',
  description: 'Live cricket match statistics and betting',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="mx-auto" style={{ maxWidth: 'var(--max-width, 100%)' }}>
          {children}
          <AspectToggle />
        </div>
      </body>
    </html>
  )
}

