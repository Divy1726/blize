// Company Information
export const COMPANY = {
  name: 'Blize Global',
  tagline: 'Premium Outsourced Accounting & Finance Support',
  description: 'We provide world-class outsourced accounting, bookkeeping, and financial services to CPA firms, tax practices, and financial businesses.',
  founded: 2018,
  location: 'India',
  email: 'hello@blizeglobal.com',
  phone: '+91 98765 43210',
  website: 'https://blizeglobal.com',
  social: {
    linkedin: 'https://linkedin.com/company/blizeglobal',
    twitter: 'https://twitter.com/blizeglobal',
  },
} as const;

// Navigation
export const NAVIGATION = {
  public: [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    {
      label: 'Services',
      href: '/services',
      children: [
        { label: 'Accounting & Reporting', href: '/services/accounting-reporting' },
        { label: 'Advisory & Consulting', href: '/services/advisory-consulting' },
        { label: 'Bookkeeping', href: '/services/bookkeeping' },
        { label: 'Business & Income Tax', href: '/services/business-tax' },
        { label: 'Ledger Review', href: '/services/ledger-review' },
        { label: 'Outsourced CFO', href: '/services/outsourced-cfo' },
        { label: 'Payroll', href: '/services/payroll' },
        { label: 'Sales & Use Tax', href: '/services/sales-tax' },
      ],
    },
    { label: 'Case Studies', href: '/case-studies' },
    { label: 'Careers', href: '/careers' },
    { label: 'FAQ', href: '/faq' },
    { label: 'Contact', href: '/contact' },
  ],
  admin: [
    { label: 'Dashboard', href: '/admin/dashboard', icon: 'LayoutDashboard' },
    { label: 'Leads', href: '/admin/leads', icon: 'Users' },
  ],
} as const;

// Services List
export const SERVICES = [
  {
    slug: 'accounting-reporting',
    title: 'Accounting & Financial Reporting',
    shortTitle: 'Accounting & Reporting',
    description: 'Comprehensive accounting services and financial reporting that gives you real-time visibility into your business performance.',
    shortDescription: 'Full-cycle accounting with real-time financial insights.',
    icon: 'Calculator',
    features: [
      'Monthly & quarterly financial statements',
      'Management reporting & KPIs',
      'Cash flow analysis & forecasting',
      'General ledger maintenance',
      'Account reconciliations',
      'Financial analysis & insights',
    ],
  },
  {
    slug: 'advisory-consulting',
    title: 'Advisory & Consulting Services',
    shortTitle: 'Advisory & Consulting',
    description: 'Strategic financial advisory to help you make informed business decisions and drive growth.',
    shortDescription: 'Strategic financial guidance for business growth.',
    icon: 'TrendingUp',
    features: [
      'Financial strategy development',
      'Business performance analysis',
      'Growth planning & forecasting',
      'M&A support & due diligence',
      'Risk assessment & management',
      'Board & investor reporting',
    ],
  },
  {
    slug: 'bookkeeping',
    title: 'Bookkeeping Services',
    shortTitle: 'Bookkeeping',
    description: 'Accurate, timely bookkeeping that keeps your financial records organized and compliant.',
    shortDescription: 'Accurate, timely bookkeeping for organized records.',
    icon: 'BookOpen',
    features: [
      'Daily transaction recording',
      'Bank & credit card reconciliations',
      'Accounts payable & receivable',
      'Expense categorization',
      'Vendor & client management',
      'Monthly close procedures',
    ],
  },
  {
    slug: 'business-tax',
    title: 'Business & Income Tax',
    shortTitle: 'Business & Income Tax',
    description: 'Expert tax preparation and planning services to minimize liability and ensure compliance.',
    shortDescription: 'Expert tax preparation, planning & compliance.',
    icon: 'FileText',
    features: [
      'Business tax return preparation',
      'Individual income tax returns',
      'Tax planning & strategy',
      'Estimated tax calculations',
      'IRS correspondence handling',
      'Multi-state tax compliance',
    ],
  },
  {
    slug: 'ledger-review',
    title: 'Ledger Review & Cleanup',
    shortTitle: 'Ledger Review',
    description: 'Thorough review and cleanup of your financial records to ensure accuracy and compliance.',
    shortDescription: 'Thorough review and cleanup of financial records.',
    icon: 'ClipboardCheck',
    features: [
      'Comprehensive ledger analysis',
      'Error identification & correction',
      'Chart of accounts optimization',
      'Historical data cleanup',
      'Reconciliation discrepancy resolution',
      'Compliance verification',
    ],
  },
  {
    slug: 'outsourced-cfo',
    title: 'Outsourced CFO Services',
    shortTitle: 'Outsourced CFO',
    description: 'Executive-level financial leadership without the full-time executive cost.',
    shortDescription: 'Executive financial leadership without the full-time cost.',
    icon: 'Briefcase',
    features: [
      'Financial strategy & planning',
      'Budgeting & forecasting',
      'Cash flow management',
      'Investor relations support',
      'Financial systems optimization',
      'Executive reporting & dashboards',
    ],
  },
  {
    slug: 'payroll',
    title: 'Payroll Services',
    shortTitle: 'Payroll',
    description: 'Reliable, accurate payroll processing that keeps your team paid and compliant.',
    shortDescription: 'Reliable payroll processing & compliance.',
    icon: 'CreditCard',
    features: [
      'Payroll processing & direct deposit',
      'Tax filing & remittance',
      'W-2 & 1099 preparation',
      'Benefits administration',
      'PTO & time-off tracking',
      'Payroll reporting & analytics',
    ],
  },
  {
    slug: 'sales-tax',
    title: 'Sales & Use Tax',
    shortTitle: 'Sales & Use Tax',
    description: 'Complete sales tax compliance services to keep your business in good standing.',
    shortDescription: 'Complete sales tax compliance & filing.',
    icon: 'Receipt',
    features: [
      'Nexus analysis & monitoring',
      'Sales tax registration',
      'Monthly/quarterly filing',
      'Use tax compliance',
      'Exemption certificate management',
      'Audit support & defense',
    ],
  },
] as const;

