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
  Loader2,
  Send,
} from 'lucide-react';
import { useState } from 'react';
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
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { SERVICE_OPTIONS, COUNTRY_OPTIONS } from '@/lib/constants';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactFormSchema, ContactFormSchema } from '@/lib/validators';
import { toast } from 'sonner';
import { createClient } from '@/lib/supabase/client';
import { createLead } from '@/lib/admin/leads';

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

function HeroInlineForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serviceValue, setServiceValue] = useState('');
  const supabase = createClient();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm<ContactFormSchema>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: { name: '', email: '', phone: '', company: '', service: '', message: '' },
  });

  const onSubmit = async (data: ContactFormSchema) => {
    setIsSubmitting(true);
    try {
      const result = await createLead(supabase, {
        name: data.name,
        email: data.email,
        phone: data.phone || '',
        company: data.company || '',
        service: data.service,
        message: data.message,
        source: 'home-hero',
        type: 'contact',
      });

      if (!result.ok) {
        toast.error(result.error);
        return;
      }

      toast.success("Thank you! We'll be in touch within 24 hours.");
      reset();
      setServiceValue('');
    } catch (err) {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 sm:grid-cols-2">
      <div className="space-y-2">
        <Label htmlFor="hero-name">Full Name</Label>
        <Input
          id="hero-name"
          placeholder="Jane Cooper"
          className="border-slate-200 bg-white shadow-none"
          {...register('name')}
        />
        {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="hero-email">Work Email</Label>
        <Input
          id="hero-email"
          type="email"
          placeholder="jane@company.com"
          className="border-slate-200 bg-white shadow-none"
          {...register('email')}
        />
        {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="hero-phone">Phone Number</Label>
        <Input
          id="hero-phone"
          placeholder="+91 98765 43210"
          className="border-slate-200 bg-white shadow-none"
          {...register('phone')}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="hero-company">Company / Firm</Label>
        <Input
          id="hero-company"
          placeholder="Your Company"
          className="border-slate-200 bg-white shadow-none"
          {...register('company')}
        />
      </div>

      <div className="space-y-2">
        <Label>Service Needed</Label>
        <Select
          value={serviceValue}
          onValueChange={(value) => {
            const val = value ?? '';
            setServiceValue(val);
            setValue('service', val, { shouldValidate: true, shouldDirty: true });
          }}
        >
          <SelectTrigger className="h-12 w-full rounded-2xl border-slate-200 bg-white px-4 py-3 text-base shadow-none">
            <SelectValue placeholder="Select a service" />
          </SelectTrigger>
          <SelectContent>
            {SERVICE_OPTIONS.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.service && <p className="text-sm text-red-500">{errors.service.message}</p>}
      </div>

      <div className="mt-4 sm:col-span-2 space-y-2">
        <Label htmlFor="hero-message">Message / Requirements</Label>
        <Textarea
          id="hero-message"
          placeholder="Tell us about your current workflow, monthly volume, and where your team needs support."
          rows={4}
          className="border-slate-200 bg-white shadow-none"
          {...register('message')}
        />
        {errors.message && <p className="text-sm text-red-500">{errors.message.message}</p>}
      </div>

      <div className="mt-4 sm:col-span-2">
        <Button type="submit" size="lg" disabled={isSubmitting} className="w-full btn-gradient">
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Sending...
            </>
          ) : (
            <>
              Submit Inquiry
              <Send className="ml-2 h-5 w-5" />
            </>
          )}
        </Button>
      </div>
    </form>
  );
}

