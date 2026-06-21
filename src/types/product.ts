export interface ProductFeature {
  title: string;
  description: string;
  icon: string;
}

export interface ProductApplication {
  title: string;
  description: string;
  icon: string;
}

export interface ProductFAQ {
  question: string;
  answer: string;
}

export interface ProductDashboard {
  title: string;
  description: string;
  image: string;
  alt: string;
}

export interface ProductCTA {
  text: string;
  href: string;
  variant?: 'primary' | 'secondary' | 'outline';
}

export interface ProductConfig {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  heroCTA: ProductCTA[];
  intro: {
    title: string;
    description: string;
  };
  features: ProductFeature[];
  applications: {
    title: string;
    items: ProductApplication[];
  };
  dashboard: ProductDashboard;
  summary: {
    title: string;
    description: string;
  };
  faq: ProductFAQ[];
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
}
