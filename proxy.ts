// middleware.ts
import { createServerClient } from '@supabase/ssr'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function proxy(req: NextRequest) {
  console.log('=== MIDDLEWARE RUNNING ===')
  console.log('Path:', req.nextUrl.pathname)
  // Add this right before the final return res
console.log('=== FINAL DECISION ===')
console.log('Allowing access to:', req.nextUrl.pathname)
  console.log('ENV CHECK:', {
  url: process.env.NEXT_PUBLIC_SUPABASE_URL ? '✅' : '❌',
  key: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? '✅' : '❌',
  admins: process.env.ADMIN_EMAILS
})
  
  const res = NextResponse.next()
  
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          const cookie = req.cookies.get(name)?.value
          console.log(`Getting cookie ${name}:`, cookie ? 'exists' : 'not found')
          return cookie
        },
        set(name: string, value: string, options: any) {
          console.log(`Setting cookie ${name}`)
          res.cookies.set({
            name,
            value,
            ...options,
          })
        },
        remove(name: string, options: any) {
          console.log(`Removing cookie ${name}`)
          res.cookies.set({
            name,
            value: '',
            ...options,
          })
        },
      },
    }
  )

  const {
    data: { session },
  } = await supabase.auth.getSession()
  
  console.log('Session exists:', !!session)
  if (session) {
    console.log('User email:', session.user.email)
  }

  // Protect admin routes
  if (req.nextUrl.pathname.startsWith('/blog/admin')) {
    console.log('Admin route detected')
    
    // Allow access to login page if not authenticated
    if (req.nextUrl.pathname === '/blog/admin/login') {
      console.log('Login page accessed')
      
      if (session) {
        console.log('User already logged in, checking admin status')
        const adminEmails = process.env.ADMIN_EMAILS?.split(',') || []
        console.log('Admin emails:', adminEmails)
        
        if (adminEmails.includes(session.user.email || '')) {
          console.log('User is admin, redirecting to dashboard')
          return NextResponse.redirect(new URL('/blog/admin', req.url))
        } else {
          console.log('User is not admin, redirecting to blog')
          return NextResponse.redirect(new URL('/blog', req.url))
        }
      }
      
      console.log('No session, allowing access to login page')
      return res
    }

    // For all other /blog/admin/* paths, require authentication
    if (!session) {
      console.log('No session, redirecting to login')
      const redirectUrl = new URL('/blog/admin/login', req.url)
      return NextResponse.redirect(redirectUrl)
    }

    // Check if user is admin
    const adminEmails = process.env.ADMIN_EMAILS?.split(',') || []
    if (!adminEmails.includes(session.user.email || '')) {
      console.log('User not admin, redirecting to blog')
      return NextResponse.redirect(new URL('/blog', req.url))
    }
    
    console.log('Admin access granted')
  }

  return res
}

export const config = {
  matcher: ['/blog/admin/:path*'],
}