// Stats for Homepage
export const STATS = [
  { value: 98, suffix: '%', label: 'Client Retention', description: 'Long-term partnerships' },
  { value: 500, suffix: '+', label: 'Projects Delivered', description: 'Successful engagements' },
  { value: 40, suffix: '%', label: 'Average Cost Savings', description: 'Compared to in-house teams' },
  { value: 24, suffix: 'hr', label: 'Average Response Time', description: 'For client inquiries' },
] as const;

// Testimonials
export const TESTIMONIALS = [
  {
    id: '1',
    name: 'Raju Rastogi',
    role: 'Managing Partner',
    company: 'Mitchell & Associates CPA',
    content: 'Blize Global transformed our firm\'s capacity. Their team handles our overflow work with precision, allowing us to take on 40% more clients without adding permanent staff.',
    rating: 5,
  },
  {
    id: '2',
    name: 'Sanjay Gupta',
    role: 'CEO',
    company: 'Northwood Financial Group',
    content: 'The outsourced CFO services have been transformative. We get executive-level insights at a fraction of the cost. Our financial decision-making has never been sharper.',
    rating: 5,
  },
  {
    id: '3',
    name: 'Samay Raina',
    role: 'Founder',
    company: 'Indias got latent',
    content: 'During tax season, Blize Global\'s support is invaluable. They handle our bookkeeping overflow and ensure nothing falls through the cracks. Truly a strategic partner. such a great team to work with.',
    rating: 5,
  },
  {
    id: '4',
    name: 'Nithin Kamath',
    role: 'Founder',
    company: 'Zerodha',
    content: 'Blize Global has been a game-changer for our firm. Their team handles our overflow work with precision, allowing us to take on 40% more clients without adding permanent staff.',
    rating: 5,
  },
] as const;

