'use client';

import { useState } from 'react';
import {
  ArrowRight,
  Heart,
  Zap,
  Users,
  Globe,
  Coffee,
  BookOpen,
  Award,
  Clock,
  MapPin,
  Loader2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AnimatedSection, StaggerContainer, StaggerItem } from '@/components/shared/AnimatedSection';
import { JOB_POSITIONS } from '@/lib/constants';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { careerFormSchema, CareerFormSchema } from '@/lib/validators';
import { toast } from 'sonner';
import { createClient } from '@/lib/supabase/client';
import { createLead } from '@/lib/admin/leads';

const culturePoints = [
  {
    icon: Heart,
    title: 'People First',
    description: 'We believe happy team members deliver exceptional client service.',
  },
  {
    icon: Zap,
    title: 'Move Fast',
    description: 'We embrace change and continuously improve our processes.',
  },
  {
    icon: Users,
    title: 'Collaborative',
    description: 'We win together through open communication and shared goals.',
  },
  {
    icon: Globe,
    title: 'Remote First',
    description: 'Work from anywhere with flexible schedules that fit your life.',
  },
];

const benefits = [
  { icon: Coffee, title: 'Flexible Schedule', description: 'Work when you\'re most productive' },
  { icon: BookOpen, title: 'Learning Budget', description: '$2,000 annual professional development' },
  { icon: Award, title: 'Performance Bonuses', description: 'Quarterly bonuses based on results' },
  { icon: Clock, title: 'Generous PTO', description: '20 days PTO + 10 paid holidays' },
  { icon: Globe, title: 'Remote Work', description: '100% remote with home office stipend' },
  { icon: Heart, title: 'Health Benefits', description: 'Medical, dental, and vision coverage' },
];

