'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle,
  BarChart3,
  Shield,
  Clock,
  Users,
  Briefcase,
  Calculator,
  FileText,
  BookOpen,
  TrendingUp,
  Receipt,
  CreditCard,
  ClipboardCheck,
  Star,
  Calculator as CalculatorIcon,
  FileSpreadsheet,
  Building2,
  Leaf,
  Waves,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  AnimatedSection,
  StaggerContainer,
  StaggerItem,
  AnimatedCounter,
} from '@/components/shared/AnimatedSection';
import {
  STATS,
  SERVICES,
  TESTIMONIALS,
  CASE_STUDIES,
  FAQS,
  SOFTWARE_LOGOS,
  COMPANY,
} from '@/lib/constants';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Card, CardContent } from '@/components/ui/card';

// Icon mapping
const iconMap: Record<string, React.ElementType> = {
  Calculator,
  TrendingUp,
  BookOpen,
  FileText,
  ClipboardCheck,
  Briefcase,
  CreditCard,
  Receipt,
  CalculatorIcon,
  FileSpreadsheet,
  Building2,
  Leaf,
  Waves,
};

// Service Icon Component
function ServiceIcon({ icon }: { icon: string }) {
  const IconComponent = iconMap[icon] || Calculator;
  return <IconComponent className="h-6 w-6" />;
}

