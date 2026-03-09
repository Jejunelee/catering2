// app/blog/admin/layout.tsx
import { redirect } from 'next/navigation'
import { createAdminClient, isAdmin } from '@/app/lib/supabase/admin'
import AdminNav from './components/AdminNav'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // We can't easily get the pathname in a layout,
  // so let's try a different approach
  
  const supabase = await createAdminClient()
  const { data: { session } } = await supabase.auth.getSession()
  const admin = await isAdmin()

  // If there's no session, let the proxy handle the redirect
  // The proxy already has logic to allow access to /login
  if (!session || !admin) {
    // Don't redirect here - let the proxy handle it
    // Just return children and let the proxy decide
    return <>{children}</>
  }

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      <AdminNav user={session.user} />
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {children}
      </div>
    </div>
  )
}