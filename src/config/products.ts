export interface Product {
  id: string
  name: string
  nameEn: string
  description: string
  icon?: string
  link: string
  cta: string
}

export const products: Product[] = [
  {
    id: 'keshtyar',
    name: 'کشت‌یار',
    nameEn: '',  // ← خالی شد (انگلیسی حذف شد)
    description: `مدیریت مزرعه، با دیدی کامل‌تر

از مشاهده داده‌های لحظه‌ای تا بررسی تاریخچه و مدیریت تجهیزات، کشت‌یار کمک می‌کند همیشه تصویری روشن از وضعیت مزرعه خود داشته باشید و تصمیم‌های آگاهانه‌تری بگیرید.`,
    link: 'https://keshtyar.auron.ir',
    cta: 'اطلاعات بیشتر',
  },
]
