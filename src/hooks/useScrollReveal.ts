import { useEffect } from 'react';

export function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            // برای انیمیشن‌های تکراری، این خط را فعال کن:
            // observer.unobserve(entry.target);
          }
        });
      },
      { 
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px' // کمی زودتر فعال شود
      }
    );

    // تمام المان‌های دارای کلاس reveal و reveal-* را پیدا کن
    const elements = document.querySelectorAll('.reveal, [class*="reveal-"]');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);
}
