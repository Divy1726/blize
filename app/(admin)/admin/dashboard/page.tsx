'use client';

import { useEffect, useEffectEvent, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Users,
  TrendingUp,
  Clock,
  ArrowRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { createClient } from '@/lib/supabase/client';
import { toast } from 'sonner';
import type { Lead } from '@/types';
import { Skeleton } from '@/components/ui/skeleton';
import {
  getLeadDisplayName,
  getLeadInitials,
  loadLeads,
} from '@/lib/admin/leads';

export default function AdminDashboardPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    new: 0,
    reviewed: 0,
    thisMonth: 0,
  });
  const router = useRouter();
  const supabase = createClient();

  const fetchLeads = useEffectEvent(async () => {
    try {
      const { leads: leadsData } = await loadLeads(supabase);
      setLeads(leadsData);

      // Calculate stats
      const now = new Date();
      const thisMonth = leadsData.filter(
        (lead) => new Date(lead.created_at).getMonth() === now.getMonth()
      ).length;

      setStats({
        total: leadsData.length,
        new: leadsData.filter((l) => l.status === 'new').length,
        reviewed: leadsData.filter((l) => l.status === 'reviewed').length,
        thisMonth,
      });
    } catch {
      toast.error('Failed to load leads data');
    } finally {
      setIsLoading(false);
    }
  });

  useEffect(() => {
    fetchLeads();
  }, []);

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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const recentLeads = leads.slice(0, 5);

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      
      <main className="flex-1 lg:ml-64">
        {/* Header */}
        <header className="h-16 bg-white border-b border-[#E2E8F0] flex items-center justify-between px-4 lg:px-8">
          <h1 className="text-xl font-semibold text-[#0F172A]">Dashboard</h1>
          <div className="text-sm text-[#64748B]">
            Welcome back, Admin
          </div>
        </header>

        {/* Content */}
        <div className="p-4 lg:p-8">
          {/* Stats Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-[#64748B]">Total Leads</p>
                    {isLoading ? (
                      <Skeleton className="mt-1 h-8 w-16" />
                    ) : (
                      <p className="text-3xl font-bold text-[#0F172A]">{stats.total}</p>
                    )}
                  </div>
                  <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
                    <Users className="h-5 w-5 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-[#64748B]">New Leads</p>
                    {isLoading ? (
                      <Skeleton className="mt-1 h-8 w-16" />
                    ) : (
                      <p className="text-3xl font-bold text-[#0F172A]">{stats.new}</p>
                    )}
                  </div>
                  <div className="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center">
                    <TrendingUp className="h-5 w-5 text-amber-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-[#64748B]">Reviewed</p>
                    {isLoading ? (
                      <Skeleton className="mt-1 h-8 w-16" />
                    ) : (
                      <p className="text-3xl font-bold text-[#0F172A]">{stats.reviewed}</p>
                    )}
                  </div>
                  <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center">
                    <Clock className="h-5 w-5 text-emerald-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-[#64748B]">This Month</p>
                    {isLoading ? (
                      <Skeleton className="mt-1 h-8 w-16" />
                    ) : (
                      <p className="text-3xl font-bold text-[#0F172A]">{stats.thisMonth}</p>
                    )}
                  </div>
                  <div className="w-10 h-10 rounded-lg bg-cyan-50 flex items-center justify-center">
                    <TrendingUp className="h-5 w-5 text-cyan-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Leads */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-4">
              <CardTitle className="text-lg font-semibold text-[#0F172A]">Recent Leads</CardTitle>
              <Link href="/admin/leads">
                <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700">
                  View All
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="space-y-4">
                  {[...Array(5)].map((_, i) => (
                    <Skeleton key={i} className="h-16 w-full" />
                  ))}
                </div>
              ) : recentLeads.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-[#64748B]">No leads yet. Leads will appear here when forms are submitted.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {recentLeads.map((lead) => (
                    <div
                      key={lead.id}
                      onClick={() => router.push(`/admin/leads/${lead.id}`)}
                      className="flex items-center justify-between p-4 bg-[#F8FAFC] rounded-lg hover:bg-[#F1F5F9] cursor-pointer transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-100 to-cyan-100 flex items-center justify-center">
                          <span className="text-sm font-semibold text-blue-600">
                            {getLeadInitials(lead)}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium text-[#0F172A]">{getLeadDisplayName(lead)}</p>
                          <p className="text-sm text-[#64748B]">{lead.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <Badge variant="secondary" className={getStatusColor(lead.status)}>
                          {lead.status}
                        </Badge>
                        <span className="text-sm text-[#94A3B8] hidden sm:block">
                          {formatDate(lead.created_at)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
