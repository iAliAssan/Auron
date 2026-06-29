export const content = {
  hero: {
    badge: 'AURON',
    title: 'سیستم‌های هوشمند برای دنیای متصل',
    subtitle:
      'طراحی و توسعه سیستم‌های داده‌محور برای پایش، تحلیل و هوشمندسازی فرآیندهای واقعی',
    ctaPrimary: 'مشاهده محصولات',
    ctaSecondary: 'آشنایی بیشتر',
  },

  philosophy: {
    title: 'فلسفه ما',
    description:
      'ما سیستم‌هایی می‌سازیم که داده را از سطح مشاهده به سطح تصمیم و اقدام می‌رسانند.',
    items: [
      {
        id: 'monitoring',
        title: 'پایش',
        description:
          'جمع‌آوری داده‌های لحظه‌ای از سنسورها و تجهیزات متصل برای درک وضعیت واقعی سیستم.',
      },
      {
        id: 'analysis',
        title: 'تحلیل',
        description:
          'پردازش داده‌های خام و تبدیل آن‌ها به بینش‌های قابل تصمیم‌گیری.',
      },
      {
        id: 'control',
        title: 'کنترل',
        description:
          'مدیریت و کنترل تجهیزات از راه دور با دقت و پایداری بالا.',
      },
      {
        id: 'intelligence',
        title: 'هوشمندسازی',
        description:
          'ایجاد سیستم‌های خودکار مبتنی بر داده، تحلیل و یادگیری رفتار سیستم.',
      },
    ],
  },

  brandStatement: {
    text: 'فناوری زمانی ارزشمند است که نامرئی باشد.',
    context:
      'هدف ما ساخت سیستم‌هایی است که بدون پیچیدگی برای کاربر، بیشترین کارایی را ارائه دهند.',
  },

  products: {
    keshtyar: {
      id: 'keshtyar',
      name: 'کشتیار',
      nameEn: 'Keshtyar',
      category: 'Smart Agriculture System',
      description:
        'سامانه هوشمند مدیریت مزرعه با قابلیت پایش، تحلیل و کنترل تجهیزات کشاورزی.',
      features: [
        'پایش لحظه‌ای داده‌ها',
        'مدیریت تجهیزات',
        'تحلیل عملکرد مزرعه',
        'تاریخچه داده‌ها',
      ],
      cta: 'مشاهده محصول',
      link: 'https://keshtyar.auron.ir',
    },
  },

  closing: {
    title: 'داده را ببین',
    subtitle: 'تصمیم را خودکار کن',
    cta: 'شروع کنید',
  },

  footer: {
    copyright: '© ۱۴۰۵ Auron',
    poweredBy: 'Designed & Developed by Auron Team',
  },
} as const