export default function CareersPage() {
  const [selectedPosition, setSelectedPosition] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const supabase = createClient();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm<CareerFormSchema>({
    resolver: zodResolver(careerFormSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      position: '',
      message: '',
    },
  });

  const onSubmit = async (data: CareerFormSchema) => {
    setIsSubmitting(true);
    try {
      const positionTitle =
        JOB_POSITIONS.find((job) => job.id === selectedPosition)?.title ??
        (selectedPosition === 'general' ? 'General Application' : selectedPosition);

      const result = await createLead(supabase, {
        name: data.name,
        email: data.email,
        phone: data.phone || '',
        position: positionTitle || '',
        message: data.message,
        source: 'careers-page',
        type: 'career',
      });

      if (!result.ok) {
        toast.error(result.error);
        return;
      }

      toast.success('Application submitted successfully! It is now visible in the admin dashboard.');
      reset();
      setSelectedPosition('');
      setValue('position', '', { shouldValidate: false, shouldDirty: false });
    } catch {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Hero */}
      <section className="hero-shell">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center max-w-4xl mx-auto">
            <Badge className="eyebrow-badge">
              Join Our Team
            </Badge>
            <h1 className="hero-title mb-6">
              Build Your Career With{' '}
              <span className="hero-highlight">Purpose</span>
            </h1>
            <p className="text-lg sm:text-xl text-[#64748B] leading-relaxed max-w-3xl mx-auto">
              Join a team of passionate accounting professionals who are transforming how firms deliver financial services. Work remotely, grow professionally, and make an impact.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Culture */}
      <section className="section-padding">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center max-w-3xl mx-auto mb-16">
            <Badge className="mb-4 bg-slate-100 text-slate-600 border-slate-200">
              Our Culture
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#0F172A] mb-4">
              What Makes Us Different
            </h2>
            <p className="text-lg text-[#64748B]">
              Our culture is built on trust, excellence, and genuine care for our team members.
            </p>
          </AnimatedSection>

          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {culturePoints.map((point) => (
              <StaggerItem key={point.title}>
                <Card className="premium-card h-full">
                  <CardContent className="p-6 text-center">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 flex items-center justify-center mx-auto mb-4">
                      <point.icon className="h-7 w-7 text-blue-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-[#0F172A] mb-2">{point.title}</h3>
                    <p className="text-sm text-[#64748B]">{point.description}</p>
                  </CardContent>
                </Card>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Benefits */}
      <section className="section-padding section-tone-dark text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center max-w-3xl mx-auto mb-16">
            <Badge className="mb-4 bg-white/10 text-white border-white/20">
              Benefits
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
              Perks & Benefits
            </h2>
            <p className="text-lg text-[#94A3B8]">
              We invest in our team with competitive compensation and comprehensive benefits.
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <AnimatedSection key={benefit.title} delay={index * 0.05}>
                <Card className="premium-card-dark h-full">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center flex-shrink-0">
                        <benefit.icon className="h-6 w-6 text-blue-400" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold mb-1">{benefit.title}</h3>
                        <p className="text-sm text-[#94A3B8]">{benefit.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="section-padding section-tone">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center max-w-3xl mx-auto mb-16">
            <Badge className="mb-4 bg-slate-100 text-slate-600 border-slate-200">
              Open Positions
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#0F172A] mb-4">
              Join Our Team
            </h2>
            <p className="text-lg text-[#64748B]">
              We&apos;re always looking for talented professionals to join our growing team.
            </p>
          </AnimatedSection>

          <div className="space-y-6">
            {JOB_POSITIONS.map((job, index) => (
              <AnimatedSection key={job.id} delay={index * 0.1}>
                <Card className="premium-card">
                  <CardContent className="p-6 lg:p-8">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-3 mb-3">
                          <h3 className="text-xl font-semibold text-[#0F172A]">{job.title}</h3>
                          <Badge variant="secondary" className="bg-blue-50 text-blue-700 border-blue-200">
                            {job.type.replace('-', ' ')}
                          </Badge>
                        </div>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-[#64748B] mb-4">
                          <span className="flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            {job.department}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            {job.location}
                          </span>
                          <span>Posted {new Date(job.postedAt).toLocaleDateString()}</span>
                        </div>
                        <p className="text-[#64748B] mb-4">{job.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {job.requirements.slice(0, 3).map((req) => (
                            <span key={req} className="text-xs bg-[#F1F5F9] text-[#64748B] px-3 py-1 rounded-full">
                              {req}
                            </span>
                          ))}
                        </div>
                      </div>
                      <Button
                        onClick={() => {
                          setSelectedPosition(job.id);
                          setValue('position', job.id, { shouldValidate: true, shouldDirty: true });
                        }}
                        className="btn-gradient whitespace-nowrap"
                      >
                        Apply Now
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="section-padding">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-12">
            <Badge className="mb-4 bg-blue-500/10 text-blue-600 border-blue-200">
              Apply Now
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight text-[#0F172A] mb-4">
              Submit Your Application
            </h2>
            <p className="text-lg text-[#64748B]">
              Tell us about yourself and why you&apos;d be a great fit for our team.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <Card className="premium-card">
              <CardContent className="p-8">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        placeholder="John Doe"
                        {...register('name')}
                        className={errors.name ? 'border-red-500' : ''}
                      />
                      {errors.name && (
                        <p className="text-sm text-red-500">{errors.name.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="john@example.com"
                        {...register('email')}
                        className={errors.email ? 'border-red-500' : ''}
                      />
                      {errors.email && (
                        <p className="text-sm text-red-500">{errors.email.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone (optional)</Label>
                    <Input
                      id="phone"
                      placeholder="+91 98765 43210"
                      {...register('phone')}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="position">Position</Label>
                    <Select
                      value={selectedPosition}
                      onValueChange={(value) => {
                        const selectedValue = value ?? "";
                        setSelectedPosition(selectedValue);
                        setValue('position', selectedValue, { shouldValidate: true, shouldDirty: true });
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a position" />
                      </SelectTrigger>
                      <SelectContent>
                        {JOB_POSITIONS.map((job) => (
                          <SelectItem key={job.id} value={job.id}>
                            {job.title}
                          </SelectItem>
                        ))}
                        <SelectItem value="general">General Application</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.position && (
                      <p className="text-sm text-red-500">{errors.position.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Cover Letter</Label>
                    <Textarea
                      id="message"
                      placeholder="Tell us why you're interested in this position and what makes you a great fit..."
                      rows={6}
                      {...register('message')}
                      className={errors.message ? 'border-red-500' : ''}
                    />
                    {errors.message && (
                      <p className="text-sm text-red-500">{errors.message.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="resume">Resume (PDF or Word)</Label>
                    <Input
                      id="resume"
                      type="file"
                      accept=".pdf,.doc,.docx"
                      {...register('resume')}
                      className="cursor-pointer"
                    />
                    <p className="text-xs text-[#64748B]">
                      Maximum file size: 5MB
                    </p>
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
                        Submit Application
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
