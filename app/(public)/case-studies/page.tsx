'use client';

import Link from 'next/link';
import { ArrowRight, CheckCircle, BarChart3, TrendingUp, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { AnimatedSection, StaggerContainer, StaggerItem } from '@/components/shared/AnimatedSection';
import { CASE_STUDIES } from '@/lib/constants';

export default function CaseStudiesPage() {
  return (
    <>
      {/* Hero */}
      <section className="hero-shell">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center max-w-4xl mx-auto">
            <Badge className="eyebrow-badge">
              Case Studies
            </Badge>
            <h1 className="hero-title mb-6">
              Real Results for{' '}
              <span className="hero-highlight">Real Clients</span>
            </h1>
            <p className="text-lg sm:text-xl text-[#64748B] leading-relaxed max-w-3xl mx-auto">
              See how we&apos;ve helped accounting firms and financial practices overcome challenges, scale operations, and deliver better results for their clients.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Stats Overview */}
      <section className="section-divider py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { value: '100+', label: 'Clients Served' },
              { value: '500+', label: 'Projects Delivered' },
              { value: '98%', label: 'Client Retention' },
              { value: '40%', label: 'Avg. Cost Savings' },
            ].map((stat) => (
              <StaggerItem key={stat.label}>
                <div className="text-center">
                  <div className="text-3xl lg:text-4xl font-bold text-blue-600 mb-1">{stat.value}</div>
                  <div className="text-sm text-[#64748B]">{stat.label}</div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Case Studies */}
      <section className="section-padding">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            {CASE_STUDIES.map((study, index) => (
              <AnimatedSection key={study.slug} delay={index * 0.1}>
                <Card id={study.slug} className="premium-card overflow-hidden">
                  <CardContent className="p-0">
                    <div className="grid lg:grid-cols-2">
                      {/* Left Content */}
                      <div className="p-8 lg:p-12">
                        <div className="flex flex-wrap items-center gap-3 mb-4">
                          <Badge variant="secondary" className="bg-blue-50 text-blue-700">
                            {study.industry}
                          </Badge>
                        </div>
                        <h2 className="text-2xl lg:text-3xl font-bold text-[#0F172A] mb-4">
                          {study.title}
                        </h2>
                        <p className="text-[#64748B] mb-6">
                          {study.challenge}
                        </p>

                        <div className="space-y-4">
                          <div>
                            <h4 className="font-semibold text-[#0F172A] mb-2 flex items-center gap-2">
                              <BarChart3 className="h-4 w-4 text-blue-600" />
                              Challenge
                            </h4>
                            <p className="text-sm text-[#64748B]">{study.challenge}</p>
                          </div>
                          <div>
                            <h4 className="font-semibold text-[#0F172A] mb-2 flex items-center gap-2">
                              <TrendingUp className="h-4 w-4 text-emerald-500" />
                              Solution
                            </h4>
                            <p className="text-sm text-[#64748B]">{study.solution}</p>
                          </div>
                        </div>
                      </div>

                      {/* Right Results */}
                      <div className="bg-[#0B1220] text-white p-8 lg:p-12">
                        <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                          <Users className="h-5 w-5 text-blue-400" />
                          Key Results
                        </h3>
                        <ul className="space-y-4">
                          {study.results.map((result, idx) => (
                            <li key={idx} className="flex items-start gap-3">
                              <CheckCircle className="h-5 w-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                              <span className="text-[#E2E8F0]">{result}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding section-tone">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#0F172A] mb-6">
              Ready to Achieve Similar Results?
            </h2>
            <p className="text-lg text-[#64748B] mb-8 max-w-2xl mx-auto">
              Let&apos;s discuss how Blize Global can help your firm overcome challenges and reach new heights.
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
