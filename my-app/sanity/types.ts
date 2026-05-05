export interface Product {
  id: string;
  name: string;
  slug: string;
  category: string;
  description: string;
  image: string;
  tags: string[];
  modelCode?: string;
}

export interface NewsBlockChild {
  _key: string;
  text?: string;
}

export interface NewsBlock {
  _key: string;
  _type: string;
  style?: string;
  listItem?: string;
  children?: NewsBlockChild[];
}

export interface NewsItem {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  category: string;
  slug: string;
  body?: NewsBlock[];
}
