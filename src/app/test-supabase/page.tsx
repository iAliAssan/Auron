import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'

export default async function TestSupabasePage() {
  const cookieStore = await cookies()
  const supabase = createClient(cookieStore)

  // تلاش برای اتصال و خواندن یک جدول ساده
  const { data, error } = await supabase.from('users').select('count', { count: 'exact', head: true })

  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-white p-8">
      <div className="neumorphic-card p-8 max-w-md w-full text-center">
        <h1 className="text-2xl font-bold mb-4">اتصال به Supabase</h1>
        {error ? (
          <div className="text-red-400">
            <p>❌ خطا در اتصال</p>
            <p className="text-sm mt-2">{error.message}</p>
          </div>
        ) : (
          <div className="text-green-400">
            <p>✅ اتصال برقرار است</p>
            <p className="text-sm text-text-secondary mt-4">جدول 'users' آماده است</p>
          </div>
        )}
      </div>
    </div>
  )
}
