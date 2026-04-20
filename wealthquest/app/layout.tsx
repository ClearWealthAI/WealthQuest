import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Wealth Quest — Learn to Invest Like a Game',
  description: 'The world\'s first RPG investing education platform. Complete quests, earn XP, build real wealth.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
