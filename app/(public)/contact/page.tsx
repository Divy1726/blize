'use client';

import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  ArrowRight,
  Mail,
  Phone,
  Clock,
  CheckCircle,
  Loader2,
  Send,
  Building2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AnimatedSection, StaggerContainer, StaggerItem } from '@/components/shared/AnimatedSection';
import { COMPANY, SERVICE_OPTIONS, TEAM_SIZE_OPTIONS, COUNTRY_OPTIONS } from '@/lib/constants';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactFormSchema, proposalFormSchema, ContactFormSchema, ProposalFormSchema } from '@/lib/validators';
import { toast } from 'sonner';
import { createClient } from '@/lib/supabase/client';
import { createLead } from '@/lib/admin/leads';

function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serviceValue, setServiceValue] = useState('');
  const supabase = createClient();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm<ContactFormSchema>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      company: '',
      service: '',
      message: '',
    },
  });

  const onSubmit = async (data: ContactFormSchema) => {
    setIsSubmitting(true);
    try {
      const result = await createLead(supabase, {
        name: data.name,
        email: data.email,
        phone: data.phone || '',
        company: data.company || '',
        service: data.service,
        message: data.message,
        source: 'contact-page',
        type: 'contact',
      });

      if (!result.ok) {
        toast.error(result.error);
        return;
      }

      toast.success(
        result.mode === 'supabase'
          ? 'Message sent successfully! Your details are now in the admin dashboard.'
          : 'Message saved locally! It is visible in the admin dashboard demo mode.'
      );
      reset();
      setServiceValue('');
    } catch {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="contact-name">Full Name</Label>
          <Input
            id="contact-name"
            placeholder="John Doe"
            {...register('name')}
            className={errors.name ? 'border-red-500' : ''}
          />
          {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="contact-email">Email</Label>
          <Input
            id="contact-email"
            type="email"
            placeholder="john@example.com"
            {...register('email')}
            className={errors.email ? 'border-red-500' : ''}
          />
          {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="contact-phone">Phone (optional)</Label>
          <Input
            id="contact-phone"
            placeholder="+91 98765 43210"
            {...register('phone')}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="contact-company">Company (optional)</Label>
          <Input
            id="contact-company"
            placeholder="Your Company"
            {...register('company')}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="contact-service">Service Interested In</Label>
        <Select
          value={serviceValue}
          onValueChange={(value) => {
            const selectedValue = value ?? "";
            setServiceValue(selectedValue);
            setValue("service", selectedValue, {
              shouldValidate: true,
              shouldDirty: true,
            });
          }}
        >
          <SelectTrigger className={errors.service ? 'border-red-500' : ''}>
            <SelectValue placeholder="Select a service" />
          </SelectTrigger>
          <SelectContent>
            {SERVICE_OPTIONS.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.service && <p className="text-sm text-red-500">{errors.service.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="contact-message">Message</Label>
        <Textarea
          id="contact-message"
          placeholder="Tell us about your needs and how we can help..."
          rows={5}
          {...register('message')}
          className={errors.message ? 'border-red-500' : ''}
        />
        {errors.message && <p className="text-sm text-red-500">{errors.message.message}</p>}
      </div>

      <Button
        type="submit"
        size="lg"
        disabled={isSubmitting}
        className="w-full btn-gradient"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            Sending...
          </>
        ) : (
          <>
            Send Message
            <Send className="ml-2 h-5 w-5" />
          </>
        )}
      </Button>
    </form>
  );
}

function ProposalForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [teamSizeValue, setTeamSizeValue] = useState('');
  const [countryValue, setCountryValue] = useState('');
  const [serviceValue, setServiceValue] = useState('');
  const supabase = createClient();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm<ProposalFormSchema>({
    resolver: zodResolver(proposalFormSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      company: '',
      teamSize: '',
      country: '',
      service: '',
      message: '',
    },
  });

  const onSubmit = async (data: ProposalFormSchema) => {
    setIsSubmitting(true);
    try {
      const result = await createLead(supabase, {
        name: data.name,
        email: data.email,
        phone: data.phone || '',
        company: data.company,
        service: data.service,
        message: data.message,
        team_size: data.teamSize,
        country: data.country,
        source: 'proposal-page',
        type: 'proposal',
      });

      if (!result.ok) {
        toast.error(result.error);
        return;
      }

      toast.success(
        result.mode === 'supabase'
          ? 'Proposal request submitted! It is now available in the admin dashboard.'
          : 'Proposal saved locally! It is visible in the admin dashboard demo mode.'
      );
      reset();
      setTeamSizeValue('');
      setCountryValue('');
      setServiceValue('');
    } catch {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="proposal-name">Full Name</Label>
          <Input
            id="proposal-name"
            placeholder="John Doe"
            {...register('name')}
            className={errors.name ? 'border-red-500' : ''}
          />
          {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="proposal-email">Email</Label>
          <Input
            id="proposal-email"
            type="email"
            placeholder="john@example.com"
            {...register('email')}
            className={errors.email ? 'border-red-500' : ''}
          />
          {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="proposal-phone">Phone (optional)</Label>
          <Input
            id="proposal-phone"
            placeholder="+91 98765 43210"
            {...register('phone')}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="proposal-company">Company</Label>
          <Input
            id="proposal-company"
            placeholder="Your Company"
            {...register('company')}
            className={errors.company ? 'border-red-500' : ''}
          />
          {errors.company && <p className="text-sm text-red-500">{errors.company.message}</p>}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="proposal-team-size">Team Size</Label>
          <Select
            value={teamSizeValue}
            onValueChange={(value) => {
              const selectedValue = value ?? "";
              setTeamSizeValue(selectedValue);
              setValue("teamSize", selectedValue, {
                shouldValidate: true,
                shouldDirty: true,
              });
            }}
          >
            <SelectTrigger className={errors.teamSize ? 'border-red-500' : ''}>
              <SelectValue placeholder="Select team size" />
            </SelectTrigger>
            <SelectContent>
              {TEAM_SIZE_OPTIONS.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.teamSize && <p className="text-sm text-red-500">{errors.teamSize.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="proposal-country">Country</Label>
          <Select
            value={countryValue}
            onValueChange={(value) => {
              const selectedValue = value ?? "";
              setCountryValue(selectedValue);
              setValue("country", selectedValue, {
                shouldValidate: true,
                shouldDirty: true,
              });
            }}
          >
            <SelectTrigger className={errors.country ? 'border-red-500' : ''}>
              <SelectValue placeholder="Select country" />
            </SelectTrigger>
            <SelectContent>
              {COUNTRY_OPTIONS.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.country && <p className="text-sm text-red-500">{errors.country.message}</p>}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="proposal-service">Service Interested In</Label>
        <Select
          value={serviceValue}
          onValueChange={(value) => {
            const selectedValue = value ?? "";
            setServiceValue(selectedValue);
            setValue("service", selectedValue, {
              shouldValidate: true,
              shouldDirty: true,
            });
          }}
        >
          <SelectTrigger className={errors.service ? 'border-red-500' : ''}>
            <SelectValue placeholder="Select a service" />
          </SelectTrigger>
          <SelectContent>
            {SERVICE_OPTIONS.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.service && <p className="text-sm text-red-500">{errors.service.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="proposal-message">Tell Us About Your Needs</Label>
        <Textarea
          id="proposal-message"
          placeholder="Please describe your current challenges, the services you're interested in, and your timeline..."
          rows={5}
          {...register('message')}
          className={errors.message ? 'border-red-500' : ''}
        />
        {errors.message && <p className="text-sm text-red-500">{errors.message.message}</p>}
      </div>

      <Button
        type="submit"
        size="lg"
        disabled={isSubmitting}
        className="w-full btn-gradient"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            Submitting...
          </>
        ) : (
          <>
            Request Proposal
            <ArrowRight className="ml-2 h-5 w-5" />
          </>
        )}
      </Button>
    </form>
  );
}

function ContactContent() {
  const searchParams = useSearchParams();
  const defaultTab = searchParams.get('type') === 'proposal' ? 'proposal' : 'contact';

  return (
    <>
      {/* Hero */}
      <section className="hero-shell">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center max-w-4xl mx-auto">
            <Badge className="eyebrow-badge">
              Get In Touch
            </Badge>
            <h1 className="hero-title mb-6">
              Let&apos;s Start a{' '}
              <span className="hero-highlight">Conversation</span>
            </h1>
            <p className="hero-copy max-w-3xl mx-auto">
              Whether you have a question, need a proposal, or want to schedule a consultation, we&apos;re here to help.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section-padding">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Contact Info */}
            <AnimatedSection>
              <div className="mb-8">
                <h2 className="text-3xl font-bold tracking-tight text-[#0F172A] mb-4">
                  How Can We Help?
                </h2>
                <p className="text-lg text-[#64748B]">
                  Our team is ready to answer your questions and help you find the right solution for your firm.
                </p>
              </div>

              <div className="space-y-6 mb-8">
                <Card className="premium-card">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0">
                        <Mail className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-[#0F172A] mb-1">Email Us</h3>
                        <a href={`mailto:${COMPANY.email}`} className="text-[#64748B] hover:text-blue-600 transition-colors">
                          {COMPANY.email}
                        </a>
                        <p className="text-sm text-[#94A3B8] mt-1">We typically respond within 24 hours</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="premium-card">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-cyan-50 flex items-center justify-center flex-shrink-0">
                        <Phone className="h-6 w-6 text-cyan-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-[#0F172A] mb-1">Call Us</h3>
                        <a href={`tel:${COMPANY.phone}`} className="text-[#64748B] hover:text-blue-600 transition-colors">
                          {COMPANY.phone}
                        </a>
                        <p className="text-sm text-[#94A3B8] mt-1">Mon-Fri, 9am-6pm EST</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="premium-card">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0">
                        <Building2 className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-[#0F172A] mb-1">Visit Us</h3>
                        <p className="text-[#64748B]">{COMPANY.location}</p>
                        <p className="text-sm text-[#94A3B8] mt-1">By appointment only</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="premium-panel p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Clock className="h-5 w-5 text-blue-600" />
                  <h3 className="font-semibold text-[#0F172A]">Response Time</h3>
                </div>
                <ul className="space-y-2 text-sm text-[#64748B]">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-emerald-500" />
                    Initial response within 24 hours
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-emerald-500" />
                    Proposals delivered within 48 hours
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-emerald-500" />
                    Urgent requests prioritized
                  </li>
                </ul>
              </div>
            </AnimatedSection>

            {/* Forms */}
            <AnimatedSection direction="right">
              <Tabs defaultValue={defaultTab} className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-8">
                  <TabsTrigger value="contact">Send Message</TabsTrigger>
                  <TabsTrigger value="proposal">Request Proposal</TabsTrigger>
                </TabsList>
                <TabsContent value="contact">
                  <Card className="premium-card">
                    <CardContent className="p-8">
                      <ContactForm />
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="proposal">
                  <Card className="premium-card">
                    <CardContent className="p-8">
                      <ProposalForm />
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Why Reach Out */}
      <section className="section-padding section-tone-dark text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center max-w-3xl mx-auto mb-16">
            <Badge className="mb-4 bg-white/10 text-white border-white/20">
              Why Reach Out
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
              What to Expect
            </h2>
            <p className="text-lg text-[#94A3B8]">
              A consultation with Blize Global is a conversation about your goals, not a sales pitch.
            </p>
          </AnimatedSection>

          <StaggerContainer className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Discovery Call',
                description: 'We learn about your firm, your challenges, and what success looks like for you.',
              },
              {
                title: 'Custom Solution',
                description: 'We recommend services tailored to your specific needs and budget.',
              },
              {
                title: 'Clear Next Steps',
                description: 'You receive a detailed proposal with pricing, timeline, and scope.',
              },
            ].map((item) => (
              <StaggerItem key={item.title}>
                <Card className="premium-card-dark h-full">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                    <p className="text-[#94A3B8]">{item.description}</p>
                  </CardContent>
                </Card>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>
    </>
  );
}

export default function ContactPage() {
  return (
    <Suspense fallback={<div className="min-h-screen" />}>
      <ContactContent />
    </Suspense>
  );
}