// Hero Section
function HeroSection() {
  return (
    <section className="hero-shell">
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-[10%] top-14 h-[24rem] w-[24rem] rounded-full bg-blue-500/12 blur-[120px]" />
        <div className="absolute right-[8%] top-24 h-[22rem] w-[22rem] rounded-full bg-cyan-400/12 blur-[120px]" />
        <div className="absolute inset-x-0 top-0 h-full bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.72),transparent_58%)]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-[linear-gradient(180deg,transparent,rgba(255,255,255,0.78))]" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-start gap-14 lg:grid-cols-[0.94fr_1.06fr] lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="pt-6 lg:pt-14"
          >
            <Badge className="eyebrow-badge">
              Trusted by 100+ Firms and Finance Teams
            </Badge>
            <h1 className="hero-title max-w-3xl text-[3.5rem] sm:text-6xl lg:text-[5.2rem]">
              Premium Accounting
              <span className="block text-gradient">Outsourcing</span>
              Solutions
            </h1>
            <p className="hero-copy mt-7 max-w-2xl">
              {COMPANY.description} We help CPA firms, tax practices, and growing businesses
              streamline reporting, bookkeeping, and finance operations without expanding in-house headcount.
            </p>
            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <Link href="/contact">
                <Button
                  size="lg"
                  className="btn-gradient px-8 text-base"
                >
                  Get Free Consultation
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/services">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-slate-300 bg-white/70 px-8 text-base text-[#0F172A] shadow-[0_18px_40px_-30px_rgba(15,23,42,0.24)] backdrop-blur-sm"
                >
                  Learn More
                </Button>
              </Link>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-3 text-sm text-[#64748B]">
              <div className="premium-chip">
                <CheckCircle className="h-5 w-5 text-emerald-500" />
                <span>Dedicated finance support</span>
              </div>
              <div className="premium-chip">
                <CheckCircle className="h-5 w-5 text-emerald-500" />
                <span>Fast onboarding and delivery</span>
              </div>
              <div className="premium-chip">
                <Shield className="h-5 w-5 text-[#175fe8]" />
                <span>Secure, audit-ready workflows</span>
              </div>
            </div>

            <div className="mt-12 grid max-w-2xl grid-cols-1 gap-4 border-t border-slate-200/80 pt-8 sm:grid-cols-3">
              {[
                ['500+', 'projects delivered'],
                ['98%', 'client retention'],
                ['15+', 'years experience'],
              ].map(([value, label]) => (
                <div key={label} className="pr-4">
                  <div className="text-4xl font-semibold tracking-[-0.05em] text-[#081120]">{value}</div>
                  <div className="mt-1 text-sm text-[#5c6b83]">{label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative lg:pt-4"
          >
            <div className="premium-panel relative overflow-hidden border border-white/80 bg-[linear-gradient(180deg,rgba(250,252,255,0.98),rgba(240,247,252,0.95))] p-6 sm:p-8">
              <div className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-blue-300/70 to-transparent" />
              <div className="absolute right-0 top-0 h-44 w-44 rounded-full bg-blue-500/10 blur-3xl" />
              <div className="absolute bottom-0 left-0 h-40 w-40 rounded-full bg-cyan-400/10 blur-3xl" />

              <div className="relative">
                <div className="mb-6">
                  <div className="inline-flex rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-[#1557dd]">
                    Get A Free Quote
                  </div>
                  <h2 className="mt-5 text-3xl font-semibold tracking-[-0.04em] text-[#081120] sm:text-[2.2rem]">
                    Talk to a finance team that already knows the work.
                  </h2>
                  <p className="mt-3 max-w-xl text-base leading-7 text-[#5c6b83]">
                    Share your needs and we&apos;ll map the right accounting, tax, or CFO support plan for your team.
                  </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  {[
                    'Full Name',
                    'Work Email',
                    'Phone Number',
                    'Company / Firm',
                    'Country',
                    'Service Needed',
                  ].map((label, index) => (
                    <div key={label} className={index > 3 ? 'sm:col-span-1' : ''}>
                      <div className="mb-2 text-sm font-medium text-[#334155]">{label}</div>
                      <div className="rounded-2xl border border-slate-200 bg-white/88 px-4 py-4 text-sm text-[#94A3B8] shadow-[0_16px_34px_-28px_rgba(15,23,42,0.2)]">
                        {label === 'Full Name' && 'Jane Cooper'}
                        {label === 'Work Email' && 'jane@company.com'}
                        {label === 'Phone Number' && '+91 98765 43210'}
                        {label === 'Company / Firm' && 'Your Company'}
                        {label === 'Country' && 'United States'}
                        {label === 'Service Needed' && 'Select a service'}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-4">
                  <div className="mb-2 text-sm font-medium text-[#334155]">Message / Requirements</div>
                  <div className="min-h-32 rounded-[1.6rem] border border-slate-200 bg-white/88 px-4 py-4 text-sm text-[#94A3B8] shadow-[0_16px_34px_-28px_rgba(15,23,42,0.2)]">
                    Tell us about your current workflow, monthly volume, and where your team needs support.
                  </div>
                </div>

                <div className="mt-6">
                  <div className="rounded-2xl bg-gradient-to-r from-[#175fe8] to-[#08b7d8] px-6 py-4 text-center text-sm font-semibold text-white shadow-[0_22px_44px_-24px_rgba(23,95,232,0.56)]">
                    Submit Inquiry
                  </div>
                </div>
              </div>
            </div>

            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -right-3 top-7 hidden rounded-3xl border border-white/85 bg-white/92 p-4 shadow-premium xl:block"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                  <Clock className="h-5 w-5 text-[#175fe8]" />
                </div>
                <div>
                  <div className="text-sm font-medium text-[#0F172A]">24hr Response</div>
                  <div className="text-xs text-[#64748B]">Typical first reply</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// Trusted Tools Section
function TrustedToolsSection() {
  return (
    <section className="section-divider py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="mb-8 text-center text-xs font-semibold uppercase tracking-[0.24em] text-[#64748B]">
          Trusted tools and software we work with
        </p>
        <div className="premium-panel flex flex-wrap items-center justify-center gap-6 px-6 py-7 lg:gap-12">
          {SOFTWARE_LOGOS.map((tool) => (
            <div
              key={tool.name}
              className="flex items-center gap-3 rounded-full border border-transparent px-2 py-1 text-[#94A3B8] transition-colors duration-300 hover:border-slate-200 hover:text-[#64748B]"
            >
              <ServiceIcon icon={tool.icon} />
              <span className="font-medium">{tool.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Why Choose Us Section
function WhyChooseUsSection() {
  const reasons = [
    {
      icon: Users,
      title: 'Experienced Team',
      description: 'CPAs and accounting professionals with an average of 10+ years of experience.',
    },
    {
      icon: Shield,
      title: 'Secure & Confidential',
      description: 'Bank-level security protocols and strict confidentiality agreements with all team members.',
    },
    {
      icon: Clock,
      title: 'Fast Turnaround',
      description: 'Average 24-48 hour response time with flexible scheduling for urgent needs.',
    },
    {
      icon: BarChart3,
      title: 'Scalable Solutions',
      description: 'Easily scale support up or down based on your seasonal needs and business growth.',
    },
    {
      icon: CheckCircle,
      title: 'Quality Assurance',
      description: 'Multi-layer review process ensures 99.8% accuracy in all deliverables.',
    },
    {
      icon: Briefcase,
      title: 'Industry Expertise',
      description: 'Deep knowledge across multiple industries including professional services, retail, and technology.',
    },
  ];

  return (
    <section className="section-padding section-tone">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="section-intro">
          <Badge variant="secondary">
            Why Firms Choose Us
          </Badge>
          <h2 className="section-title mb-5">
            The Partner Your Firm Deserves
          </h2>
          <p className="section-copy">
            We combine expertise, technology, and a commitment to excellence to deliver results that exceed expectations.
          </p>
        </AnimatedSection>

        <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((reason) => (
            <StaggerItem key={reason.title}>
              <Card className="premium-card group h-full">
                <CardContent className="p-7">
                  <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500/12 to-cyan-500/12 shadow-[0_12px_30px_-22px_rgba(23,95,232,0.35)] transition-colors group-hover:from-blue-500/20 group-hover:to-cyan-500/20">
                    <reason.icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="mb-3 text-xl font-semibold tracking-[-0.03em] text-[#0F172A]">
                    {reason.title}
                  </h3>
                  <p className="text-sm leading-7 text-[#64748B]">
                    {reason.description}
                  </p>
                </CardContent>
              </Card>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}

// Services Section
function ServicesSection() {
  return (
    <section className="section-padding">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="section-intro">
          <Badge>
            Our Services
          </Badge>
          <h2 className="section-title mb-5">
            Comprehensive Financial Support
          </h2>
          <p className="section-copy">
            From daily bookkeeping to strategic CFO advisory, we provide the full spectrum of accounting and financial services.
          </p>
        </AnimatedSection>

        <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES.map((service) => (
            <StaggerItem key={service.slug}>
              <Link href={`/services/${service.slug}`}>
                <Card className="premium-card group h-full cursor-pointer">
                  <CardContent className="p-7">
                    <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 shadow-[0_12px_30px_-22px_rgba(23,95,232,0.35)] transition-colors group-hover:from-blue-500/20 group-hover:to-cyan-500/20">
                      <ServiceIcon icon={service.icon} />
                    </div>
                    <h3 className="mb-3 text-xl font-semibold tracking-[-0.03em] text-[#0F172A] transition-colors group-hover:text-blue-600">
                      {service.shortTitle}
                    </h3>
                    <p className="mb-6 text-sm leading-7 text-[#64748B]">
                      {service.shortDescription}
                    </p>
                    <div className="flex items-center gap-1 text-sm font-semibold text-blue-600 transition-all group-hover:gap-2">
                      Learn more
                      <ArrowUpRight className="h-4 w-4 ml-1 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <div className="text-center mt-12">
          <Link href="/services">
            <Button variant="outline" size="lg" className="px-8">
              View All Services
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

// How We Work Section
function HowWeWorkSection() {
  const steps = [
    {
      number: '01',
      title: 'Discovery',
      description: 'We start with a thorough consultation to understand your specific needs, challenges, and goals.',
    },
    {
      number: '02',
      title: 'Transition',
      description: 'Seamless onboarding with secure system access setup and process documentation.',
    },
    {
      number: '03',
      title: 'Execution',
      description: 'Our team begins delivering services with regular communication and quality checkpoints.',
    },
    {
      number: '04',
      title: 'Review',
      description: 'Monthly business reviews to assess performance, address concerns, and optimize processes.',
    },
    {
      number: '05',
      title: 'Optimization',
      description: 'Continuous improvement based on your feedback and evolving business needs.',
    },
  ];

  return (
    <section className="section-padding section-tone-dark scroll-mt-32 pt-28 text-white lg:pt-36">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="section-intro">
          <Badge className="border-white/10 bg-white/[0.08] text-white shadow-none">
            How We Work
          </Badge>
          <h2 className="mb-5 text-3xl font-semibold tracking-[-0.04em] text-white sm:text-4xl lg:text-5xl">
            A Proven Process for Success
          </h2>
          <p className="mx-auto max-w-3xl text-base leading-8 text-[#94A3B8] sm:text-lg">
            Our streamlined approach ensures a smooth partnership from day one, with clear communication and measurable results.
          </p>
        </AnimatedSection>

        <div className="grid gap-6 lg:grid-cols-5 lg:gap-8">
          {steps.map((step, index) => (
            <AnimatedSection key={step.number} delay={index * 0.1} className="relative">
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="absolute left-[calc(100%-0.5rem)] top-8 hidden h-0.5 w-8 bg-gradient-to-r from-blue-500/50 to-transparent lg:block xl:w-12" />
              )}
              
              <div className="premium-card-dark h-full p-6 text-center lg:text-left">
                <div className="mb-5 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-400 text-xl font-bold text-white">
                  {step.number}
                </div>
                <h3 className="mb-3 text-xl font-semibold tracking-[-0.03em]">{step.title}</h3>
                <p className="text-sm leading-7 text-[#94A3B8]">
                  {step.description}
                </p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

// Who We Help Section
function WhoWeHelpSection() {
  const clients = [
    {
      title: 'CPA Firms',
      description: 'Overflow support, seasonal staffing, and specialized services.',
      icon: Calculator,
    },
    {
      title: 'Tax Practices',
      description: 'Year-round bookkeeping and tax preparation assistance.',
      icon: FileText,
    },
    {
      title: 'Bookkeeping Firms',
      description: 'Scalable team extension for growing client bases.',
      icon: BookOpen,
    },
    {
      title: 'Accounting Agencies',
      description: 'Full-service accounting and advisory support.',
      icon: Briefcase,
    },
    {
      title: 'Financial Consultants',
      description: 'Back-office support to maximize client-facing time.',
      icon: TrendingUp,
    },
  ];

  return (
    <section className="py-20 lg:py-28 bg-[#F8FAFC]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center max-w-3xl mx-auto mb-16">
          <Badge className="mb-4 bg-slate-100 text-slate-600 border-slate-200">
            Who We Help
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#0F172A] mb-4">
            Serving Financial Professionals
          </h2>
          <p className="text-lg text-[#64748B]">
            We partner with a diverse range of accounting and financial services firms.
          </p>
        </AnimatedSection>

        <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
          {clients.map((client) => (
            <StaggerItem key={client.title}>
              <Card className="group h-full bg-white border-[#E2E8F0] hover:border-blue-200 hover:shadow-premium-hover transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 flex items-center justify-center mx-auto mb-4 group-hover:from-blue-500/20 group-hover:to-cyan-500/20 transition-colors">
                    <client.icon className="h-7 w-7 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-[#0F172A] mb-2">
                    {client.title}
                  </h3>
                  <p className="text-[#64748B] text-sm leading-relaxed">
                    {client.description}
                  </p>
                </CardContent>
              </Card>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}

// Stats Section
function StatsSection() {
  return (
    <section className="section-divider section-padding">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {STATS.map((stat) => (
            <StaggerItem key={stat.label}>
              <div className="premium-panel p-6 text-center">
                <div className="text-4xl sm:text-5xl font-bold text-gradient mb-2">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-lg font-semibold text-[#0F172A] mb-1">{stat.label}</div>
                <div className="text-sm text-[#64748B]">{stat.description}</div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}

// Trust/Security Section
function TrustSection() {
  return (
    <section className="py-20 lg:py-28 bg-[#F8FAFC]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <AnimatedSection>
            <Badge className="mb-4 bg-slate-100 text-slate-600 border-slate-200">
              Security & Trust
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#0F172A] mb-6">
              Your Data Security Is Our Priority
            </h2>
            <p className="text-lg text-[#64748B] mb-8">
              We understand that your financial data is sensitive. That&apos;s why we&apos;ve implemented comprehensive security measures to protect your information at every step.
            </p>
            
            <div className="space-y-4">
              {[
                'Bank-level 256-bit encryption for all data transfers',
                'SOC 2 Type II certified data centers',
                'Multi-factor authentication for all system access',
                'Strict NDAs and confidentiality agreements',
                'Regular security audits and penetration testing',
                'Role-based access controls and activity monitoring',
              ].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <Shield className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span className="text-[#64748B]">{item}</span>
                </div>
              ))}
            </div>
          </AnimatedSection>

          <AnimatedSection direction="right" className="relative">
            <div className="bg-white rounded-2xl shadow-premium p-8 border border-[#E2E8F0]">
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center p-4 bg-[#F8FAFC] rounded-xl">
                  <div className="text-3xl font-bold text-[#0F172A] mb-1">99.9%</div>
                  <div className="text-sm text-[#64748B]">Uptime Guarantee</div>
                </div>
                <div className="text-center p-4 bg-[#F8FAFC] rounded-xl">
                  <div className="text-3xl font-bold text-[#0F172A] mb-1">256-bit</div>
                  <div className="text-sm text-[#64748B]">Encryption</div>
                </div>
                <div className="text-center p-4 bg-[#F8FAFC] rounded-xl">
                  <div className="text-3xl font-bold text-[#0F172A] mb-1">SOC 2</div>
                  <div className="text-sm text-[#64748B]">Type II Certified</div>
                </div>
                <div className="text-center p-4 bg-[#F8FAFC] rounded-xl">
                  <div className="text-3xl font-bold text-[#0F172A] mb-1">GDPR</div>
                  <div className="text-sm text-[#64748B]">Compliant</div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}

// Testimonials Section
function TestimonialsSection() {
  return (
    <section className="section-padding">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="section-intro">
          <Badge>
            Testimonials
          </Badge>
          <h2 className="section-title mb-5">
            Trusted by Industry Leaders
          </h2>
          <p className="section-copy">
            See what our clients have to say about working with Blize Global.
          </p>
        </AnimatedSection>

        <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {TESTIMONIALS.map((testimonial) => (
            <StaggerItem key={testimonial.id}>
              <Card className="premium-card h-full">
                <CardContent className="p-7">
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="mb-6 text-sm leading-7 text-[#64748B]">
                    &ldquo;{testimonial.content}&rdquo;
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center">
                      <span className="text-sm font-semibold text-blue-600">
                        {testimonial.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-[#0F172A]">{testimonial.name}</div>
                      <div className="text-xs text-[#64748B]">
                        {testimonial.role}, {testimonial.company}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}

// Case Studies Section
function CaseStudiesSection() {
  return (
    <section className="py-20 lg:py-28 bg-[#0B1220] text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-16">
          <div>
            <Badge className="mb-4 bg-white/10 text-white border-white/20">
              Case Studies
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Real Results for Real Clients
            </h2>
          </div>
          <Link href="/case-studies">
            <Button
              variant="outline"
              size="lg"
              className="font-medium px-6 py-5 rounded-xl border-white/20 text-white hover:bg-white/10"
            >
              View All Cases
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </AnimatedSection>

        <StaggerContainer className="grid md:grid-cols-3 gap-8">
          {CASE_STUDIES.map((study) => (
            <StaggerItem key={study.slug}>
              <Link href={`/case-studies#${study.slug}`}>
                <Card className="group h-full bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 cursor-pointer">
                  <CardContent className="p-6">
                    <div className="text-xs text-blue-400 mb-2">{study.industry}</div>
                    <h3 className="text-xl font-semibold mb-4 group-hover:text-blue-400 transition-colors">
                      {study.title}
                    </h3>
                    <p className="text-[#94A3B8] text-sm mb-6 line-clamp-3">
                      {study.challenge}
                    </p>
                    <div className="space-y-2">
                      {study.results.slice(0, 2).map((result, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-sm">
                          <CheckCircle className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                          <span className="text-[#E2E8F0]">{result}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}

// FAQ Preview Section
function FAQPreviewSection() {
  const previewFaqs = FAQS.slice(0, 4);

  return (
    <section className="py-20 lg:py-28 bg-[#F8FAFC]">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-12">
          <Badge className="mb-4 bg-slate-100 text-slate-600 border-slate-200">
            FAQ
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#0F172A] mb-4">
            Common Questions
          </h2>
          <p className="text-lg text-[#64748B]">
            Everything you need to know about working with us.
          </p>
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <Accordion type="single" collapsible className="w-full">
            {previewFaqs.map((faq) => (
              <AccordionItem key={faq.id} value={faq.id} className="bg-white border border-[#E2E8F0] rounded-xl mb-4 px-6 data-[state=open]:border-blue-200">
                <AccordionTrigger className="text-left text-[#0F172A] font-medium hover:no-underline py-4">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-[#64748B] pb-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </AnimatedSection>

        <div className="text-center mt-8">
          <Link href="/faq">
            <Button
              variant="outline"
              className="font-medium px-6 py-5 rounded-xl border-[#E2E8F0] hover:bg-white"
            >
              View All FAQs
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

// Final CTA Section
function FinalCTASection() {
  return (
    <section className="section-padding">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_top_right,rgba(37,99,235,0.24),transparent_28%),linear-gradient(135deg,#09111f_0%,#132033_58%,#1a2a42_100%)] p-8 text-center shadow-[0_36px_110px_-50px_rgba(2,6,23,0.95)] sm:p-12 lg:p-16">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-500/20 rounded-full blur-3xl" />
            <div className="absolute inset-0 grid-sheen opacity-[0.08]" />
            
            <div className="relative z-10">
              <h2 className="mb-6 text-3xl font-semibold tracking-[-0.05em] text-white sm:text-4xl lg:text-5xl">
                Ready to Scale Your Practice?
              </h2>
              <p className="mx-auto mb-8 max-w-2xl text-lg leading-8 text-[#94A3B8]">
                Join 100+ accounting firms that trust Blize Global to handle their financial operations. Get started with a free consultation.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact">
                  <Button
                    size="lg"
                    className="bg-white px-8 text-base text-[#0F172A] hover:bg-[#F1F5F9]"
                  >
                    Book a Consultation
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/contact?type=proposal">
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-white/30 bg-white/[0.06] px-8 text-base text-white hover:bg-white/10"
                  >
                    Get a Proposal
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

// Main Page Component
export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TrustedToolsSection />
      <WhyChooseUsSection />
      <ServicesSection />
      <HowWeWorkSection />
      <WhoWeHelpSection />
      <StatsSection />
      <TrustSection />
      <TestimonialsSection />
      <CaseStudiesSection />
      <FAQPreviewSection />
      <FinalCTASection />
    </>
  );
}
