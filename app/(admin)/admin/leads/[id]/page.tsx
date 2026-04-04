'use client';

import { useEffect, useEffectEvent, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft,
  Mail,
  Phone,
  Building2,
  Tag,
  MessageSquare,
  Clock,
  CheckCircle,
  XCircle,
  Trash2,
  Send,
  DatabaseZap,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { createClient } from '@/lib/supabase/client';
import { toast } from 'sonner';
import { Skeleton } from '@/components/ui/skeleton';
import type { Lead } from '@/types';
import {
  getLeadDisplayName,
  getLeadInitials,
  loadLeadById,
  removeLead,
  saveLeadStatus,
  type LeadsDataMode,
} from '@/lib/admin/leads';

const statusOptions = [
  { value: 'new', label: 'New' },
  { value: 'reviewed', label: 'Reviewed' },
  { value: 'contacted', label: 'Contacted' },
  { value: 'closed', label: 'Closed' },
];

export default function LeadDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [lead, setLead] = useState<Lead | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [note, setNote] = useState('');
  const [dataMode, setDataMode] = useState<LeadsDataMode>('supabase');
  const supabase = createClient();

  const fetchLead = useEffectEvent(async () => {
    try {
      const { lead: nextLead, mode, errorMessage } = await loadLeadById(supabase, String(params.id));
      setDataMode(mode);
      setLead(nextLead);

      if (!nextLead) {
        toast.error('Lead not found');
        router.push('/admin/leads');
        return;
      }

      if (mode === 'demo' && errorMessage) {
        toast.info('Lead detail is using demo data because live Supabase data is unavailable.');
      }
    } catch {
      toast.error('Failed to load lead details');
      router.push('/admin/leads');
    } finally {
      setIsLoading(false);
    }
  });

  useEffect(() => {
    fetchLead();
  }, [params.id]);

  const updateStatus = async (status: Lead['status']) => {
    try {
      const result = await saveLeadStatus(supabase, dataMode, String(params.id), status);
      if (!result.ok) {
        toast.error(result.error);
        return;
      }
      setLead(lead ? { ...lead, status } : null);
      toast.success(
        dataMode === 'demo'
          ? `Demo lead updated to ${status}`
          : `Status updated to ${status}`
      );
    } catch {
      toast.error('Failed to update status');
    }
  };

  const deleteLead = async () => {
    if (!confirm('Are you sure you want to delete this lead? This action cannot be undone.')) {
      return;
    }

    try {
      const result = await removeLead(supabase, dataMode, String(params.id));
      if (!result.ok) {
        toast.error(result.error);
        return;
      }

      toast.success(dataMode === 'demo' ? 'Demo lead deleted successfully' : 'Lead deleted successfully');
      router.push('/admin/leads');
    } catch {
      toast.error('Failed to delete lead');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'reviewed':
        return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'contacted':
        return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'closed':
        return 'bg-slate-100 text-slate-700 border-slate-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'contact':
        return 'bg-blue-50 text-blue-600';
      case 'proposal':
        return 'bg-purple-50 text-purple-600';
      case 'career':
        return 'bg-cyan-50 text-cyan-600';
      default:
        return 'bg-slate-50 text-slate-600';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    });
  };

  const serviceLabels: Record<string, string> = {
    'accounting-reporting': 'Accounting & Reporting',
    'advisory-consulting': 'Advisory & Consulting',
    'bookkeeping': 'Bookkeeping',
    'business-tax': 'Business & Income Tax',
    'ledger-review': 'Ledger Review',
    'outsourced-cfo': 'Outsourced CFO',
    'payroll': 'Payroll',
    'sales-tax': 'Sales & Use Tax',
    'multiple': 'Multiple Services',
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen">
        <AdminSidebar />
        <main className="flex-1 lg:ml-64 p-8">
          <Skeleton className="h-8 w-48 mb-8" />
          <Skeleton className="h-96 w-full" />
        </main>
      </div>
    );
  }

  if (!lead) {
    return null;
  }

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />

      <main className="flex-1 lg:ml-64">
        {/* Header */}
        <header className="h-16 bg-white border-b border-[#E2E8F0] flex items-center justify-between px-4 lg:px-8">
          <div className="flex items-center gap-4">
            <Link href="/admin/leads">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <h1 className="text-xl font-semibold text-[#0F172A]">Lead Details</h1>
          </div>
          <div className="flex items-center gap-3">
            <Select value={lead.status} onValueChange={(value) => value && updateStatus(value as Lead['status'])}>
              <SelectTrigger className="w-40">
                <Badge variant="secondary" className={getStatusColor(lead.status)}>
                  {lead.status}
                </Badge>
              </SelectTrigger>
              <SelectContent>
                {statusOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button variant="destructive" size="sm" onClick={deleteLead}>
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </Button>
          </div>
        </header>

        {/* Content */}
        <div className="p-4 lg:p-8">
          {dataMode === 'demo' && (
            <div className="mb-6 flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-amber-900">
              <DatabaseZap className="mt-0.5 h-5 w-5 flex-shrink-0" />
              <div>
                <p className="font-medium">Demo mode active</p>
                <p className="text-sm text-amber-800">
                  Live lead data could not be loaded from Supabase, so this record is coming from local demo data.
                </p>
              </div>
            </div>
          )}

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Left Column - Lead Info */}
            <div className="lg:col-span-2 space-y-6">
              {/* Main Info Card */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-100 to-cyan-100 flex items-center justify-center">
                        <span className="text-xl font-bold text-blue-600">
                          {getLeadInitials(lead)}
                        </span>
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-[#0F172A]">{getLeadDisplayName(lead)}</h2>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="secondary" className={getTypeColor(lead.type)}>
                            {lead.type.charAt(0).toUpperCase() + lead.type.slice(1)}
                          </Badge>
                          <span className="text-sm text-[#94A3B8]">
                            Submitted {formatDate(lead.created_at)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Separator className="my-6" />

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <Mail className="h-5 w-5 text-[#94A3B8]" />
                        <div>
                          <p className="text-sm text-[#94A3B8]">Email</p>
                          <a
                            href={`mailto:${lead.email}`}
                            className="text-[#0F172A] hover:text-blue-600"
                          >
                            {lead.email}
                          </a>
                        </div>
                      </div>

                      {lead.phone && (
                        <div className="flex items-center gap-3">
                          <Phone className="h-5 w-5 text-[#94A3B8]" />
                          <div>
                            <p className="text-sm text-[#94A3B8]">Phone</p>
                            <a
                              href={`tel:${lead.phone}`}
                              className="text-[#0F172A] hover:text-blue-600"
                            >
                              {lead.phone}
                            </a>
                          </div>
                        </div>
                      )}

                      {lead.company && (
                        <div className="flex items-center gap-3">
                          <Building2 className="h-5 w-5 text-[#94A3B8]" />
                          <div>
                            <p className="text-sm text-[#94A3B8]">Company</p>
                            <p className="text-[#0F172A]">{lead.company}</p>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="space-y-4">
                      {lead.service && (
                        <div className="flex items-center gap-3">
                          <Tag className="h-5 w-5 text-[#94A3B8]" />
                          <div>
                            <p className="text-sm text-[#94A3B8]">Service Interest</p>
                            <p className="text-[#0F172A]">
                              {serviceLabels[lead.service] || lead.service}
                            </p>
                          </div>
                        </div>
                      )}

                      {lead.team_size && (
                        <div className="flex items-center gap-3">
                          <Building2 className="h-5 w-5 text-[#94A3B8]" />
                          <div>
                            <p className="text-sm text-[#94A3B8]">Team Size</p>
                            <p className="text-[#0F172A]">{lead.team_size}</p>
                          </div>
                        </div>
                      )}

                      {lead.country && (
                        <div className="flex items-center gap-3">
                          <Tag className="h-5 w-5 text-[#94A3B8]" />
                          <div>
                            <p className="text-sm text-[#94A3B8]">Country</p>
                            <p className="text-[#0F172A]">
                              {lead.country === 'us' && 'United States'}
                              {lead.country === 'ca' && 'Canada'}
                              {lead.country === 'uk' && 'United Kingdom'}
                              {lead.country === 'au' && 'Australia'}
                              {lead.country === 'other' && 'Other'}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Message Card */}
              {lead.message && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <MessageSquare className="h-5 w-5" />
                      Message
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-[#64748B] whitespace-pre-wrap">{lead.message}</p>
                  </CardContent>
                </Card>
              )}

              {/* Notes Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    Internal Notes
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Textarea
                    placeholder="Add notes about this lead..."
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    rows={4}
                    className="mb-4"
                  />
                  <Button size="sm">
                    <Send className="h-4 w-4 mr-2" />
                    Save Note
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Actions */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button
                    className="w-full justify-start"
                    variant="outline"
                    onClick={() => window.open(`mailto:${lead.email}`, '_blank')}
                  >
                    <Mail className="h-4 w-4 mr-2" />
                    Send Email
                  </Button>
                  {lead.phone && (
                    <Button
                      className="w-full justify-start"
                      variant="outline"
                      onClick={() => window.open(`tel:${lead.phone}`, '_blank')}
                    >
                      <Phone className="h-4 w-4 mr-2" />
                      Call
                    </Button>
                  )}
                  <Button
                    className="w-full justify-start"
                    variant={lead.status === 'contacted' ? 'default' : 'outline'}
                    onClick={() => updateStatus('contacted')}
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Mark as Contacted
                  </Button>
                  <Button
                    className="w-full justify-start"
                    variant={lead.status === 'closed' ? 'default' : 'outline'}
                    onClick={() => updateStatus('closed')}
                  >
                    <XCircle className="h-4 w-4 mr-2" />
                    Mark as Closed
                  </Button>
                </CardContent>
              </Card>

              {/* Lead Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Lead Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-[#94A3B8]">Lead ID</span>
                    <span className="font-medium">{lead.id.slice(0, 8)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#94A3B8]">Submitted</span>
                    <span>{formatDate(lead.created_at)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#94A3B8]">Status</span>
                    <Badge variant="secondary" className={getStatusColor(lead.status)}>
                      {lead.status}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#94A3B8]">Type</span>
                    <Badge variant="secondary" className={getTypeColor(lead.type)}>
                      {lead.type}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
