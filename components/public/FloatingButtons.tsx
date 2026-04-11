'use client';

import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function FloatingButtons() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-4 items-end pointer-events-none">
      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.2 }}
            onClick={scrollToTop}
            className="w-12 h-12 rounded-full bg-[#0B1220] flex items-center justify-center text-white shadow-lg pointer-events-auto hover:bg-[#1E293B] transition-colors"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}

export function FloatingWhatsApp() {
  return (
    <div className="fixed bottom-6 left-6 z-50 pointer-events-auto">
      <a
        href="https://wa.me/919876543210"
        target="_blank"
        rel="noopener noreferrer"
        className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-110"
        aria-label="WhatsApp"
      >
        <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-40 animate-ping" />
        <svg
          viewBox="0 0 32 32"
          className="relative z-10 h-7 w-7"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M19.11 17.21c-.27-.14-1.6-.79-1.85-.88-.25-.09-.43-.14-.61.14-.18.27-.7.88-.86 1.06-.16.18-.31.2-.58.07-.27-.14-1.12-.41-2.14-1.32-.79-.71-1.33-1.58-1.49-1.85-.16-.27-.02-.42.12-.56.12-.12.27-.31.41-.46.14-.16.18-.27.27-.45.09-.18.05-.34-.02-.48-.07-.14-.61-1.47-.84-2.02-.22-.52-.44-.45-.61-.46h-.52c-.18 0-.48.07-.73.34-.25.27-.95.93-.95 2.27s.97 2.64 1.11 2.82c.14.18 1.91 2.91 4.62 4.08.65.28 1.16.45 1.56.58.65.21 1.25.18 1.72.11.52-.08 1.6-.65 1.82-1.28.23-.64.23-1.18.16-1.29-.07-.11-.25-.18-.52-.32Z" />
          <path d="M16.01 3.2c-7.06 0-12.77 5.7-12.77 12.72 0 2.24.59 4.42 1.71 6.33L3.2 28.8l6.73-1.72a12.82 12.82 0 0 0 6.08 1.54h.01c7.05 0 12.78-5.7 12.78-12.73 0-3.4-1.33-6.59-3.74-9-2.4-2.41-5.59-3.69-9.05-3.69Zm0 23.28h-.01a10.7 10.7 0 0 1-5.46-1.5l-.39-.23-3.99 1.02 1.07-3.89-.25-.4a10.57 10.57 0 0 1-1.64-5.59c0-5.88 4.81-10.67 10.72-10.67 2.86 0 5.54 1.1 7.55 3.11a10.56 10.56 0 0 1 3.12 7.54c0 5.88-4.81 10.67-10.72 10.67Z" />
        </svg>
      </a>
    </div>
  );
}
