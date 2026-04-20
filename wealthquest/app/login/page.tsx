'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) { setError(error.message); setLoading(false) }
    else router.push('/dashboard')
  }

  return (
    <div className="min-h-screen bg-bg flex flex-col items-center justify-center px-4">
      {/* Logo */}
      <Link href="https://clearwealthai.com" className="flex items-center gap-2 mb-8">
        <div className="w-10 h-10 rounded-xl bg-gold flex items-center justify-center text-xl shadow-md">⚔️</div>
        <span className="font-serif font-black text-xl text-text1">Wealth Quest</span>
      </Link>

      <div className="card w-full max-w-md">
        <h1 className="font-serif font-black text-2xl text-text1 mb-1">Welcome back</h1>
        <p className="text-text2 text-sm mb-6">Continue your investing journey.</p>

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <div>
            <label className="text-xs font-bold text-text3 uppercase tracking-wider mb-1.5 block">Email</label>
            <input className="input" type="email" placeholder="your@email.com"
              value={email} onChange={e => setEmail(e.target.value)} required />
          </div>
          <div>
            <label className="text-xs font-bold text-text3 uppercase tracking-wider mb-1.5 block">Password</label>
            <input className="input" type="password" placeholder="••••••••"
              value={password} onChange={e => setPassword(e.target.value)} required />
          </div>
          {error && <p className="text-red-500 text-sm bg-red-50 rounded-xl px-4 py-3">{error}</p>}
          <button className="btn-gold w-full mt-2" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign In →'}
          </button>
        </form>

        <div className="mt-6 pt-5 border-t border-border text-center">
          <p className="text-sm text-text2">
            New adventurer?{' '}
            <Link href="/register" className="text-gold-dk font-bold hover:underline">Create account</Link>
          </p>
        </div>
      </div>

      <p className="mt-6 text-xs text-text3 text-center max-w-xs">
        Not financial advice. Educational purposes only.
      </p>
    </div>
  )
}
