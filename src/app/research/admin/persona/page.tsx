'use client';

import { useState, useEffect } from 'react';
import { Container } from '@/components/Container';
import { createClient } from '@/lib/supabase';
import Link from 'next/link';

export default function AdminPersonaPage() {
  const [password, setPassword] = useState('');
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [responses, setResponses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  const ADMIN_PASSWORD = '12345678';

  useEffect(() => {
    if (isAuthorized) {
      fetchResponses();
    }
  }, [isAuthorized]);

  const fetchResponses = async () => {
    const { data, error } = await supabase
      .from('persona_responses')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      setResponses(data);
    }
    setLoading(false);
  };

  if (!isAuthorized) {
    return (
      <main className="min-h-screen bg-background pt-32 pb-16 flex items-center justify-center">
        <Container>
          <div className="max-w-md mx-auto bg-surface border border-border rounded-2xl p-8 shadow-[8px_8px_16px_rgba(0,0,0,0.3)]">
            <h2 className="text-2xl font-bold text-text-primary text-center mb-6">🔒 ورود به صفحه مدیریت</h2>
            <input
              type="password"
              placeholder="رمز عبور را وارد کنید"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-background border border-border text-text-primary focus:outline-none focus:border-primary transition-all mb-4"
              onKeyDown={(e) => e.key === 'Enter' && setIsAuthorized(password === ADMIN_PASSWORD)}
            />
            <button
              onClick={() => setIsAuthorized(password === ADMIN_PASSWORD)}
              className="w-full px-6 py-3 rounded-xl bg-primary text-background font-medium hover:bg-primary/90 transition-all"
            >
              ورود
            </button>
            {password && password !== ADMIN_PASSWORD && (
              <p className="text-red-400 text-sm text-center mt-3">رمز عبور اشتباه است</p>
            )}
            <div className="text-center mt-4">
              <Link
                href="/research"
                className="text-sm text-text-tertiary hover:text-primary transition-colors"
              >
                ← بازگشت به تحقیق و توسعه
              </Link>
            </div>
          </div>
        </Container>
      </main>
    );
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-background pt-32 pb-16">
        <Container>
          <div className="text-center text-text-secondary">در حال بارگذاری...</div>
        </Container>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background pt-32 pb-16">
      <Container>
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-text-primary">📋 پاسخ‌های پرسشنامه</h1>
          <div className="flex items-center gap-4">
            <span className="text-text-tertiary text-sm">تعداد: {responses.length}</span>
            <Link
              href="/research"
              className="text-sm text-text-tertiary hover:text-primary transition-colors"
            >
              ← بازگشت
            </Link>
          </div>
        </div>

        <div className="space-y-6">
          {responses.map((resp) => (
            <div key={resp.id} className="bg-surface border border-border rounded-2xl p-6 shadow-[8px_8px_16px_rgba(0,0,0,0.3),-4px_-4px_8px_rgba(255,255,255,0.02)]">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold text-text-primary">{resp.user_name}</h3>
                  <p className="text-text-tertiary text-sm">
                    {resp.age} · {resp.job} · {resp.activity}
                  </p>
                </div>
                <span className="text-xs text-text-tertiary">
                  {new Date(resp.created_at).toLocaleDateString('fa-IR')}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-text-tertiary">مالک مزرعه: </span>
                  <span className="text-text-primary">{resp.ownership}</span>
                </div>
                <div>
                  <span className="text-text-tertiary">وسعت: </span>
                  <span className="text-text-primary">{resp.land_size}</span>
                </div>
                <div>
                  <span className="text-text-tertiary">روش پایش: </span>
                  <span className="text-text-primary">{resp.monitoring_methods?.join('، ')}</span>
                </div>
                <div>
                  <span className="text-text-tertiary">استفاده از سنسور: </span>
                  <span className="text-text-primary">{resp.used_smart}</span>
                </div>
                <div>
                  <span className="text-text-tertiary">کنترل از راه دور: </span>
                  <span className="text-text-primary">{resp.remote_control}/5</span>
                </div>
                <div>
                  <span className="text-text-tertiary">داده‌های لحظه‌ای: </span>
                  <span className="text-text-primary">{resp.realtime_data}/5</span>
                </div>
                <div>
                  <span className="text-text-tertiary">احتمال استفاده: </span>
                  <span className="text-text-primary">{resp.adoption_likelihood}/5</span>
                </div>
                <div>
                  <span className="text-text-tertiary">عامل مهم: </span>
                  <span className="text-text-primary">{resp.important_factor}</span>
                </div>
                <div className="md:col-span-2">
                  <span className="text-text-tertiary">مشکل اصلی: </span>
                  <span className="text-text-primary">{resp.main_problem}</span>
                </div>
                <div className="md:col-span-2">
                  <span className="text-text-tertiary">قابلیت پیشنهادی: </span>
                  <span className="text-text-primary">{resp.extra_feature}</span>
                </div>
              </div>

              {resp.persona_result && (
                <div className="mt-4 p-4 bg-primary/5 border border-primary/20 rounded-xl">
                  <p className="text-sm text-text-secondary">
                    <span className="font-medium text-text-primary">سطح فناوری:</span> {resp.persona_result.techLevel} · 
                    <span className="font-medium text-text-primary mr-2">پذیرش:</span> {resp.persona_result.techAdoption}
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2 text-xs">
                    <div>
                      <span className="text-text-tertiary">اهداف: </span>
                      <span className="text-text-primary">{resp.persona_result.goals?.join('، ')}</span>
                    </div>
                    <div>
                      <span className="text-text-tertiary">چالش‌ها: </span>
                      <span className="text-text-primary">{resp.persona_result.challenges?.join('، ')}</span>
                    </div>
                    <div>
                      <span className="text-text-tertiary">نیازها: </span>
                      <span className="text-text-primary">{resp.persona_result.needs?.join('، ')}</span>
                    </div>
                    <div>
                      <span className="text-text-tertiary">انگیزه‌ها: </span>
                      <span className="text-text-primary">{resp.persona_result.motivations?.join('، ')}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </Container>
    </main>
  );
}
