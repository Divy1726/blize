'use client';

import Link from 'next/link';
import {
  ArrowRight,
  ArrowUpRight,
  Calculator,
  TrendingUp,
  BookOpen,
  FileText,
  ClipboardCheck,
  Briefcase,
  CreditCard,
  Receipt,
  Clock,
  Shield,
  Users,
  BarChart3,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { AnimatedSection, StaggerContainer, StaggerItem } from '@/components/shared/AnimatedSection';
import { SERVICES } from '@/lib/constants';

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
  return <IconComponent className="h-6 w-6" />;
}

const benefits = [
  {
    icon: Clock,
    title: 'Faster Turnaround',
    description: '24-48 hour standard delivery on most services',
  },
  {
    icon: Shield,
    title: 'Quality Assurance',
    description: 'Multi-layer review process for 99.8% accuracy',
  },
  {
    icon: Users,
    title: 'Expert Team',
    description: 'CPAs and accounting professionals with 10+ years experience',
  },
  {
    icon: BarChart3,
    title: 'Scalable Support',
    description: 'Scale up or down based on your seasonal needs',
  },
];

const process = [
  {
    step: '01',
    title: 'Consultation',
    description: 'We discuss your specific needs and create a customized service plan.',
  },
  {
    step: '02',
    title: 'Setup',
    description: 'Secure system access and process documentation tailored to your firm.',
  },
  {
    step: '03',
    title: 'Execution',
    description: 'Our team delivers high-quality work with regular communication.',
  },
  {
    step: '04',
    title: 'Review & Optimize',
    description: 'Continuous improvement based on your feedback and evolving needs.',
  },
];

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section className="hero-shell">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center max-w-4xl mx-auto">
            <Badge className="eyebrow-badge">
              Our Services
            </Badge>
            <h1 className="hero-title mb-6">
              Comprehensive{' '}
              <span className="hero-highlight">Financial Services</span>
            </h1>
            <p className="hero-copy max-w-3xl mx-auto">
              From daily bookkeeping to strategic CFO advisory, we provide the full spectrum of accounting and financial services to help your firm thrive.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#0F172A] mb-4">
              What We Offer
            </h2>
            <p className="text-lg text-[#64748B]">
              Each service is customizable to your specific needs and can be combined for comprehensive support.
            </p>
          </AnimatedSection>

          <StaggerContainer className="grid md:grid-cols-2 gap-8">
            {SERVICES.map((service) => (
              <StaggerItem key={service.slug}>
                <Link href={`/services/${service.slug}`}>
                  <Card className="premium-card group h-full cursor-pointer">
                    <CardContent className="p-8">
                      <div className="flex items-start gap-4">
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 flex items-center justify-center flex-shrink-0 group-hover:from-blue-500/20 group-hover:to-cyan-500/20 transition-colors">
                          <ServiceIcon icon={service.icon} />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold text-[#0F172A] mb-2 group-hover:text-blue-600 transition-colors">
                            {service.title}
                          </h3>
                          <p className="text-[#64748B] mb-4">
                            {service.description}
                          </p>
                          <div className="flex flex-wrap gap-2 mb-4">
                            {service.features.slice(0, 3).map((feature) => (
                              <span key={feature} className="text-xs bg-[#F1F5F9] text-[#64748B] px-3 py-1 rounded-full">
                                {feature}
                              </span>
                            ))}
                          </div>
                          <div className="flex items-center text-blue-600 text-sm font-medium group-hover:gap-2 transition-all">
                            Learn more
                            <ArrowUpRight className="h-4 w-4 ml-1 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Benefits */}
      <section className="section-padding section-tone-dark text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center max-w-3xl mx-auto mb-16">
            <Badge className="mb-4 bg-white/10 text-white border-white/20">
              Why Our Services
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
              The Blize Advantage
            </h2>
            <p className="text-lg text-[#94A3B8]">
              We combine expertise, technology, and a commitment to excellence to deliver superior results.
            </p>
          </AnimatedSection>

          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit) => (
              <StaggerItem key={benefit.title}>
                <Card className="premium-card-dark h-full">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center mb-4">
                      <benefit.icon className="h-6 w-6 text-blue-400" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
                    <p className="text-[#94A3B8] text-sm">{benefit.description}</p>
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
              How It Works
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#0F172A] mb-4">
              Simple, Streamlined Process
            </h2>
            <p className="text-lg text-[#64748B]">
              Getting started with Blize Global is easy. Here&apos;s how we work together.
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {process.map((step, index) => (
              <AnimatedSection key={step.step} delay={index * 0.1}>
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-400 text-white font-bold text-xl mb-4">
                    {step.step}
                  </div>
                  <h3 className="text-xl font-semibold text-[#0F172A] mb-3">{step.title}</h3>
                  <p className="text-[#64748B] text-sm leading-relaxed">{step.description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#0F172A] mb-6">
              Not Sure Which Service You Need?
            </h2>
            <p className="text-lg text-[#64748B] mb-8 max-w-2xl mx-auto">
              Schedule a free consultation with our team. We&apos;ll assess your needs and recommend the perfect combination of services for your firm.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button size="lg" className="btn-gradient px-8">
                  Schedule Free Consultation
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/contact?type=proposal">
                <Button variant="outline" size="lg" className="px-8">
                  Get Custom Proposal
                </Button>
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
