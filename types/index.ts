// Lead Types
export interface Lead {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  service?: string;
  source?: string;
  message?: string;
  team_size?: string;
  country?: string;
  position?: string;
  type: 'contact' | 'proposal' | 'career';
  status: 'new' | 'reviewed' | 'contacted' | 'closed';
  created_at: string;
  updated_at?: string;
}

export interface CreateLeadInput {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  service?: string;
  source?: string;
  message?: string;
  team_size?: string;
  country?: string;
  position?: string;
  type: 'contact' | 'proposal' | 'career';
}

// Service Types
export interface Service {
  id: string;
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  shortDescription: string;
  icon: string;
  features: string[];
  deliverables: string[];
  problems: string[];
  whyOutsource: string[];
  process: {
    title: string;
    description: string;
  }[];
  relatedServices: string[];
}

// Case Study Types
export interface CaseStudy {
  id: string;
  slug: string;
  title: string;
  client: string;
  industry: string;
  challenge: string;
  solution: string;
  results: string[];
  image?: string;
}

// Career Types
export interface JobPosition {
  id: string;
  title: string;
  department: string;
  location: string;
  type: 'full-time' | 'part-time' | 'contract';
  description: string;
  requirements: string[];
  responsibilities: string[];
  benefits: string[];
  postedAt: string;
}

// Navigation Types
export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

// FAQ Types
export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}

// Stats Types
export interface Stat {
  label: string;
  value: string;
  suffix?: string;
  description: string;
}

// Testimonial Types
export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  avatar?: string;
  rating: number;
}

// Form Types
export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  service: string;
  message: string;
}

export interface ProposalFormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  teamSize: string;
  country: string;
  service: string;
  message: string;
}

export interface CareerFormData {
  name: string;
  email: string;
  phone: string;
  position: string;
  message: string;
  resume?: FileList;
}

// Admin Types
export interface AdminUser {
  id: string;
  email: string;
  role: 'admin' | 'super_admin';
  created_at: string;
}
