'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { NAVIGATION } from '@/lib/constants';
import { BrandLogo } from '@/components/shared/BrandLogo';
import { cn } from '@/lib/utils';

// Type guard to check if a nav item has children
function hasChildren(item: typeof NAVIGATION.public[number]): item is typeof NAVIGATION.public[number] & { children: typeof NAVIGATION.public } {
  return 'children' in item && Array.isArray(item.children);
}

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileOpenDropdown, setMobileOpenDropdown] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (href: string) => pathname === href;

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 py-4'
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          className={cn(
            'flex h-18 items-center justify-between gap-4 rounded-full border px-4 shadow-[0_18px_40px_-32px_rgba(15,23,42,0.22)] transition-[background-color,border-color,box-shadow] duration-300 lg:h-22 lg:px-5',
            isScrolled
              ? 'border-slate-200 bg-white shadow-[0_20px_45px_-34px_rgba(15,23,42,0.28)]'
              : 'border-slate-200/90 bg-white/95'
          )}
        >
          {/* Logo */}
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <BrandLogo
              priority
              className="flex h-full shrink-0 items-center"
              imageClassName="block w-[172px] -translate-y-[-3px] object-contain sm:w-[148px] lg:w-[190px] lg:-translate-y-[-3px]"
            />
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden min-w-0 flex-1 items-center justify-center lg:flex">
            <div className="flex items-center gap-1.5 rounded-full border border-slate-200 bg-white p-1.5 shadow-[0_12px_28px_-24px_rgba(15,23,42,0.18)]">
            {NAVIGATION.public.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => hasChildren(item) && setActiveDropdown(item.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  href={item.href}
                  className={cn(
                    'group relative flex items-center gap-1 px-4 py-2.5 text-sm font-medium rounded-full transition-all duration-300',
                    isActive(item.href)
                      ? 'bg-white text-[#175fe8] shadow-[0_10px_18px_-14px_rgba(23,95,232,0.55)]'
                      : isScrolled
                        ? 'text-[#5c6b83] hover:bg-slate-50 hover:text-[#0F172A]'
                        : 'text-[#5c6b83] hover:bg-slate-50 hover:text-[#0F172A]'
                  )}
                >
                  {item.label}
                  <span className={cn(
                    'absolute inset-x-4 bottom-1 h-px origin-left scale-x-0 bg-gradient-to-r from-[#175fe8] to-[#08b7d8] transition-transform duration-300',
                    isActive(item.href) ? 'scale-x-100' : 'group-hover:scale-x-100'
                  )} />
                  {hasChildren(item) && (
                    <ChevronDown className={cn(
                      'h-4 w-4 transition-transform duration-300',
                      activeDropdown === item.label && 'rotate-180'
                    )} />
                  )}
                </Link>

                {/* Dropdown Menu */}
                <AnimatePresence>
                  {hasChildren(item) && activeDropdown === item.label && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 mt-3 w-72 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-premium-hover"
                    >
                      <div className="p-3">
                        {item.children!.map((child) => (
                          <Link
                            key={child.label}
                            href={child.href}
                            className={cn(
                              'flex items-center rounded-2xl px-4 py-3 text-sm transition-all duration-200',
                              isActive(child.href)
                                ? 'bg-[#175fe8]/6 text-[#175fe8]'
                                : 'text-[#5c6b83] hover:bg-[#f3f7fb] hover:text-[#0F172A]'
                            )}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
            </div>
          </nav>

          {/* CTA Button */}
          <div className="hidden shrink-0 lg:flex items-center">
            <Link href="/contact">
              <Button className="btn-gradient px-5 lg:px-6">
                Get Started
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden rounded-2xl border border-slate-200 bg-white p-2.5 text-[#0F172A] shadow-[0_12px_28px_-24px_rgba(15,23,42,0.18)] transition-colors hover:bg-slate-50"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mx-4 mt-3 overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-premium lg:hidden"
          >
              <div className="space-y-2 px-4 py-6">
              {NAVIGATION.public.map((item) => (
                <div key={item.label}>
                  {hasChildren(item) ? (
                    <div>
                      <button
                        type="button"
                        onClick={() => setMobileOpenDropdown(mobileOpenDropdown === item.label ? null : item.label)}
                        className={cn(
                          'w-full flex items-center justify-between rounded-2xl px-4 py-3 text-base font-medium transition-all',
                          isActive(item.href)
                            ? 'bg-[#175fe8]/6 text-[#175fe8]'
                            : 'text-[#5c6b83] hover:bg-[#F1F5F9] hover:text-[#0F172A]'
                        )}
                      >
                        <span>{item.label}</span>
                        <ChevronDown className={cn('h-4 w-4 transition-transform', mobileOpenDropdown === item.label && 'rotate-180')} />
                      </button>

                      {mobileOpenDropdown === item.label && (
                        <div className="ml-4 mt-2 space-y-1 border-l border-[#E2E8F0] pl-4">
                          {item.children.map((child) => (
                            <Link
                              key={child.label}
                              href={child.href}
                              onClick={() => {
                                setIsMobileMenuOpen(false);
                                setMobileOpenDropdown(null);
                              }}
                              className={cn(
                                'flex items-center rounded-xl px-4 py-2 text-sm transition-all',
                                isActive(child.href)
                                  ? 'bg-[#175fe8]/6 text-[#175fe8]'
                                  : 'text-[#64748B] hover:bg-[#F1F5F9] hover:text-[#0F172A]'
                              )}
                            >
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        setMobileOpenDropdown(null);
                      }}
                      className={cn(
                        'flex items-center rounded-2xl px-4 py-3 text-base font-medium transition-all',
                        isActive(item.href)
                          ? 'bg-[#175fe8]/6 text-[#175fe8]'
                          : 'text-[#5c6b83] hover:bg-[#F1F5F9] hover:text-[#0F172A]'
                      )}
                    >
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}
              <div className="pt-4">
                <Link href="/contact" onClick={() => { setIsMobileMenuOpen(false); setMobileOpenDropdown(null); }}>
                  <Button className="btn-gradient w-full">
                    Get Started
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
