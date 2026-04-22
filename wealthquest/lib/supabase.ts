import { createClient } from '@supabase/supabase-js'
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
export const supabase = createClient(supabaseUrl, supabaseAnonKey)
export type Profile = {
  id: string
  username: string
  class_icon: string
  class_name: string
  level: number
  xp: number
  gold: number
  completed_quests: number[]
  created_at: string
  streak: number
  longest_streak: number
  last_login: string | null
  portfolio: any | null
  inventory: Record<string, number>
}