// Case Studies
export const CASE_STUDIES = [
  {
    slug: 'cpa-firm-scaling',
    title: 'Helping a Regional CPA Firm Scale 3x',
    client: 'Regional CPA Firm',
    industry: 'Accounting Practice',
    challenge: 'A 15-partner CPA firm was turning away new clients due to capacity constraints. Their in-house team was overwhelmed during busy season.',
    solution: 'Implemented a dedicated outsourced accounting team handling 60% of their bookkeeping and reporting work, with seamless integration into their existing workflows.',
    results: [
      'Scaled client base by 180% in 18 months',
      'Reduced seasonal hiring costs by $200K annually',
      'Improved client satisfaction scores from 3.8 to 4.7',
      'Decreased staff overtime by 65%',
    ],
  },
  {
    slug: 'tax-practice-efficiency',
    title: 'Streamlining Operations for a Tax Practice',
    client: 'Tax Solutions LLC',
    industry: 'Tax Services',
    challenge: 'Growing tax practice struggled with year-round bookkeeping support and inconsistent client financial data quality.',
    solution: 'Provided year-round bookkeeping services with monthly ledger reviews and cleanup, plus tax season overflow support.',
    results: [
      'Eliminated 90% of year-end cleanup work',
      'Reduced tax preparation time by 35%',
      'Increased revenue per client by 25%',
      'Achieved 99.2% accuracy in financials',
    ],
  },
  {
    slug: 'startup-cfo-support',
    title: 'CFO Services for Tech Startup',
    client: 'SaaS Startup',
    industry: 'Technology',
    challenge: 'Fast-growing SaaS company needed financial leadership but couldn\'t afford a full-time CFO during their growth phase.',
    solution: 'Provided fractional CFO services including investor reporting, budgeting, financial modeling, and strategic planning.',
    results: [
      'Closed $5M Series A funding round',
      'Reduced burn rate by 30% through optimization',
      'Established scalable financial processes',
      'Built investor-ready reporting framework',
    ],
  },
] as const;

// FAQ
export const FAQS = [
  {
    id: '1',
    category: 'Services',
    question: 'What services does Blize Global provide?',
    answer: 'We offer comprehensive outsourced accounting and finance services including bookkeeping, accounting & financial reporting, tax preparation, payroll, sales tax compliance, ledger review & cleanup, outsourced CFO services, and advisory consulting. Each service can be customized to your specific needs.',
  },
  {
    id: '2',
    category: 'Process',
    question: 'How does the onboarding process work?',
    answer: 'Our onboarding process is designed to be smooth and efficient. We start with a discovery call to understand your needs, followed by a comprehensive assessment of your current financial processes. We then create a customized transition plan, set up secure access to your systems, and gradually take over responsibilities while maintaining quality and communication throughout.',
  },
  {
    id: '3',
    category: 'Security',
    question: 'How do you ensure data security and confidentiality?',
    answer: 'Data security is our top priority. We use bank-level encryption, secure VPN connections, and multi-factor authentication. Our team follows strict confidentiality protocols, and all staff sign comprehensive NDAs. We\'re SOC 2 compliant and follow industry best practices for data protection.',
  },
  {
    id: '4',
    category: 'Pricing',
    question: 'How is pricing structured?',
    answer: 'We offer flexible pricing models based on your needs: monthly retainer packages for ongoing services, project-based pricing for one-time work, and hourly rates for advisory services. During our initial consultation, we\'ll assess your requirements and provide a transparent, customized quote with no hidden fees.',
  },
  {
    id: '5',
    category: 'Technology',
    question: 'What accounting software do you work with?',
    answer: 'Our team is proficient in all major accounting platforms including QuickBooks (Online and Desktop), Xero, Sage, FreshBooks, Zoho Books, and Wave. We can work within your existing tech stack or recommend the best solutions for your specific needs.',
  },
  {
    id: '6',
    category: 'Services',
    question: 'Can you work with my existing team?',
    answer: 'Absolutely. Many of our clients maintain in-house accounting staff while using our services for overflow, specialized work, or coverage during absences. We integrate seamlessly with your team, using your preferred communication tools and workflows.',
  },
  {
    id: '7',
    category: 'Process',
    question: 'What is your typical turnaround time?',
    answer: 'Turnaround times vary by service type. Bookkeeping is typically completed within 2-3 business days of month-end. Financial reports are delivered within 5-7 business days. Tax returns are prioritized based on deadlines. We\'ll establish clear SLAs during onboarding that meet your specific timeline requirements.',
  },
  {
    id: '8',
    category: 'General',
    question: 'Do you work with firms outside the United States?',
    answer: 'Yes, we work with clients globally. While we specialize in US accounting standards and tax compliance, we have experience with international financial reporting and multi-currency accounting. Our team can accommodate different time zones and provide support tailored to your regional requirements.',
  },
] as const;

