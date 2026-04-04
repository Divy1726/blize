'use client';
import {
  Target,
  Eye,
  CheckCircle,
  Users,
  Award,
  TrendingUp,
  Shield,
  ArrowRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { AnimatedSection, StaggerContainer, StaggerItem } from '@/components/shared/AnimatedSection';
import { COMPANY } from '@/lib/constants';
import Link from 'next/link';

const values = [
  {
    icon: Target,
    title: 'Excellence',
    description: 'We pursue perfection in every deliverable, maintaining the highest standards of accuracy and professionalism.',
  },
  {
    icon: Shield,
    title: 'Integrity',
    description: 'Trust is the foundation of our business. We handle every client relationship with complete transparency and honesty.',
  },
  {
    icon: Users,
    title: 'Partnership',
    description: 'We don\'t just provide services—we become an extension of your team, deeply invested in your success.',
  },
  {
    icon: TrendingUp,
    title: 'Innovation',
    description: 'We continuously adopt new technologies and methodologies to deliver more value to our clients.',
  },
];

const milestones = [
  { year: '2018', title: 'Founded', description: 'Started with a mission to transform how accounting firms access talent.' },
  { year: '2019', title: 'First 10 Clients', description: 'Built our foundation serving boutique CPA firms in New York.' },
  { year: '2020', title: 'Remote-First Model', description: 'Successfully transitioned to distributed teams, expanding our talent pool.' },
  { year: '2021', title: '50+ Team Members', description: 'Grew our team while maintaining quality and culture.' },
  { year: '2022', title: 'SOC 2 Certification', description: 'Achieved industry-recognized security certification.' },
  { year: '2023', title: '100+ Clients', description: 'Reached milestone of 100+ active firm partnerships.' },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="hero-shell">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <AnimatedSection>
              <Badge className="eyebrow-badge">
                About Us
              </Badge>
              <h1 className="hero-title mb-6">
                Building the Future of{' '}
                <span className="hero-highlight">Accounting Support</span>
              </h1>
              <p className="hero-copy mb-6">
                Founded in 2018, {COMPANY.name} was born from a simple observation: accounting firms needed better access to skilled financial professionals without the overhead of traditional hiring.
              </p>
              <p className="hero-copy mb-8">
                Today, we partner with over 100 accounting firms, tax practices, and financial businesses, providing everything from daily bookkeeping to strategic CFO services. Our mission remains unchanged: to empower financial professionals with the support they need to grow and thrive.
              </p>
              <div className="flex flex-wrap gap-8">
                <div>
                  <div className="text-3xl font-bold text-[#2563EB]">100+</div>
                  <div className="text-sm text-[#64748B]">Active Clients</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-[#2563EB]">50+</div>
                  <div className="text-sm text-[#64748B]">Team Members</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-[#2563EB]">98%</div>
                  <div className="text-sm text-[#64748B]">Retention Rate</div>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection direction="right" className="relative">
              <div className="premium-panel p-8">
                <div className="aspect-square bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-[#2563EB] to-[#06B6D4] flex items-center justify-center mx-auto mb-4">
                      <span className="text-4xl font-bold text-white">F</span>
                    </div>
                    <div className="text-xl font-semibold text-[#0F172A]">{COMPANY.name}</div>
                    <div className="text-sm text-[#64748B]">Est. 2018</div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section-padding">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
            <AnimatedSection>
              <div className="premium-card p-8 lg:p-10 h-full">
                <div className="w-14 h-14 rounded-2xl bg-blue-500/10 flex items-center justify-center mb-6">
                  <Target className="h-7 w-7 text-blue-600" />
                </div>
                <h2 className="text-2xl lg:text-3xl font-bold text-[#0F172A] mb-4">Our Mission</h2>
                <p className="text-[#64748B] leading-relaxed">
                  To democratize access to top-tier accounting talent, enabling firms of all sizes to deliver exceptional service to their clients while maintaining healthy, sustainable growth.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <div className="premium-card p-8 lg:p-10 h-full">
                <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 flex items-center justify-center mb-6">
                  <Eye className="h-7 w-7 text-cyan-600" />
                </div>
                <h2 className="text-2xl lg:text-3xl font-bold text-[#0F172A] mb-4">Our Vision</h2>
                <p className="text-[#64748B] leading-relaxed">
                  To become the world&apos;s most trusted partner for outsourced accounting services, known for uncompromising quality, innovative solutions, and genuine partnerships with every client we serve.
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding section-tone-dark text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center max-w-3xl mx-auto mb-16">
            <Badge className="mb-4 bg-white/10 text-white border-white/20">
              Our Values
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
              Principles That Guide Us
            </h2>
            <p className="text-lg text-[#94A3B8]">
              Our core values shape every decision we make and every relationship we build.
            </p>
          </AnimatedSection>

          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value) => (
              <StaggerItem key={value.title}>
                <Card className="premium-card-dark h-full">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center mb-4">
                      <value.icon className="h-6 w-6 text-blue-400" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                    <p className="text-[#94A3B8] text-sm leading-relaxed">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-padding section-tone">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center max-w-3xl mx-auto mb-16">
            <Badge className="mb-4 bg-slate-100 text-slate-600 border-slate-200">
              Our Journey
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#0F172A] mb-4">
              Milestones Along the Way
            </h2>
            <p className="text-lg text-[#64748B]">
              From a small startup to a trusted partner for accounting firms nationwide.
            </p>
          </AnimatedSection>

          <div className="relative">
            {/* Timeline line */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-[#E2E8F0] -translate-x-1/2" />

            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <AnimatedSection key={milestone.year} delay={index * 0.1}>
                  <div className={`flex flex-col md:flex-row items-center gap-6 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                    <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                      <div className="premium-card p-6">
                        <div className="text-sm font-semibold text-blue-600 mb-1">{milestone.year}</div>
                        <h3 className="text-lg font-semibold text-[#0F172A] mb-2">{milestone.title}</h3>
                        <p className="text-sm text-[#64748B]">{milestone.description}</p>
                      </div>
                    </div>
                    <div className="w-4 h-4 rounded-full bg-blue-500 border-4 border-white shadow-md z-10" />
                    <div className="flex-1 hidden md:block" />
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Trust Us */}
      <section className="section-padding">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <AnimatedSection className="order-2 lg:order-1">
              <div className="grid grid-cols-2 gap-6">
                  <div className="premium-card p-6 text-center">
                  <Award className="h-10 w-10 text-blue-600 mx-auto mb-4" />
                  <div className="text-3xl font-bold text-[#0F172A] mb-1">A+</div>
                  <div className="text-sm text-[#64748B]">BBB Rating</div>
                </div>
                  <div className="premium-card p-6 text-center">
                  <Shield className="h-10 w-10 text-cyan-600 mx-auto mb-4" />
                  <div className="text-3xl font-bold text-[#0F172A] mb-1">SOC 2</div>
                  <div className="text-sm text-[#64748B]">Type II Certified</div>
                </div>
                  <div className="premium-card p-6 text-center">
                  <Users className="h-10 w-10 text-blue-600 mx-auto mb-4" />
                  <div className="text-3xl font-bold text-[#0F172A] mb-1">50+</div>
                  <div className="text-sm text-[#64748B]">CPAs on Team</div>
                </div>
                  <div className="premium-card p-6 text-center">
                  <CheckCircle className="h-10 w-10 text-cyan-600 mx-auto mb-4" />
                  <div className="text-3xl font-bold text-[#0F172A] mb-1">99.8%</div>
                  <div className="text-sm text-[#64748B]">Accuracy Rate</div>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection direction="right" className="order-1 lg:order-2">
              <Badge className="mb-6 bg-blue-500/10 text-blue-600 border-blue-200">
                Why Clients Trust Us
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#0F172A] mb-6">
                Built on a Foundation of Excellence
              </h2>
              <p className="text-lg text-[#64748B] mb-6">
                We understand that choosing a partner for your financial operations is a significant decision. That&apos;s why we&apos;ve invested heavily in building trust through every interaction.
              </p>
              <ul className="space-y-3">
                {[
                  'Rigorous quality control processes',
                  'Transparent pricing with no hidden fees',
                  'Dedicated account managers for every client',
                  'Flexible engagement terms that scale with you',
                  'Continuous training and professional development',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-emerald-500 flex-shrink-0" />
                    <span className="text-[#64748B]">{item}</span>
                  </li>
                ))}
              </ul>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding section-tone">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#0F172A] mb-6">
              Ready to Partner With Us?
            </h2>
            <p className="text-lg text-[#64748B] mb-8 max-w-2xl mx-auto">
              Let&apos;s discuss how {COMPANY.name} can help your firm scale, improve efficiency, and deliver better results for your clients.
            </p>
            <Link href="/contact">
              <Button size="lg" className="btn-gradient px-8">
                Start the Conversation
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
