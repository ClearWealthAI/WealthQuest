'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase, Profile } from '@/lib/supabase'

const SHOP_ITEMS = [
  {
    id: 'streak_freeze',
    name: 'Streak Freeze',
    icon: '🧊',
    desc: 'Protect your streak for 1 day if you miss logging in.',
    price: 200,
    category: 'streak',
    max: 3,
  },
  {
    id: 'xp_boost',
    name: 'XP Boost',
    icon: '⚡',
    desc: 'Double XP from all quests for 24 hours.',
    price: 500,
    category: 'boost',
    max: 5,
  },
  {
    id: 'hint',
    name: 'Quiz Hint',
    icon: '💡',
    desc: 'Eliminate 2 wrong answers in any quiz question.',
    price: 75,
    category: 'utility',
    max: 10,
  },
  {
    id: 'portfolio_boost',
    name: 'Market Insight',
    icon: '🔮',
    desc: 'See tomorrow\'s market direction (up/down) in the simulator.',
    price: 350,
    category: 'simulator',
    max: 5,
  },
  {
    id: 'icon_knight',
    name: 'Knight Icon',
    icon: '🏰',
    desc: 'Unlock the legendary Knight character icon.',
    price: 1000,
    category: 'cosmetic',
    max: 1,
  },
  {
    id: 'icon_dragon',
    name: 'Dragon Icon',
    icon: '🐉',
    desc: 'Unlock the rare Dragon character icon.',
    price: 2000,
    category: 'cosmetic',
    max: 1,
  },
  {
    id: 'icon_wizard',
    name: 'Wizard Icon',
    icon: '🧙',
    desc: 'Unlock the mystical Wizard character icon.',
    price: 1500,
    category: 'cosmetic',
    max: 1,
  },
  {
    id: 'icon_phoenix',
    name: 'Phoenix Icon',
    icon: '🦅',
    desc: 'Unlock the epic Phoenix character icon.',
    price: 3000,
    category: 'cosmetic',
    max: 1,
  },
]

const CATEGORIES = [
  { id: 'all', label: 'All Items' },
  { id: 'streak', label: '🔥 Streak' },
  { id: 'boost', label: '⚡ Boosts' },
  { id: 'utility', label: '💡 Utility' },
  { id: 'simulator', label: '📊 Simulator' },
  { id: 'cosmetic', label: '🎨 Icons' },
]