// Hero Section
function HeroSection() {
  return (
    <section className="hero-shell">
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-[10%] top-14 h-[24rem] w-[24rem] rounded-full bg-[radial-gradient(circle,rgba(59,130,246,0.14)_0%,rgba(59,130,246,0.05)_45%,transparent_72%)]" />
        <div className="absolute right-[8%] top-24 h-[22rem] w-[22rem] rounded-full bg-[radial-gradient(circle,rgba(34,211,238,0.14)_0%,rgba(34,211,238,0.05)_45%,transparent_72%)]" />
        <div className="absolute inset-x-0 top-0 h-full bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.82),transparent_58%)]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-[linear-gradient(180deg,transparent,rgba(255,255,255,0.88))]" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-start gap-14 lg:grid-cols-[0.94fr_1.06fr] lg:gap-16">
          <div className="pt-6 lg:pt-14">
            <Badge className="eyebrow-badge max-w-full whitespace-normal break-words px-3 py-2 text-center text-[10px] leading-relaxed sm:text-xs">
              Trusted by 100+ Firms and Finance Teams
            </Badge>
            <h1 className="hero-title max-w-3xl text-4xl leading-[1.1] sm:text-5xl md:text-6xl lg:text-[5.2rem]">
              Premium Accounting
              <span className="block text-gradient">Outsourcing</span>
              Solutions
            </h1>
            <p className="hero-copy mt-7 max-w-2xl">
              {COMPANY.description} We help CPA firms, tax practices, and growing businesses
              streamline reporting, bookkeeping, and finance operations without expanding in-house headcount.
            </p>
            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <Link href="/contact" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  className="w-full sm:w-auto btn-gradient px-8 text-base"
                >
                  Get Free Consultation
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/services" className="w-full sm:w-auto">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto border-slate-300 bg-white px-8 text-base text-[#0F172A] shadow-[0_18px_40px_-30px_rgba(15,23,42,0.18)]"
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
          </div>

          <div className="relative lg:pt-4">
            <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-[linear-gradient(180deg,#ffffff,#f8fbff)] p-6 shadow-[0_30px_100px_-44px_rgba(2,6,23,0.22)] sm:p-8">
              <div className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-blue-300/70 to-transparent" />
              <div className="absolute right-0 top-0 h-44 w-44 rounded-full bg-[radial-gradient(circle,rgba(59,130,246,0.10)_0%,transparent_70%)]" />
              <div className="absolute bottom-0 left-0 h-40 w-40 rounded-full bg-[radial-gradient(circle,rgba(34,211,238,0.10)_0%,transparent_70%)]" />

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

                {/* Hero quick inquiry form */}
                <HeroInlineForm />
              </div>
            </div>

            <div className="absolute -right-3 top-7 hidden rounded-3xl border border-slate-200 bg-white p-4 shadow-[0_18px_50px_-28px_rgba(15,23,42,0.16)] xl:block">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                  <Clock className="h-5 w-5 text-[#175fe8]" />
                </div>
                <div>
                  <div className="text-sm font-medium text-[#0F172A]">24hr Response</div>
                  <div className="text-xs text-[#64748B]">Typical first reply</div>
                </div>
              </div>
            </div>
          </div>
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

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8">
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
          <Link href="/services" className="w-full sm:w-auto inline-block">
            <Button variant="outline" size="lg" className="w-full sm:w-auto px-8">
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
        <StaggerContainer className="grid grid-cols-1 min-[400px]:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {STATS.map((stat) => (
            <StaggerItem key={stat.label}>
              <div className="premium-panel p-6 text-center">
                <div className="text-4xl sm:text-5xl font-bold text-gradient mb-2">
                  {stat.value}{stat.suffix}
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
            <div className="bg-white rounded-2xl shadow-premium p-5 sm:p-8 border border-[#E2E8F0]">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
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
          <Link href="/case-studies" className="w-full sm:w-auto">
            <Button
              variant="outline"
              size="lg"
              className="w-full sm:w-auto font-medium px-6 py-5 rounded-xl border-white/20 text-black hover:bg-white/30"
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
                    <h3 className="text-xl font-semibold text-white mb-4 group-hover:text-blue-400 transition-colors">
                      {study.title}
                    </h3>
                    <p className="text-gray-300 text-sm mb-6 line-clamp-3">
                      {study.challenge}
                    </p>
                    <div className="space-y-2">
                      {study.results.slice(0, 2).map((result, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-sm">
                          <CheckCircle className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                          <span className="text-white">{result}</span>
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
          <Link href="/faq" className="w-full sm:w-auto inline-block">
            <Button
              variant="outline"
              className="w-full sm:w-auto font-medium px-6 py-5 rounded-xl border-[#E2E8F0] hover:bg-white"
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
          <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_top_right,rgba(37,99,235,0.24),transparent_28%),linear-gradient(135deg,#09111f_0%,#132033_58%,#1a2a42_100%)] p-6 sm:p-12 lg:p-16 text-center shadow-[0_36px_110px_-50px_rgba(2,6,23,0.95)]">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/20 rounded-full" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-500/20 rounded-full" />
            <div className="absolute inset-0 grid-sheen opacity-[0.08]" />

            <div className="relative z-10">
              <h2 className="mb-6 text-3xl font-semibold tracking-[-0.05em] text-white sm:text-4xl lg:text-5xl">
                Ready to Scale Your Practice?
              </h2>
              <p className="mx-auto mb-8 max-w-2xl text-lg leading-8 text-[#94A3B8]">
                Join 100+ accounting firms that trust Blize Global to handle their financial operations. Get started with a free consultation.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact" className="w-full sm:w-auto">
                  <Button
                    size="lg"
                    className="w-full sm:w-auto bg-white px-8 text-base text-[#0F172A] hover:bg-[#F1F5F9]"
                  >
                    Book a Consultation
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/contact?type=proposal" className="w-full sm:w-auto">
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full sm:w-auto border-white/30 bg-white/[0.06] px-8 text-base text-white hover:bg-white/30"
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
