import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service | Blize Global',
  description: 'Terms of Service for Blize Global',
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-20 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold tracking-tight text-[#0F172A] mb-8">Terms of Service</h1>
      <div className="prose prose-slate max-w-none">
        <p className="lead text-[#64748B]">Last updated: April 10, 2026</p>
        <p>
          Welcome to Blize Global. These Terms of Service outline the rules and regulations for the use of
          our website and services.
        </p>
        <h2 className="text-2xl font-semibold mt-8 mb-4 text-[#0F172A]">1. Terms</h2>
        <p className="text-[#64748B]">
          By accessing this website, we assume you accept these terms of service in full. Do not continue to
          use Blize Global's website if you do not accept all of the terms and conditions stated on this page.
        </p>
        <h2 className="text-2xl font-semibold mt-8 mb-4 text-[#0F172A]">2. License</h2>
        <p className="text-[#64748B]">
          Unless otherwise stated, Blize Global and/or its licensors own the intellectual property rights for
          all material on Blize Global. All intellectual property rights are reserved.
        </p>
      </div>
    </div>
  );
}
