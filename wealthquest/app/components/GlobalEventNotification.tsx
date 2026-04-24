'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

const EVENT_HEADLINES: Record<string, { icon: string; title: string; subtitle: string; color: string; bg: string }> = {
  covid_crash: { icon: '📉', title: 'Market Crash!', subtitle: 'Markets fell 18% overnight', color: '#E8453A', bg: 'linear-gradient(135deg, #3a0a0a, #6a1a1a)' },
  bull_run: { icon: '📈', title: 'Bull Run!', subtitle: 'Tech stocks surge +25%', color: '#3A9E5C', bg: 'linear-gradient(135deg, #0a2a0a, #1a4a1a)' },
  rate_hike: { icon: '🏦', title: 'Rate Hike!', subtitle: 'Central bank raises rates', color: '#9B59B6', bg: 'linear-gradient(135deg, #1a0a2a, #2a1a4a)' },
  inflation_spike: { icon: '🔥', title: 'Inflation Spike!', subtitle: 'Inflation hits 8% annually', color: '#E8A820', bg: 'linear-gradient(135deg, #2a1a00, #4a3000)' },
  geopolitical: { icon: '⚠️', title: 'Geopolitical Crisis!', subtitle: 'Markets drop 12% on conflict', color: '#E8453A', bg: 'linear-gradient(135deg, #2a0a0a, #4a1a1a)' },
  recovery_rally: { icon: '🌅', title: 'Recovery Rally!', subtitle: 'Markets bounce back +15%', color: '#3B7AD8', bg: 'linear-gradient(135deg, #0a0a2a, #1a1a4a)' },
}

export default function GlobalEventNotification() {
  const router = useRouter()
  const [pendingEvent, setPendingEvent] = useState<string | null>(null)
  const [visible, setVisible] = useState(false)
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    async function checkEvent() {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) return

      const { data } = await supabase
        .from('profiles')
        .select('portfolio')
        .eq('id', session.user.id)
        .single()

      const eventId = data?.portfolio?.pendingEvent
      if (eventId && !dismissed) {
        setPendingEvent(eventId)
        // Show after 8 seconds — gives user time to get into a quest
        setTimeout(() => setVisible(true), 8000)
      }
    }
    checkEvent()
  }, [])

  function handleReactNow() {
    setVisible(false)
    router.push('/portfolio')
  }

  function handleLater() {
    setVisible(false)
    setDismissed(true)
  }

  if (!pendingEvent || !visible) return null
  const meta = EVENT_HEADLINES[pendingEvent]
  if (!meta) return null

  return (
    <div className="fixed bottom-6 left-4 right-4 z-[200] flex justify-center pointer-events-none">
      <div
        className="w-full max-w-sm rounded-2xl overflow-hidden shadow-2xl pointer-events-auto"
        style={{
          background: meta.bg,
          border: `1.5px solid ${meta.color}66`,
          boxShadow: `0 8px 40px ${meta.color}44`,
          animation: 'slideUp 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
        }}>

        {/* Breaking news bar */}
        <div className="px-4 py-1.5 flex items-center gap-2"
          style={{ background: meta.color, }}>
          <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
          <span className="text-white text-[10px] font-black uppercase tracking-widest">Breaking Market News</span>
        </div>

        {/* Content */}
        <div className="p-4 flex items-center gap-3">
          <div className="text-4xl flex-shrink-0">{meta.icon}</div>
          <div className="flex-1 min-w-0">
            <div className="font-serif font-black text-white text-lg leading-tight">{meta.title}</div>
            <div className="text-sm mt-0.5" style={{ color: 'rgba(255,255,255,0.6)' }}>{meta.subtitle}</div>
            <div className="text-xs mt-1 flex items-center gap-1" style={{ color: 'rgba(255,255,255,0.4)' }}>
              <span>🧙</span>
              <span>Aldric needs your decision</span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2 px-4 pb-4">
          <button
            onClick={handleReactNow}
            className="flex-1 py-2.5 rounded-xl font-black text-sm transition-all active:scale-95 text-white"
            style={{ background: meta.color, boxShadow: `0 3px 12px ${meta.color}66` }}>
            ⚡ React Now
          </button>
          <button
            onClick={handleLater}
            className="px-4 py-2.5 rounded-xl font-bold text-sm transition-all active:scale-95"
            style={{ background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.5)', border: '1px solid rgba(255,255,255,0.1)' }}>
            Later
          </button>
        </div>
      </div>

      <style jsx global>{`
        @keyframes slideUp {
          from { transform: translateY(100px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>
    </div>
  )
}
