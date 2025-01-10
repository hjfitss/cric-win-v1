'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import AdminMatchList from '../components/AdminMatchList'
import Link from 'next/link'

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const adminAuthenticated = localStorage.getItem('adminAuthenticated')
    if (adminAuthenticated !== 'true') {
      router.push('/admin/login')
    } else {
      setIsAuthenticated(true)
    }
  }, [router])

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-blue-600">CricWin Admin</h1>
        <div className="space-x-4 mb-8">
          <Link href="/" className="inline-block bg-blue-500 text-white px-4 py-2 rounded">
            Back to Main Page
          </Link>
          <Link href="/odds" className="inline-block bg-blue-500 text-white px-4 py-2 rounded">
            View Odds
          </Link>
          <Link href="/admin/database" className="inline-block bg-blue-500 text-white px-4 py-2 rounded">
            User Database
          </Link>
        </div>
        <AdminMatchList />
      </div>
    </div>
  )
}

