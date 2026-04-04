'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  Calculator,
  TrendingUp,
  BookOpen,
  FileText,
  ClipboardCheck,
  Briefcase,
  CreditCard,
  Receipt,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { AnimatedSection, StaggerContainer, StaggerItem } from '@/components/shared/AnimatedSection';
import { SERVICES } from '@/lib/constants';
import { notFound } from 'next/navigation';

const iconMap: Record<string, React.ElementType> = {
  Calculator,
  TrendingUp,
  BookOpen,
  FileText,
  ClipboardCheck,
  Briefcase,
  CreditCard,
  Receipt,
};

function ServiceIcon({ icon }: { icon: string }) {
  const IconComponent = iconMap[icon] || Calculator;
  return <IconComponent className="h-8 w-8" />;
}

// Extended service data with more details
const serviceDetails: Record<string, {
  problems: string[];
  deliverables: string[];
  whyOutsource: string[];
  process: { title: string; description: string; }[];
}> = {
  'accounting-reporting': {
    problems: [
      'Month-end close taking too long',
      'Inconsistent financial reporting',
      'Lack of real-time financial visibility',
      'Difficulty preparing for audits',
      'Complex multi-entity consolidations',
    ],
    deliverables: [
      'Monthly/Quarterly Financial Statements',
      'Management Reports & KPI Dashboards',
      'Cash Flow Analysis & Forecasting',
      'General Ledger Maintenance',
      'Bank & Credit Card Reconciliations',
      'Audit-Ready Financial Packages',
    ],
    whyOutsource: [
      'Access to senior-level expertise without full-time costs',
      'Faster month-end close processes',
      'Scalable support during busy periods',
      'Fresh perspective on financial operations',
      'Reduced overhead and training costs',
    ],
    process: [
      { title: 'Assessment', description: 'We review your current accounting processes and identify improvement opportunities.' },
      { title: 'System Setup', description: 'Configure reporting templates and establish data flows for seamless integration.' },
      { title: 'Execution', description: 'Our team handles monthly closes, reconciliations, and report preparation.' },
      { title: 'Review', description: 'Regular business reviews to discuss findings and optimize processes.' },
    ],
  },
  'advisory-consulting': {
    problems: [
      'Unclear financial strategy',
      'Difficulty interpreting financial data',
      'Cash flow management challenges',
      'Need for growth planning support',
      'Preparing for investment or sale',
    ],
    deliverables: [
      'Strategic Financial Planning',
      'Business Performance Analysis',
      'Growth & Expansion Planning',
      'M&A Due Diligence Support',
      'Risk Assessment Reports',
      'Board & Investor Presentations',
    ],
    whyOutsource: [
      'Executive-level insights at a fraction of CFO costs',
      'Objective, external perspective on your business',
      'Access to cross-industry best practices',
      'Flexible engagement based on needs',
      'No long-term employment commitments',
    ],
    process: [
      { title: 'Discovery', description: 'Deep dive into your business goals, challenges, and financial landscape.' },
      { title: 'Analysis', description: 'Comprehensive review of financials, operations, and market position.' },
      { title: 'Strategy', description: 'Development of actionable recommendations and strategic plans.' },
      { title: 'Implementation', description: 'Ongoing support to execute strategies and track progress.' },
    ],
  },
  'bookkeeping': {
    problems: [
      'Falling behind on transaction recording',
      'Inconsistent account reconciliations',
      'Disorganized financial records',
      'Difficulty tracking expenses',
      'Spending too much time on data entry',
    ],
    deliverables: [
      'Daily Transaction Recording',
      'Bank & Credit Card Reconciliations',
      'Accounts Payable Management',
      'Accounts Receivable Tracking',
      'Expense Categorization',
      'Monthly Financial Summaries',
    ],
    whyOutsource: [
      'Free up time for higher-value client work',
      'Consistent, accurate record-keeping',
      'Cost savings vs. in-house staff',
      'No training or management overhead',
      'Easily scale during busy seasons',
    ],
    process: [
      { title: 'Setup', description: 'Connect to your systems and establish secure data access protocols.' },
      { title: 'Catch-Up', description: 'If needed, we bring your books current with accurate historical data.' },
      { title: 'Ongoing', description: 'Regular transaction recording, reconciliations, and maintenance.' },
      { title: 'Reporting', description: 'Clear, timely financial summaries delivered on your schedule.' },
    ],
  },
  'business-tax': {
    problems: [
      'Complex multi-state tax requirements',
      'Overwhelming during busy season',
      'Keeping up with tax law changes',
      'Planning for tax minimization',
      'Handling IRS correspondence',
    ],
    deliverables: [
      'Business Tax Return Preparation',
      'Individual Income Tax Returns',
      'Tax Planning & Strategy',
      'Estimated Tax Calculations',
      'IRS Correspondence Handling',
      'Multi-State Tax Compliance',
    ],
    whyOutsource: [
      'Access to specialized tax expertise',
      'Scalable capacity during peak season',
      'Reduced stress for your in-house team',
      'Consistent quality across all returns',
      'Faster turnaround times',
    ],
    process: [
      { title: 'Engagement', description: 'Define scope, timeline, and communication preferences.' },
      { title: 'Document Collection', description: 'Secure gathering of all necessary tax documents.' },
      { title: 'Preparation', description: 'Expert preparation with thorough quality review.' },
      { title: 'Delivery', description: 'Final review meeting and electronic filing.' },
    ],
  },
  'ledger-review': {
    problems: [
      'Suspicious account balances',
      'Inconsistent financial reports',
      'Audit findings or discrepancies',
      'Inherited messy books',
      'Chart of accounts confusion',
    ],
    deliverables: [
      'Comprehensive Ledger Analysis',
      'Error Identification & Correction',
      'Chart of Accounts Optimization',
      'Historical Data Cleanup',
      'Reconciliation Resolution',
      'Compliance Verification',
    ],
    whyOutsource: [
      'Fresh eyes catch issues you might miss',
      'Objective assessment without internal bias',
      'Expert knowledge of best practices',
      'Efficient cleanup of complex issues',
      'Confidence in your financial data',
    ],
    process: [
      { title: 'Evaluation', description: 'Thorough review of your ledger to identify issues.' },
      { title: 'Planning', description: 'Detailed cleanup plan with timeline and priorities.' },
      { title: 'Cleanup', description: 'Systematic correction of errors and discrepancies.' },
      { title: 'Verification', description: 'Final review to ensure accuracy and compliance.' },
    ],
  },
  'outsourced-cfo': {
    problems: [
      'Need strategic financial leadership',
      'Preparing for fundraising',
      'Cash flow management challenges',
      'No time for financial planning',
      'Board reporting requirements',
    ],
    deliverables: [
      'Financial Strategy Development',
      'Budgeting & Forecasting',
      'Cash Flow Management',
      'Investor Relations Support',
      'Financial Systems Optimization',
      'Executive Reporting & Dashboards',
    ],
    whyOutsource: [
      'Executive expertise at fraction of full-time cost',
      'Flexible engagement levels',
      'No benefits or overhead expenses',
      'Immediate access to seasoned CFO',
      'Scalable as your business grows',
    ],
    process: [
      { title: 'Assessment', description: 'Deep understanding of your financial operations and goals.' },
      { title: 'Strategy', description: 'Development of financial strategy and improvement plans.' },
      { title: 'Execution', description: 'Ongoing management of financial operations and reporting.' },
      { title: 'Optimization', description: 'Continuous improvement and strategic advisory.' },
    ],
  },
  'payroll': {
    problems: [
      'Complex multi-state payroll',
      'Keeping up with tax regulations',
      'Time-consuming payroll processing',
      'Employee classification concerns',
      'Year-end reporting burden',
    ],
    deliverables: [
      'Payroll Processing & Direct Deposit',
      'Tax Filing & Remittance',
      'W-2 & 1099 Preparation',
      'Benefits Administration',
      'PTO & Time-Off Tracking',
      'Payroll Reporting & Analytics',
    ],
    whyOutsource: [
      'Ensure compliance with changing regulations',
      'Reduce risk of costly errors',
      'Free up time for core business activities',
      'Access to payroll expertise',
      'Secure, reliable processing',
    ],
    process: [
      { title: 'Setup', description: 'Employee data entry, tax setup, and system configuration.' },
      { title: 'Processing', description: 'Regular payroll runs with accuracy verification.' },
      { title: 'Compliance', description: 'Tax payments, filings, and regulatory compliance.' },
      { title: 'Reporting', description: 'Detailed payroll reports and analytics.' },
    ],
  },
  'sales-tax': {
    problems: [
      'Nexus determination confusion',
      'Multi-state filing complexity',
      'Keeping up with rate changes',
      'Exemption certificate management',
      'Audit risk concerns',
    ],
    deliverables: [
      'Nexus Analysis & Monitoring',
      'Sales Tax Registration',
      'Monthly/Quarterly Filing',
      'Use Tax Compliance',
      'Exemption Certificate Management',
      'Audit Support & Defense',
    ],
    whyOutsource: [
      'Expert navigation of complex sales tax laws',
      'Reduce risk of penalties and audits',
      'Stay current with changing regulations',
      'Efficient multi-state compliance',
      'Peace of mind for your business',
    ],
    process: [
      { title: 'Nexus Review', description: 'Comprehensive analysis of your sales tax obligations.' },
      { title: 'Registration', description: 'Setup in all required jurisdictions.' },
      { title: 'Ongoing Filing', description: 'Regular preparation and submission of returns.' },
      { title: 'Monitoring', description: 'Continuous tracking of nexus changes and law updates.' },
    ],
  },
};

