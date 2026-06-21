export interface ProductFeature {
  title: string;
  description: string;
  icon: string;
}

export interface ProductWhy {
  title: string;
  items: string[];
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
  why: ProductWhy;
  summary: {
    title: string;
    description: string;
  };
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
}
