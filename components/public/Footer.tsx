'use client';

import Link from 'next/link';
import { Mail, Phone, MapPin } from 'lucide-react';
import { COMPANY, NAVIGATION } from '@/lib/constants';
import { Separator } from '@/components/ui/separator';
import { BrandLogo } from '@/components/shared/BrandLogo';

export function Footer() {
  const currentYear = new Date().getFullYear();

  // Get service links from navigation
  const serviceLinks = NAVIGATION.public.find(item => item.label === 'Services')?.children || [];

  return (
    <footer className="relative overflow-hidden section-tone-dark text-white">
      <div className="absolute inset-0 grid-sheen opacity-[0.08]" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      {/* Main Footer */}
      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="mb-12 rounded-[2rem] border border-white/10 bg-white/6 p-6 sm:p-8 shadow-[0_24px_90px_-34px_rgba(2,6,23,0.9)] lg:p-10">
          <div className="grid grid-cols-1 gap-10 sm:gap-12 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {/* Brand Column */}
            <div className="lg:col-span-1">
              <BrandLogo className="mb-6" imageClassName="w-[180px] sm:w-[200px]" />
            <p className="mb-6 max-w-xs text-sm leading-7 text-[#9FB0C7]">
              {COMPANY.description}
            </p>
            <div className="mb-8 flex items-center gap-4">
              <a
                href={COMPANY.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-[#94A3B8] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#2563EB] hover:text-white"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a
                href={COMPANY.social.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-[#94A3B8] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#06B6D4] hover:text-white"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              </div>
              <div className="dark-chip">Trusted by 100+ accounting firms</div>
            </div>

          {/* Services Column */}
            <div>
              <h3 className="mb-6 text-sm font-semibold uppercase tracking-[0.2em] text-white/90">
              Services
            </h3>
            <ul className="space-y-3">
              {serviceLinks.slice(0, 6).map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#9FB0C7] transition-colors duration-300 hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            </div>

          {/* Company Column */}
            <div>
              <h3 className="mb-6 text-sm font-semibold uppercase tracking-[0.2em] text-white/90">
              Company
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="text-sm text-[#9FB0C7] transition-colors duration-300 hover:text-white">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/case-studies" className="text-sm text-[#9FB0C7] transition-colors duration-300 hover:text-white">
                  Case Studies
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-sm text-[#9FB0C7] transition-colors duration-300 hover:text-white">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-sm text-[#9FB0C7] transition-colors duration-300 hover:text-white">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-[#9FB0C7] transition-colors duration-300 hover:text-white">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="text-sm text-[#9FB0C7] transition-colors duration-300 hover:text-white">
                  Privacy Policy
                </Link>
              </li>
            </ul>
            </div>

          {/* Contact Column */}
            <div>
              <h3 className="mb-6 text-sm font-semibold uppercase tracking-[0.2em] text-white/90">
              Contact
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-[#2563EB] mt-0.5" />
                <a
                  href={`mailto:${COMPANY.email}`}
                  className="text-sm text-[#9FB0C7] transition-colors duration-300 hover:text-white"
                >
                  {COMPANY.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-[#2563EB] mt-0.5" />
                <a
                  href={`tel:${COMPANY.phone}`}
                  className="text-sm text-[#9FB0C7] transition-colors duration-300 hover:text-white"
                >
                  {COMPANY.phone}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-[#2563EB] mt-0.5" />
                <span className="text-sm text-[#9FB0C7]">
                  {COMPANY.location}
                </span>
              </li>
            </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <Separator className="bg-white/10" />
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-[#70829C]">
            &copy; {currentYear} {COMPANY.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/privacy-policy" className="text-sm text-[#70829C] transition-colors hover:text-white">
              Privacy
            </Link>
            <Link href="#" className="text-sm text-[#70829C] transition-colors hover:text-white">
              Terms
            </Link>
            <Link href="#" className="text-sm text-[#70829C] transition-colors hover:text-white">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
