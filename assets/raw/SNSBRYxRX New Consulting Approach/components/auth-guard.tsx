'use client'

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const auth = localStorage.getItem('site-auth')
    const authenticated = auth === 'authenticated'
    setIsAuthenticated(authenticated)

    if (!authenticated && pathname !== '/login') {
      router.replace('/login')
    }
  }, [pathname, router])

  // Show nothing while checking auth
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-[#1A1A1A] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#F06C00]/30 border-t-[#F06C00] rounded-full animate-spin" />
      </div>
    )
  }

  // If on login page, show it regardless of auth status
  if (pathname === '/login') {
    return <>{children}</>
  }

  // If not authenticated, show loading (will redirect)
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#1A1A1A] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#F06C00]/30 border-t-[#F06C00] rounded-full animate-spin" />
      </div>
    )
  }

  return <>{children}</>
}
