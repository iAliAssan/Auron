'use client'

import { createClient } from '@supabase/supabase-js'
import { useEffect, useState } from 'react'

export default function TestSupabase() {
  const [status, setStatus] = useState('در حال اتصال...')

  useEffect(() => {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL
    const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY

    if (!url || !key) {
      setStatus('❌ متغیرهای محیطی تنظیم نشده‌اند')
      return
    }

    const supabase = createClient(url, key)
    supabase.from('users').select('count', { count: 'exact', head: true })
      .then(({ error }) => {
        if (error) setStatus('❌ خطا: ' + error.message)
        else setStatus('✅ اتصال به Supabase برقرار است')
      })
      .catch(err => setStatus('❌ خطا: ' + err.message))
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="bg-gray-900 p-8 rounded-2xl text-white text-center">
        <h1 className="text-2xl font-bold mb-4">تست اتصال Supabase</h1>
        <p>{status}</p>
      </div>
    </div>
  )
}