// Job Positions
export const JOB_POSITIONS = [
  {
    id: '1',
    title: 'Senior Accountant',
    department: 'Client Services',
    location: 'Remote (US)',
    type: 'full-time' as const,
    description: 'We\'re seeking an experienced Senior Accountant to join our growing team and deliver exceptional outsourced accounting services to our clients.',
    requirements: [
      'CPA license or equivalent certification',
      '5+ years of accounting experience',
      'Strong knowledge of GAAP',
      'Experience with QuickBooks, Xero, or similar',
      'Excellent communication skills',
    ],
    responsibilities: [
      'Manage client bookkeeping and accounting workflows',
      'Prepare monthly financial statements',
      'Perform account reconciliations',
      'Communicate directly with client stakeholders',
      'Identify process improvements',
    ],
    benefits: [
      'Competitive salary + performance bonuses',
      '100% remote work',
      'Health, dental, and vision insurance',
      'Flexible PTO policy',
      'Professional development budget',
      'Home office stipend',
    ],
    postedAt: '2024-03-15',
  },
  {
    id: '2',
    title: 'Tax Specialist',
    department: 'Tax Services',
    location: 'Remote (US)',
    type: 'full-time' as const,
    description: 'Join our tax team to help businesses and individuals navigate complex tax compliance and planning needs.',
    requirements: [
      'EA or CPA credential preferred',
      '3+ years of tax preparation experience',
      'Knowledge of individual and business taxation',
      'Proficiency with tax software (Lacerte, ProConnect, etc.)',
      'Strong attention to detail',
    ],
    responsibilities: [
      'Prepare individual and business tax returns',
      'Handle IRS and state correspondence',
      'Provide tax planning recommendations',
      'Research complex tax issues',
      'Maintain client tax documentation',
    ],
    benefits: [
      'Competitive salary + seasonal bonuses',
      '100% remote work',
      'Health, dental, and vision insurance',
      'Flexible schedule during off-season',
      'CPE and certification reimbursement',
      'Technology allowance',
    ],
    postedAt: '2024-03-10',
  },
  {
    id: '3',
    title: 'Client Success Manager',
    department: 'Operations',
    location: 'Remote (US)',
    type: 'full-time' as const,
    description: 'Lead client relationships and ensure exceptional service delivery as the primary point of contact for our accounting partners.',
    requirements: [
      'Bachelor\'s degree in Business or related field',
      '4+ years in account management or client success',
      'Background in professional services preferred',
      'Strong project management skills',
      'Excellent interpersonal abilities',
    ],
    responsibilities: [
      'Manage portfolio of client accounts',
      'Coordinate service delivery across teams',
      'Conduct regular business reviews',
      'Identify upsell and expansion opportunities',
      'Resolve escalated client issues',
    ],
    benefits: [
      'Competitive salary + commission',
      '100% remote work',
      'Comprehensive benefits package',
      'Flexible PTO',
      'Career advancement opportunities',
      'Annual team retreats',
    ],
    postedAt: '2024-03-08',
  },
] as const;

// Services for forms
export const SERVICE_OPTIONS = [
  { value: '', label: 'Select a service' },
  { value: 'accounting-reporting', label: 'Accounting & Financial Reporting' },
  { value: 'advisory-consulting', label: 'Advisory & Consulting' },
  { value: 'bookkeeping', label: 'Bookkeeping' },
  { value: 'business-tax', label: 'Business & Income Tax' },
  { value: 'ledger-review', label: 'Ledger Review & Cleanup' },
  { value: 'outsourced-cfo', label: 'Outsourced CFO' },
  { value: 'payroll', label: 'Payroll Services' },
  { value: 'sales-tax', label: 'Sales & Use Tax' },
  { value: 'multiple', label: 'Multiple Services' },
] as const;

// Team sizes
export const TEAM_SIZE_OPTIONS = [
  { value: '', label: 'Select team size' },
  { value: '1-5', label: '1-5 employees' },
  { value: '6-20', label: '6-20 employees' },
  { value: '21-50', label: '21-50 employees' },
  { value: '51-100', label: '51-100 employees' },
  { value: '100+', label: '100+ employees' },
] as const;

// Countries
export const COUNTRY_OPTIONS = [
  { value: '', label: 'Select country' },
  { value: 'us', label: 'United States' },
  { value: 'ca', label: 'Canada' },
  { value: 'uk', label: 'United Kingdom' },
  { value: 'au', label: 'Australia' },
  { value: 'other', label: 'Other' },
] as const;

// Software logos for trusted tools section
export const SOFTWARE_LOGOS = [
  { name: 'QuickBooks', icon: 'Calculator' },
  { name: 'Xero', icon: 'FileSpreadsheet' },
  { name: 'Sage', icon: 'BookOpen' },
  { name: 'FreshBooks', icon: 'Leaf' },
  { name: 'Zoho Books', icon: 'Building2' },
  { name: 'Wave', icon: 'Waves' },
] as const;
