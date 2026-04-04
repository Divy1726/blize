'use client';

import { useEffect, useEffectEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Search,
  Filter,
  Download,
  MoreHorizontal,
  ArrowUpDown,
  Eye,
  Trash2,
  CheckCircle,
  DatabaseZap,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { createClient } from '@/lib/supabase/client';
import { toast } from 'sonner';
import { Skeleton } from '@/components/ui/skeleton';
import type { Lead } from '@/types';
import {
  DEMO_STORAGE_KEY,
  getLeadDisplayName,
  getLeadInitials,
  loadLeads,
  removeLead,
  saveLeadStatus,
  type LeadsDataMode,
} from '@/lib/admin/leads';

const statusOptions = [
  { value: 'all', label: 'All Status' },
  { value: 'new', label: 'New' },
  { value: 'reviewed', label: 'Reviewed' },
  { value: 'contacted', label: 'Contacted' },
  { value: 'closed', label: 'Closed' },
];

const typeOptions = [
  { value: 'all', label: 'All Types' },
  { value: 'contact', label: 'Contact' },
  { value: 'proposal', label: 'Proposal' },
  { value: 'career', label: 'Career' },
];

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [filteredLeads, setFilteredLeads] = useState<Lead[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [dataMode, setDataMode] = useState<LeadsDataMode>('supabase');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [sortField, setSortField] = useState<'created_at' | 'name'>('created_at');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const router = useRouter();
  const supabase = createClient();

  const fetchLeads = useEffectEvent(async () => {
    try {
      const { leads: nextLeads, mode, errorMessage } = await loadLeads(supabase);
      setDataMode(mode);
      setLeads(nextLeads);

      if (mode === 'demo' && errorMessage) {
        toast.info('Leads page is using demo data because live Supabase data is unavailable.');
      }
    } catch {
      toast.error('Failed to load leads');
    } finally {
      setIsLoading(false);
    }
  });

  const filterAndSortLeads = useEffectEvent(() => {
    let result = [...leads];

    // Apply search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (lead) =>
          getLeadDisplayName(lead).toLowerCase().includes(query) ||
          lead.email.toLowerCase().includes(query) ||
          lead.company?.toLowerCase().includes(query) ||
          lead.service?.toLowerCase().includes(query)
      );
    }

    // Apply status filter
    if (statusFilter !== 'all') {
      result = result.filter((lead) => lead.status === statusFilter);
    }

    // Apply type filter
    if (typeFilter !== 'all') {
      result = result.filter((lead) => lead.type === typeFilter);
    }

    // Apply sorting
    result.sort((a, b) => {
      let comparison = 0;
      if (sortField === 'created_at') {
        comparison = new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
      } else if (sortField === 'name') {
        comparison = getLeadDisplayName(a).localeCompare(getLeadDisplayName(b));
      }
      return sortDirection === 'desc' ? -comparison : comparison;
    });

    setFilteredLeads(result);
  });

  useEffect(() => {
    fetchLeads();
  }, []);

  useEffect(() => {
    filterAndSortLeads();
  }, [leads, searchQuery, statusFilter, typeFilter, sortField, sortDirection]);

  useEffect(() => {
    const handleStorage = (event: StorageEvent) => {
      if (event.key === DEMO_STORAGE_KEY) {
        fetchLeads();
      }
    };

    const handleVisibility = () => {
      if (document.visibilityState === 'visible') {
        fetchLeads();
      }
    };

    window.addEventListener('storage', handleStorage);
    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      window.removeEventListener('storage', handleStorage);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, []);

  const handleSort = (field: 'created_at' | 'name') => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const updateLeadStatus = async (id: string, status: Lead['status']) => {
    try {
      const result = await saveLeadStatus(supabase, dataMode, id, status);
      if (!result.ok) {
        toast.error(result.error);
        return;
      }
      setLeads(leads.map((lead) => (lead.id === id ? { ...lead, status } : lead)));
      toast.success(
        dataMode === 'demo'
          ? `Demo lead marked as ${status}`
          : `Lead marked as ${status}`
      );
    } catch {
      toast.error('Failed to update lead');
    }
  };

  const deleteLead = async (id: string) => {
    if (!confirm('Are you sure you want to delete this lead? This action cannot be undone.')) {
      return;
    }

    try {
      const result = await removeLead(supabase, dataMode, id);
      if (!result.ok) {
        toast.error(result.error);
        return;
      }
      setLeads(leads.filter((lead) => lead.id !== id));
      toast.success(dataMode === 'demo' ? 'Demo lead deleted successfully' : 'Lead deleted successfully');
    } catch {
      toast.error('Failed to delete lead');
    }
  };

  const exportToCSV = () => {
    const headers = ['Name', 'Email', 'Phone', 'Company', 'Service', 'Type', 'Status', 'Date'];
    const rows = filteredLeads.map((lead) => [
      getLeadDisplayName(lead),
      lead.email,
      lead.phone || '',
      lead.company || '',
      lead.service || '',
      lead.type,
      lead.status,
      new Date(lead.created_at).toLocaleDateString(),
    ]);

    const csv = [headers.join(','), ...rows.map((row) => row.join(','))].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `leads_export_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);

    toast.success('Leads exported successfully');
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
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />

      <main className="flex-1 lg:ml-64">
        {/* Header */}
        <header className="h-16 bg-white border-b border-[#E2E8F0] flex items-center justify-between px-4 lg:px-8">
          <h1 className="text-xl font-semibold text-[#0F172A]">Leads</h1>
          <Button variant="outline" size="sm" onClick={exportToCSV}>
            <Download className="h-4 w-4 mr-2" />
            Export CSV
          </Button>
        </header>

        {/* Content */}
        <div className="p-4 lg:p-8">
          {dataMode === 'demo' && (
            <div className="mb-6 flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-amber-900">
              <DatabaseZap className="mt-0.5 h-5 w-5 flex-shrink-0" />
              <div>
                <p className="font-medium">Demo mode active</p>
                <p className="text-sm text-amber-800">
                  Live leads could not be loaded from Supabase, so local demo data is being shown.
                </p>
              </div>
            </div>
          )}

          {/* Filters */}
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#94A3B8]" />
              <Input
                placeholder="Search by name, email, company..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-4">
              <Select
                value={statusFilter}
                onValueChange={(value) => {
                  const selectedValue = value ?? "";
                  setStatusFilter(selectedValue || 'all');
                }}
              >
                <SelectTrigger className="w-40">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {statusOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select
                value={typeFilter}
                onValueChange={(value) => {
                  const selectedValue = value ?? "";
                  setTypeFilter(selectedValue || 'all');
                }}
              >
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  {typeOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Table */}
          <div className="bg-white rounded-lg border border-[#E2E8F0] overflow-hidden">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>
                      <button
                        onClick={() => handleSort('name')}
                        className="flex items-center gap-1 hover:text-blue-600"
                      >
                        Name
                        <ArrowUpDown className="h-3 w-3" />
                      </button>
                    </TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Service</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>
                      <button
                        onClick={() => handleSort('created_at')}
                        className="flex items-center gap-1 hover:text-blue-600"
                      >
                        Date
                        <ArrowUpDown className="h-3 w-3" />
                      </button>
                    </TableHead>
                    <TableHead className="w-10"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isLoading ? (
                    [...Array(5)].map((_, i) => (
                      <TableRow key={i}>
                        <TableCell colSpan={7}>
                          <Skeleton className="h-12 w-full" />
                        </TableCell>
                      </TableRow>
                    ))
                  ) : filteredLeads.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-12">
                        <p className="text-[#64748B]">No leads found</p>
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredLeads.map((lead) => (
                      <TableRow
                        key={lead.id}
                        className="cursor-pointer hover:bg-[#F8FAFC]"
                        onClick={() => router.push(`/admin/leads/${lead.id}`)}
                      >
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-100 to-cyan-100 flex items-center justify-center">
                              <span className="text-xs font-semibold text-blue-600">
                                {getLeadInitials(lead)}
                              </span>
                            </div>
                            <div>
                              <p className="font-medium text-[#0F172A]">{getLeadDisplayName(lead)}</p>
                              {lead.company && (
                                <p className="text-sm text-[#94A3B8]">{lead.company}</p>
                              )}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <p className="text-sm">{lead.email}</p>
                          {lead.phone && <p className="text-sm text-[#94A3B8]">{lead.phone}</p>}
                        </TableCell>
                        <TableCell>
                          <span className="text-sm text-[#64748B]">
                            {lead.service || 'Not specified'}
                          </span>
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary" className={getTypeColor(lead.type)}>
                            {lead.type}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary" className={getStatusColor(lead.status)}>
                            {lead.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm text-[#64748B]">
                          {formatDate(lead.created_at)}
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger
                                className="h-8 w-8 inline-flex items-center justify-center rounded-md hover:bg-accent"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <MoreHorizontal className="h-4 w-4" />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem
                                onClick={(e) => {
                                  e.stopPropagation();
                                  router.push(`/admin/leads/${lead.id}`);
                                }}
                              >
                                <Eye className="h-4 w-4 mr-2" />
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={(e) => {
                                  e.stopPropagation();
                                  updateLeadStatus(lead.id, 'reviewed');
                                }}
                              >
                                <CheckCircle className="h-4 w-4 mr-2" />
                                Mark as Reviewed
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={(e) => {
                                  e.stopPropagation();
                                  updateLeadStatus(lead.id, 'contacted');
                                }}
                              >
                                <CheckCircle className="h-4 w-4 mr-2" />
                                Mark as Contacted
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={(e) => {
                                  e.stopPropagation();
                                  deleteLead(lead.id);
                                }}
                                className="text-red-600"
                              >
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </div>

          {/* Summary */}
          <div className="mt-4 text-sm text-[#64748B]">
            Showing {filteredLeads.length} of {leads.length} leads
          </div>
        </div>
      </main>
    </div>
  );
}
