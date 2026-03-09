// lib/supabase/admin.ts
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { Database } from './types'

// This is for admin actions that require authentication
export async function createAdminClient() {
  const cookieStore = await cookies()
  
  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        set(name: string, value: string, options: any) {
          try {
            cookieStore.set({ name, value, ...options })
          } catch (error) {
            // Handle cookies in edge cases
          }
        },
        remove(name: string, options: any) {
          try {
            cookieStore.set({ name, value: '', ...options })
          } catch (error) {
            // Handle cookies in edge cases
          }
        },
      },
    }
  )
}

// Helper to check if user is admin
export async function isAdmin() {
  const supabase = await createAdminClient()
  const { data: { session } } = await supabase.auth.getSession()
  
  if (!session) return false
  
  // Check if user has admin role in your custom logic
  // You can store admin emails in env or create an admins table
  const adminEmails = process.env.ADMIN_EMAILS?.split(',') || []
  return adminEmails.includes(session.user.email || '')
}