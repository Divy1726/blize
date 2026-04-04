import { z } from 'zod';

// Contact Form Schema
export const contactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100, 'Name is too long'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Please enter a valid phone number').optional().or(z.literal('')),
  company: z.string().min(2, 'Company name must be at least 2 characters').optional().or(z.literal('')),
  service: z.string().min(1, 'Please select a service'),
  message: z.string().min(10, 'Message must be at least 10 characters').max(1000, 'Message is too long'),
});

export type ContactFormSchema = z.infer<typeof contactFormSchema>;

// Proposal Form Schema
export const proposalFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100, 'Name is too long'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Please enter a valid phone number').optional().or(z.literal('')),
  company: z.string().min(2, 'Company name must be at least 2 characters'),
  teamSize: z.string().min(1, 'Please select your team size'),
  country: z.string().min(1, 'Please select your country'),
  service: z.string().min(1, 'Please select a service'),
  message: z.string().min(10, 'Message must be at least 10 characters').max(1000, 'Message is too long'),
});

export type ProposalFormSchema = z.infer<typeof proposalFormSchema>;

// Career Form Schema
export const careerFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100, 'Name is too long'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Please enter a valid phone number').optional().or(z.literal('')),
  position: z.string().min(1, 'Please select a position'),
  message: z.string().min(10, 'Cover letter must be at least 10 characters').max(2000, 'Cover letter is too long'),
  resume: z.any().optional(),
});

export type CareerFormSchema = z.infer<typeof careerFormSchema>;

// Admin Login Schema
export const adminLoginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export type AdminLoginSchema = z.infer<typeof adminLoginSchema>;

// Lead Filter Schema
export const leadFilterSchema = z.object({
  search: z.string().optional(),
  service: z.string().optional(),
  source: z.string().optional(),
  status: z.enum(['new', 'reviewed', 'contacted', 'closed']).optional(),
  dateFrom: z.string().optional(),
  dateTo: z.string().optional(),
});

export type LeadFilterSchema = z.infer<typeof leadFilterSchema>;

// Helper function to format phone numbers
export function formatPhoneNumber(phone: string): string {
  // Remove all non-numeric characters
  const cleaned = phone.replace(/\D/g, '');
  
  // Format based on length
  if (cleaned.length === 10) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
  } else if (cleaned.length === 11 && cleaned[0] === '1') {
    return `+1 (${cleaned.slice(1, 4)}) ${cleaned.slice(4, 7)}-${cleaned.slice(7)}`;
  }
  
  return phone;
}

// Helper function to validate file type
export function validateResumeFile(file: File): { valid: boolean; error?: string } {
  const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
  const maxSize = 5 * 1024 * 1024; // 5MB

  if (!allowedTypes.includes(file.type)) {
    return { valid: false, error: 'Please upload a PDF or Word document' };
  }

  if (file.size > maxSize) {
    return { valid: false, error: 'File size must be less than 5MB' };
  }

  return { valid: true };
}
