import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cookie Policy | Blize Global',
  description: 'Cookie Policy for Blize Global',
};

export default function CookiesPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-20 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold tracking-tight text-[#0F172A] mb-8">Cookie Policy</h1>
      <div className="prose prose-slate max-w-none">
        <p className="lead text-[#64748B]">Last updated: April 10, 2026</p>
        <p>
          This Cookie Policy explains how Blize Global uses cookies and similar technologies to recognize you
          when you visit our website. It explains what these technologies are and why we use them.
        </p>
        <h2 className="text-2xl font-semibold mt-8 mb-4 text-[#0F172A]">What are cookies?</h2>
        <p className="text-[#64748B]">
          Cookies are small data files that are placed on your computer or mobile device when you visit a
          website. Cookies are widely used by website owners in order to make their websites work, or to work
          more efficiently, as well as to provide reporting information.
        </p>
        <h2 className="text-2xl font-semibold mt-8 mb-4 text-[#0F172A]">Why do we use cookies?</h2>
        <p className="text-[#64748B]">
          We use first-party and third-party cookies for several reasons. Some cookies are required for technical
          reasons in order for our websites to operate, and we refer to these as "essential" or "strictly
          necessary" cookies.
        </p>
      </div>
    </div>
  );
}
