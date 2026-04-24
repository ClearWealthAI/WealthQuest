import type { Metadata } from 'next'
import './globals.css'
import GlobalEventNotification from '@/components/GlobalEventNotification'

export const metadata: Metadata = {
  title: 'Wealth Quest — Learn to Invest Like a Game',
  description: 'The world\'s first RPG investing education platform. Complete quests, earn XP, build real wealth.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        <GlobalEventNotification />
      </body>
    </html>
  )
}