export default function ShopPage() {
  const router = useRouter()
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState('all')
  const [notification, setNotification] = useState<{ msg: string; type: 'success' | 'error' } | null>(null)
  const [buying, setBuying] = useState<string | null>(null)

  const inventory: Record<string, number> = (profile as any)?.inventory || {}

  useEffect(() => {
    async function load() {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) { router.push('/login'); return }
      const { data } = await supabase.from('profiles').select('*').eq('id', session.user.id).single()
      setProfile(data)
      setLoading(false)
    }
    load()
  }, [router])

  function showNotif(msg: string, type: 'success' | 'error') {
    setNotification({ msg, type })
    setTimeout(() => setNotification(null), 3000)
  }

  async function handleBuy(item: typeof SHOP_ITEMS[0]) {
    if (!profile) return
    if (profile.gold < item.price) { showNotif('Not enough gold! 🪙', 'error'); return }
    const owned = inventory[item.id] || 0
    if (owned >= item.max) { showNotif('You already own the maximum!', 'error'); return }

    setBuying(item.id)
    const newGold = profile.gold - item.price
    const newInventory = { ...inventory, [item.id]: owned + 1 }

    // If buying a cosmetic icon, also update class_icon
    let extraUpdate: Record<string, any> = {}
    if (item.category === 'cosmetic') {
      extraUpdate.class_icon = item.icon
    }

    await supabase.from('profiles').update({
      gold: newGold,
      inventory: newInventory,
      ...extraUpdate,
    }).eq('id', profile.id)

    setProfile({ ...profile, gold: newGold, inventory: newInventory, ...extraUpdate } as any)
    setBuying(null)
    showNotif(`✅ Purchased ${item.name}!${item.category === 'cosmetic' ? ' Your icon has been updated.' : ''}`, 'success')
  }

  async function signOut() {
    await supabase.auth.signOut()
    router.push('/login')
  }

  if (loading) return (
    <div className="min-h-screen bg-bg flex items-center justify-center">
      <div className="text-4xl animate-pulse">🛒</div>
    </div>
  )
  if (!profile) return null

  const filtered = SHOP_ITEMS.filter(i => activeCategory === 'all' || i.category === activeCategory)

  return (
    <div className="min-h-screen bg-bg">
      {notification && (
        <div className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-2xl text-sm font-bold shadow-lg max-w-[90vw] text-center ${
          notification.type === 'success' ? 'bg-green-bg border border-green-bd text-green-700' : 'bg-red-50 border border-red-200 text-red-700'
        }`}>{notification.msg}</div>
      )}

      <nav className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-border px-4 py-3 flex items-center gap-3">
        <Link href="/dashboard" className="flex items-center gap-2 flex-1">
          <div className="w-8 h-8 rounded-lg bg-gold flex items-center justify-center text-base">⚔️</div>
          <span className="font-serif font-black text-base text-text1">Wealth Quest</span>
        </Link>
        <div className="flex items-center gap-2 text-sm">
          <span className="text-yellow-600 font-bold text-base">🪙 {profile.gold}</span>
          <Link href="/dashboard" className="text-xs text-text3 hover:text-text2">Dashboard</Link>
          <button onClick={signOut} className="text-text3 text-xs hover:text-text2">Exit</button>
        </div>
      </nav>

      <div className="max-w-2xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-5">
          <div className="text-xs font-bold text-text3 uppercase tracking-widest mb-1">🛒 Gold Shop</div>
          <h1 className="font-serif font-black text-2xl text-text1">Spend Your Gold</h1>
          <p className="text-sm text-text2 mt-1">Earn gold by completing quests and daily challenges. Spend it here!</p>
        </div>

        {/* Gold Balance Card */}
        <div className="rounded-2xl p-5 mb-5 relative overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #2a1a00, #4a3000)', border: '1.5px solid rgba(232,168,32,0.4)' }}>
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'repeating-linear-gradient(45deg, white 0, white 1px, transparent 1px, transparent 14px)' }} />
          <div className="relative flex items-center justify-between">
            <div>
              <div className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: 'rgba(245,188,56,0.6)' }}>Your Balance</div>
              <div className="font-serif font-black text-4xl" style={{ color: '#F5BC38' }}>🪙 {profile.gold}</div>
              <div className="text-xs mt-1" style={{ color: 'rgba(255,255,255,0.4)' }}>Earn more by completing quests & daily challenges</div>
            </div>
            <div className="text-6xl opacity-20">💰</div>
          </div>
        </div>

        {/* Inventory */}
        {Object.keys(inventory).length > 0 && (
          <div className="card mb-5">
            <div className="text-xs font-bold text-text3 uppercase tracking-wider mb-3">Your Inventory</div>
            <div className="flex flex-wrap gap-2">
              {Object.entries(inventory).map(([id, qty]) => {
                if (!qty) return null
                const item = SHOP_ITEMS.find(i => i.id === id)
                if (!item) return null
                return (
                  <div key={id} className="flex items-center gap-2 px-3 py-2 rounded-xl bg-gold-bg border border-gold-bd">
                    <span className="text-lg">{item.icon}</span>
                    <div>
                      <div className="text-xs font-bold text-gold-dk">{item.name}</div>
                      <div className="text-xs text-text3">×{qty}</div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* Category Filter */}
        <div className="flex gap-2 mb-5 overflow-x-auto pb-1">
          {CATEGORIES.map(cat => (
            <button key={cat.id} onClick={() => setActiveCategory(cat.id)}
              className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all border ${
                activeCategory === cat.id ? 'bg-gold text-white border-gold' : 'bg-bg2 text-text3 border-border hover:border-gold-bd'
              }`}>{cat.label}</button>
          ))}
        </div>

        {/* Shop Items */}
        <div className="grid grid-cols-2 gap-3">
          {filtered.map(item => {
            const owned = inventory[item.id] || 0
            const maxed = owned >= item.max
            const canAfford = profile.gold >= item.price
            return (
              <div key={item.id} className={`card flex flex-col transition-all ${!maxed && canAfford ? 'hover:border-gold-bd hover:shadow-md' : ''}`}>
                <div className="text-4xl mb-2">{item.icon}</div>
                <div className="font-serif font-black text-sm text-text1 mb-1">{item.name}</div>
                <div className="text-xs text-text2 flex-1 mb-3 leading-relaxed">{item.desc}</div>
                {maxed && (
                  <div className="text-xs font-bold text-green-600 mb-2">✓ Owned{item.max > 1 ? ` (${owned}/${item.max})` : ''}</div>
                )}
                {!maxed && owned > 0 && (
                  <div className="text-xs text-text3 mb-2">{owned}/{item.max} owned</div>
                )}
                <button
                  onClick={() => !maxed && handleBuy(item)}
                  disabled={maxed || buying === item.id}
                  className={`w-full py-2 rounded-xl text-xs font-bold transition-all ${
                    maxed ? 'bg-bg3 text-text3 cursor-default' :
                    !canAfford ? 'bg-bg3 text-text3 cursor-not-allowed' :
                    buying === item.id ? 'bg-gold/50 text-white' :
                    'bg-gold text-white hover:bg-yellow-500 active:scale-95'
                  }`}>
                  {maxed ? '✓ Owned' : buying === item.id ? '...' : `🪙 ${item.price} Gold`}
                </button>
                {!maxed && !canAfford && (
                  <div className="text-xs text-center text-text3 mt-1">Need {item.price - profile.gold} more 🪙</div>
                )}
              </div>
            )
          })}
        </div>

        {/* How to earn gold */}
        <div className="card mt-5 bg-gold-bg border-gold-bd">
          <div className="text-sm font-bold text-gold-dk mb-3">💡 How to earn more Gold</div>
          <div className="flex flex-col gap-2">
            {[
              { action: 'Complete a Quest', reward: '+10–50 🪙' },
              { action: 'Daily Quest (correct answer)', reward: '+5–6 🪙' },
              { action: '7-day Streak milestone', reward: '+50 🪙 bonus' },
              { action: '30-day Streak milestone', reward: '+200 🪙 bonus' },
              { action: 'Chapter Complete', reward: '+50–75 🪙' },
            ].map(e => (
              <div key={e.action} className="flex justify-between items-center text-xs">
                <span className="text-text2">{e.action}</span>
                <span className="font-bold text-gold-dk">{e.reward}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
