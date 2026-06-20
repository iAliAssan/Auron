'use client';

import { useState, useEffect } from 'react';
import { Container } from '@/components/Container';
import { createClient } from '@/lib/supabase';

export default function AdminPersonaPage() {
  const [responses, setResponses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    fetchResponses();
  }, []);

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

  if (loading) {
    return (
      <main className="min-h-screen bg-background pt-24 pb-16">
        <Container>
          <div className="text-center text-text-secondary">در حال بارگذاری...</div>
        </Container>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background pt-24 pb-16">
      <Container>
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-text-primary">📋 پاسخ‌های پرسشنامه</h1>
          <span className="text-text-tertiary text-sm">تعداد: {responses.length}</span>
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

              {/* Persona Result */}
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
