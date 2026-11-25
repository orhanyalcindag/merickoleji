export interface Branch {
  id: string;
  name: string;
  type: 'merkez' | 'kampus' | 'kurs';
  city: string;
  address: string;
  phone: string;
  email: string;
  map_url: string;
  features: string;
  order_num: number;
}

export interface Staff {
  id: number;
  branch_id: string;
  name: string;
  title: string;
  hierarchy_level: number; // 1: Üst Yönetim/Kurucu/Müdür, 2: İdari/Rehberlik, 3: Branş Zümre & Öğretmenler
  parent_id?: number | null;
  subject: string;
  photo: string;
  gender?: 'erkek' | 'kadin';
  bio: string;
  education: string;
  experience_years: number;
  order_num: number;
}

export interface NewsItem {
  id: number;
  title: string;
  slug: string;
  type: 'duyuru' | 'haber' | 'etkinlik' | 'basari';
  branch_id: string; // 'all' or branch_id
  image: string;
  summary: string;
  content: string;
  date: string;
  is_featured: number; // 1 or 0
  is_published: number; // 1 or 0
}

export interface Application {
  id: number;
  parent_name: string;
  phone: string;
  email: string;
  student_name: string;
  grade_level: string;
  branch_id: string;
  notes: string;
  status: 'bekliyor' | 'arandi' | 'kayit-tamamlandi' | 'iptal';
  created_at: string;
}

export interface SettingItem {
  key: string;
  value: string;
}