export default function ServiceDetailPage() {
  const params = useParams();
  const slug = params.slug as string;

  const service = SERVICES.find(s => s.slug === slug);
  const details = serviceDetails[slug];

  if (!service || !details) {
    notFound();
  }

  // Get related services (excluding current)
  const relatedServices = SERVICES.filter(s => s.slug !== slug).slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="hero-shell">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <Link href="/services" className="inline-flex items-center text-sm text-[#64748B] hover:text-blue-600 mb-8 transition-colors">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Services
            </Link>
          </AnimatedSection>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <AnimatedSection>
              <Badge className="eyebrow-badge">
                Service Detail
              </Badge>
              <h1 className="hero-title mb-6 sm:text-6xl lg:text-[4rem]">
                {service.title}
              </h1>
              <p className="hero-copy mb-8">
                {service.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-8">
                {service.features.map((feature) => (
                  <span key={feature} className="text-sm bg-blue-50 text-blue-700 px-4 py-2 rounded-full">
                    {feature}
                  </span>
                ))}
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/contact">
                  <Button
                    size="lg"
                    className="btn-gradient px-8"
                  >
                    Get Started
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/contact?type=proposal">
                  <Button
                    variant="outline"
                    size="lg"
                    className="px-8"
                  >
                    Request Quote
                  </Button>
                </Link>
              </div>
            </AnimatedSection>

            <AnimatedSection direction="right" className="hidden lg:block">
              <div className="relative">
                <div className="premium-panel flex h-32 w-32 items-center justify-center bg-gradient-to-br from-[#2563EB] to-[#06B6D4]">
                  <ServiceIcon icon={service.icon} />
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Problems We Solve */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            <AnimatedSection>
              <h2 className="text-3xl font-bold tracking-tight text-[#0F172A] mb-6">
                Common Problems We Solve
              </h2>
              <ul className="space-y-4">
                {details.problems.map((problem) => (
                  <li key={problem} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-red-500 text-sm font-bold">!</span>
                    </div>
                    <span className="text-[#64748B]">{problem}</span>
                  </li>
                ))}
              </ul>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <h2 className="text-3xl font-bold tracking-tight text-[#0F172A] mb-6">
                What You&apos;ll Receive
              </h2>
              <ul className="space-y-4">
                {details.deliverables.map((deliverable) => (
                  <li key={deliverable} className="flex items-start gap-3">
                    <CheckCircle className="h-6 w-6 text-emerald-500 flex-shrink-0" />
                    <span className="text-[#64748B]">{deliverable}</span>
                  </li>
                ))}
              </ul>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Why Outsource */}
      <section className="section-padding section-tone-dark text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center max-w-3xl mx-auto mb-16">
            <Badge className="mb-4 bg-white/10 text-white border-white/20">
              Benefits
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
              Why Outsource This Service?
            </h2>
          </AnimatedSection>

          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {details.whyOutsource.map((reason, index) => (
              <StaggerItem key={index}>
                <Card className="premium-card-dark h-full">
                  <CardContent className="p-6">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center mb-4">
                      <span className="text-lg font-bold text-blue-400">{index + 1}</span>
                    </div>
                    <p className="text-[#E2E8F0]">{reason}</p>
                  </CardContent>
                </Card>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Process */}
      <section className="section-padding section-tone">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center max-w-3xl mx-auto mb-16">
            <Badge className="mb-4 bg-slate-100 text-slate-600 border-slate-200">
              Our Process
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#0F172A] mb-4">
              How We Deliver Results
            </h2>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {details.process.map((step, index) => (
              <AnimatedSection key={step.title} delay={index * 0.1}>
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-400 text-white font-bold text-xl mb-4">
                    {String(index + 1).padStart(2, '0')}
                  </div>
                  <h3 className="text-xl font-semibold text-[#0F172A] mb-3">{step.title}</h3>
                  <p className="text-[#64748B] text-sm leading-relaxed">{step.description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Related Services */}
      <section className="section-padding">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-[#0F172A] mb-4">
              Related Services
            </h2>
            <p className="text-lg text-[#64748B]">
              Many clients combine this service with these complementary offerings.
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-6">
            {relatedServices.map((relatedService) => (
              <Link key={relatedService.slug} href={`/services/${relatedService.slug}`}>
                <Card className="premium-card group h-full">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 flex items-center justify-center mb-4 group-hover:from-blue-500/20 group-hover:to-cyan-500/20 transition-colors">
                      <ServiceIcon icon={relatedService.icon} />
                    </div>
                    <h3 className="text-lg font-semibold text-[#0F172A] mb-2 group-hover:text-blue-600 transition-colors">
                      {relatedService.shortTitle}
                    </h3>
                    <p className="text-sm text-[#64748B]">{relatedService.shortDescription}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding section-tone">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#0F172A] mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-lg text-[#64748B] mb-8 max-w-2xl mx-auto">
              Let&apos;s discuss how our {service.title.toLowerCase()} service can help your firm.
            </p>
            <Link href="/contact">
              <Button size="lg" className="btn-gradient px-8">
                Schedule a Consultation
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
