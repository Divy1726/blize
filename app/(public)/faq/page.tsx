'use client';

import { useState } from 'react';
import { Search } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { AnimatedSection } from '@/components/shared/AnimatedSection';
import { FAQS } from '@/lib/constants';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFAQs = searchQuery
    ? FAQS.filter(
        (faq) =>
          faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : FAQS;

  const categories = [...new Set(FAQS.map((faq) => faq.category))];

  return (
    <>
      {/* Hero */}
      <section className="hero-shell">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center">
            <Badge className="eyebrow-badge">
              FAQ
            </Badge>
            <h1 className="hero-title mb-6">
              Frequently Asked{' '}
              <span className="hero-highlight">Questions</span>
            </h1>
            <p className="text-lg sm:text-xl text-[#64748B] leading-relaxed max-w-3xl mx-auto mb-8">
              Everything you need to know about working with Blize Global. Can&apos;t find what you&apos;re looking for? Reach out to our team.
            </p>

            {/* Search */}
            <div className="relative max-w-xl mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[#94A3B8]" />
              <Input
                type="text"
                placeholder="Search for answers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 py-6 text-lg"
              />
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="section-padding">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          {searchQuery ? (
            // Search Results
            <div>
              <h2 className="text-xl font-semibold text-[#0F172A] mb-6">
                Search Results ({filteredFAQs.length} found)
              </h2>
              <Accordion type="single" collapsible className="w-full">
                {filteredFAQs.map((faq) => (
                  <AccordionItem
                    key={faq.id}
                    value={faq.id}
                    className="premium-card mb-4 px-6 data-[state=open]:border-blue-200"
                  >
                    <AccordionTrigger className="text-left text-[#0F172A] font-medium hover:no-underline py-4">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-[#64748B] pb-4">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
              {filteredFAQs.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-[#64748B]">
                    No results found. Try a different search term or{' '}
                    <Link href="/contact" className="text-blue-600 hover:underline">
                      contact us
                    </Link>
                    .
                  </p>
                </div>
              )}
            </div>
          ) : (
            // Category Grouped FAQs
            <div className="space-y-12">
              {categories.map((category) => {
                const categoryFAQs = FAQS.filter((faq) => faq.category === category);
                return (
                  <AnimatedSection key={category}>
                    <h2 className="text-2xl font-bold text-[#0F172A] mb-6">{category}</h2>
                    <Accordion type="single" collapsible className="w-full">
                      {categoryFAQs.map((faq) => (
                        <AccordionItem
                          key={faq.id}
                          value={faq.id}
                          className="premium-card mb-4 px-6 data-[state=open]:border-blue-200"
                        >
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
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding section-tone">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <h2 className="text-3xl font-bold tracking-tight text-[#0F172A] mb-4">
              Still Have Questions?
            </h2>
            <p className="text-lg text-[#64748B] mb-8 max-w-2xl mx-auto">
              Our team is here to help. Reach out and we&apos;ll get back to you within 24 hours.
            </p>
            <Link href="/contact">
              <Button size="lg" className="btn-gradient px-8">
                Contact Us
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
