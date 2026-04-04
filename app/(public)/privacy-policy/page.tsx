'use client';

import { AnimatedSection } from '@/components/shared/AnimatedSection';
import { COMPANY } from '@/lib/constants';

export default function PrivacyPolicyPage() {
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <>
      {/* Hero */}
      <section className="hero-shell">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center">
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-[#0F172A] leading-tight mb-6">
              Privacy Policy
            </h1>
            <p className="text-lg text-[#64748B]">
              Last updated: {currentDate}
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="premium-panel prose prose-lg max-w-none p-8 text-[#64748B] sm:p-10">
              <h2 className="text-2xl font-bold text-[#0F172A] mt-8 mb-4">1. Introduction</h2>
              <p className="mb-6">
                {COMPANY.name} (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) respects your privacy and is committed to protecting your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
              </p>

              <h2 className="text-2xl font-bold text-[#0F172A] mt-8 mb-4">2. Information We Collect</h2>
              <p className="mb-4">We collect information that you provide directly to us, including:</p>
              <ul className="list-disc list-inside mb-6 space-y-2">
                <li>Contact information (name, email address, phone number)</li>
                <li>Company information (business name, size, industry)</li>
                <li>Service preferences and requirements</li>
                <li>Communications and correspondence</li>
                <li>Any other information you choose to provide</li>
              </ul>

              <p className="mb-4">We also automatically collect certain information when you visit our website:</p>
              <ul className="list-disc list-inside mb-6 space-y-2">
                <li>Log data (IP address, browser type, pages visited)</li>
                <li>Device information</li>
                <li>Usage data and analytics</li>
                <li>Cookies and similar technologies</li>
              </ul>

              <h2 className="text-2xl font-bold text-[#0F172A] mt-8 mb-4">3. How We Use Your Information</h2>
              <p className="mb-4">We use the information we collect to:</p>
              <ul className="list-disc list-inside mb-6 space-y-2">
                <li>Provide, maintain, and improve our services</li>
                <li>Process transactions and send related information</li>
                <li>Communicate with you about our services, updates, and promotional offers</li>
                <li>Respond to your comments, questions, and requests</li>
                <li>Monitor and analyze trends, usage, and activities</li>
                <li>Detect, prevent, and address technical issues and fraudulent activities</li>
                <li>Comply with legal obligations</li>
              </ul>

              <h2 className="text-2xl font-bold text-[#0F172A] mt-8 mb-4">4. Information Sharing and Disclosure</h2>
              <p className="mb-6">
                We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this Privacy Policy. We may share information with:
              </p>
              <ul className="list-disc list-inside mb-6 space-y-2">
                <li>Service providers who perform services on our behalf</li>
                <li>Professional advisors (lawyers, accountants, insurers)</li>
                <li>Government authorities when required by law</li>
                <li>In connection with a business transfer or merger</li>
              </ul>

              <h2 className="text-2xl font-bold text-[#0F172A] mt-8 mb-4">5. Data Security</h2>
              <p className="mb-6">
                We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. These measures include encryption, access controls, and regular security assessments.
              </p>

              <h2 className="text-2xl font-bold text-[#0F172A] mt-8 mb-4">6. Your Rights and Choices</h2>
              <p className="mb-4">Depending on your location, you may have certain rights regarding your personal information, including:</p>
              <ul className="list-disc list-inside mb-6 space-y-2">
                <li>Access to your personal information</li>
                <li>Correction of inaccurate information</li>
                <li>Deletion of your personal information</li>
                <li>Restriction or objection to processing</li>
                <li>Data portability</li>
                <li>Withdrawal of consent</li>
              </ul>

              <h2 className="text-2xl font-bold text-[#0F172A] mt-8 mb-4">7. Cookies and Tracking Technologies</h2>
              <p className="mb-6">
                We use cookies and similar tracking technologies to track activity on our website and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, some parts of our website may not function properly without cookies.
              </p>

              <h2 className="text-2xl font-bold text-[#0F172A] mt-8 mb-4">8. Children&apos;s Privacy</h2>
              <p className="mb-6">
                Our services are not intended for individuals under the age of 18. We do not knowingly collect personal information from children. If you become aware that a child has provided us with personal information, please contact us immediately.
              </p>

              <h2 className="text-2xl font-bold text-[#0F172A] mt-8 mb-4">9. Changes to This Privacy Policy</h2>
              <p className="mb-6">
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the &quot;Last updated&quot; date. You are advised to review this Privacy Policy periodically for any changes.
              </p>

              <h2 className="text-2xl font-bold text-[#0F172A] mt-8 mb-4">10. Contact Us</h2>
              <p className="mb-6">
                If you have any questions about this Privacy Policy or our data practices, please contact us at:
              </p>
              <div className="rounded-2xl bg-[#F8FAFC] p-6">
                <p className="mb-2"><strong>{COMPANY.name}</strong></p>
                <p className="mb-2">Email: {COMPANY.email}</p>
                <p className="mb-2">Phone: {COMPANY.phone}</p>
                <p>Address: {COMPANY.location}</p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
