'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function AuthCallback() {
  const router = useRouter()

  useEffect(() => {
    const handleCallback = async () => {
      const { data, error } = await supabase.auth.getSession()
      if (data.session) {
        router.push('/dashboard')
      } else {
        const hash = window.location.hash
        if (hash) {
          const params = new URLSearchParams(hash.substring(1))
          const accessToken = params.get('access_token')
          const refreshToken = params.get('refresh_token')
          if (accessToken && refreshToken) {
            await supabase.auth.setSession({
              access_token: accessToken,
              refresh_token: refreshToken,
            })
            router.push('/dashboard')
            return
          }
        }
        router.push('/login')
      }
    }
    handleCallback()
  }, [router])

  return (
    <div className="min-h-screen bg-[#F8F6F1] flex flex-col items-center justify-center gap-4">
      <div className="text-5xl animate-pulse">⚔️</div>
      <p className="text-[#6B6355] font-semibold">Confirming your account...</p>
    </div>
  )
}
