// app/blog/admin/components/AdminNav.tsx
'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { createClient } from '@/app/lib/supabase/client'
import { 
  LayoutDashboard, 
  FileText, 
  Users, 
  BookOpen,
  LogOut,
  Menu,
  X
} from 'lucide-react'
import { useState } from 'react'
import { User } from '@supabase/supabase-js'

interface Props {
  user: User
}

export default function AdminNav({ user }: Props) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const supabase = createClient()

  const navigation = [
    { name: 'Dashboard', href: '/blog/admin', icon: LayoutDashboard },
    { name: 'Posts', href: '/blog/admin/posts', icon: FileText },
    { name: 'Categories', href: '/blog/admin/categories', icon: BookOpen },
    { name: 'Authors', href: '/blog/admin/authors', icon: Users },
  ]

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/blog')
    router.refresh()
  }

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center gap-6">
            {/* Logo */}
            <Link href="/blog/admin" className="flex-shrink-0 flex items-center">
              <span className="font-jost text-xl text-gray-900 hover:text-[#F28C28] transition-colors">
                Blog Admin
              </span>
            </Link>
            
            {/* Desktop Navigation */}
            <div className="hidden sm:flex sm:space-x-1">
              {navigation.map((item) => {
                const isActive = pathname === item.href || 
                  (item.href !== '/blog/admin' && pathname?.startsWith(item.href))
                
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                      isActive
                        ? 'bg-[#F28C28]/10 text-[#D97C1A]'
                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                  >
                    <item.icon size={18} className={isActive ? 'text-[#D97C1A]' : 'text-gray-500'} />
                    {item.name}
                  </Link>
                )
              })}
            </div>
          </div>

          {/* Desktop Right side */}
          <div className="hidden sm:flex sm:items-center gap-3">
            <div className="flex items-center gap-3 px-3 py-1.5 bg-gray-50 rounded-lg border border-gray-200">
              <div className="w-6 h-6 rounded-full bg-[#F28C28] flex items-center justify-center text-white text-xs font-medium">
                {user.email?.[0].toUpperCase()}
              </div>
              <span className="text-sm text-gray-700 font-medium">{user.email}</span>
            </div>
            <button
              onClick={handleLogout}
              className="p-2 text-gray-500 hover:text-gray-900 rounded-lg hover:bg-gray-100 transition-colors"
              title="Sign out"
            >
              <LogOut size={20} />
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center sm:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden border-t border-gray-200 bg-white">
          <div className="pt-2 pb-3 space-y-1 px-2">
            {navigation.map((item) => {
              const isActive = pathname === item.href ||
                (item.href !== '/blog/admin' && pathname?.startsWith(item.href))
              
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 text-base font-medium rounded-lg transition-colors ${
                    isActive
                      ? 'bg-[#F28C28]/10 text-[#D97C1A]'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <item.icon size={20} className={isActive ? 'text-[#D97C1A]' : 'text-gray-500'} />
                  {item.name}
                </Link>
              )
            })}
          </div>
          
          {/* Mobile user section */}
          <div className="border-t border-gray-200 pt-4 pb-3 px-4">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="h-10 w-10 rounded-full bg-[#F28C28] flex items-center justify-center text-white font-medium text-lg">
                  {user.email?.[0].toUpperCase()}
                </div>
              </div>
              <div className="ml-3 flex-1">
                <div className="text-sm font-medium text-gray-900 truncate">{user.email}</div>
              </div>
              <button
                onClick={handleLogout}
                className="p-2 text-gray-500 hover:text-gray-900 rounded-lg hover:bg-gray-100 transition-colors"
                title="Sign out"
              >
                <LogOut size={20} />
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}