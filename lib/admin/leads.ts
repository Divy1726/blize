import type { SupabaseClient } from '@supabase/supabase-js';
import type { CreateLeadInput, Lead } from '@/types';

export const DEMO_STORAGE_KEY = 'finova_admin_demo_leads';

const demoLeadsSeed: Lead[] = [
  {
    id: 'demo-lead-1',
    name: 'Sarah Mitchell',
    email: 'sarah@mitchellcpa.com',
    phone: '+1 (555) 201-4491',
    company: 'Mitchell & Associates CPA',
    service: 'accounting-reporting',
    message: 'We need overflow accounting support for quarterly closes and reporting.',
    type: 'proposal',
    status: 'new',
    created_at: new Date('2026-03-28T14:20:00Z').toISOString(),
    updated_at: new Date('2026-03-28T14:20:00Z').toISOString(),
  },
  {
    id: 'demo-lead-2',
    name: 'David Chen',
    email: 'david@northwoodfg.com',
    phone: '+1 (555) 778-2201',
    company: 'Northwood Financial Group',
    service: 'outsourced-cfo',
    message: 'Interested in fractional CFO support for board reporting and planning.',
    type: 'contact',
    status: 'reviewed',
    created_at: new Date('2026-03-22T09:05:00Z').toISOString(),
    updated_at: new Date('2026-03-23T10:15:00Z').toISOString(),
  },
  {
    id: 'demo-lead-3',
    name: 'Jennifer Walsh',
    email: 'jennifer@walshtax.com',
    company: 'Walsh Tax Advisors',
    service: 'bookkeeping',
    message: 'Looking for bookkeeping help ahead of tax season.',
    type: 'proposal',
    status: 'contacted',
    created_at: new Date('2026-03-14T18:40:00Z').toISOString(),
    updated_at: new Date('2026-03-16T11:00:00Z').toISOString(),
  },
  {
    id: 'demo-lead-4',
    name: 'Michael Torres',
    email: 'michael@growthstageacct.com',
    company: 'GrowthStage Accounting',
    service: 'multiple',
    message: 'Would love a proposal covering bookkeeping and payroll support.',
    type: 'contact',
    status: 'closed',
    created_at: new Date('2026-02-26T12:00:00Z').toISOString(),
    updated_at: new Date('2026-03-01T08:30:00Z').toISOString(),
  },
];

export type LeadsDataMode = 'supabase' | 'demo';

function asNonEmptyString(value: unknown, fallback = '') {
  return typeof value === 'string' && value.trim() ? value.trim() : fallback;
}

function sanitizeLead(record: Partial<Lead> & { id?: string | number | null }): Lead {
  const createdAt = asNonEmptyString(record.created_at, new Date(0).toISOString());
  const updatedAt = asNonEmptyString(record.updated_at);
  const email = asNonEmptyString(record.email, 'No email provided');

  return {
    id: asNonEmptyString(record.id, `lead-${Math.random().toString(36).slice(2, 10)}`),
    name: asNonEmptyString(record.name, 'Unknown Lead'),
    email,
    phone: asNonEmptyString(record.phone),
    company: asNonEmptyString(record.company),
    service: asNonEmptyString(record.service),
    source: asNonEmptyString(record.source),
    message: asNonEmptyString(record.message),
    team_size: asNonEmptyString(record.team_size),
    country: asNonEmptyString(record.country),
    position: asNonEmptyString(record.position),
    type: record.type === 'proposal' || record.type === 'career' ? record.type : 'contact',
    status:
      record.status === 'reviewed' ||
      record.status === 'contacted' ||
      record.status === 'closed'
        ? record.status
        : 'new',
    created_at: createdAt,
    updated_at: updatedAt || createdAt,
  };
}

export function getLeadDisplayName(lead: Pick<Lead, 'name' | 'email'>) {
  return asNonEmptyString(lead.name, asNonEmptyString(lead.email, 'Unknown Lead'));
}

export function getLeadInitials(lead: Pick<Lead, 'name' | 'email'>) {
  const label = getLeadDisplayName(lead);

  return label
    .split(/\s+/)
    .map((part) => part[0]?.toUpperCase())
    .filter(Boolean)
    .slice(0, 2)
    .join('');
}

function canUseStorage() {
  return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
}

export function getDemoLeads(): Lead[] {
  if (!canUseStorage()) {
    return demoLeadsSeed;
  }

  const stored = window.localStorage.getItem(DEMO_STORAGE_KEY);
  if (!stored) {
    window.localStorage.setItem(DEMO_STORAGE_KEY, JSON.stringify(demoLeadsSeed));
    return demoLeadsSeed;
  }

  try {
    const parsed = JSON.parse(stored) as Lead[];
    return parsed.length > 0 ? parsed.map((lead) => sanitizeLead(lead)) : demoLeadsSeed;
  } catch {
    window.localStorage.setItem(DEMO_STORAGE_KEY, JSON.stringify(demoLeadsSeed));
    return demoLeadsSeed;
  }
}

function saveDemoLeads(leads: Lead[]) {
  if (canUseStorage()) {
    window.localStorage.setItem(DEMO_STORAGE_KEY, JSON.stringify(leads));
  }
}

function normalizeLeadInput(input: CreateLeadInput): Lead {
  const timestamp = new Date().toISOString();
  return {
    id: typeof crypto !== 'undefined' && 'randomUUID' in crypto
      ? crypto.randomUUID()
      : `demo-${Date.now()}`,
    name: input.name,
    email: input.email,
    phone: input.phone || '',
    company: input.company || '',
    service: input.service || '',
    source: input.source || '',
    message: input.message || '',
    team_size: input.team_size || '',
    country: input.country || '',
    position: input.position || '',
    type: input.type,
    status: 'new',
    created_at: timestamp,
    updated_at: timestamp,
  };
}

export async function createLead(
  supabase: SupabaseClient,
  input: CreateLeadInput
): Promise<{ ok: true; mode: LeadsDataMode } | { ok: false; error: string }> {
  const demoLead = normalizeLeadInput(input);
  const mergedDemoLeads = [demoLead, ...getDemoLeads()].sort(
    (a, b) => +new Date(b.created_at) - +new Date(a.created_at)
  );
  saveDemoLeads(mergedDemoLeads);

  const { error } = await supabase.from('leads').insert({
    name: input.name,
    email: input.email,
    phone: input.phone || null,
    company: input.company || null,
    service: input.service || null,
    source: input.source || null,
    message: input.message || null,
    team_size: input.team_size || null,
    country: input.country || null,
    position: input.position || null,
    type: input.type,
    status: 'new',
  });

  if (error) {
    return { ok: true, mode: 'demo' };
  }

  return { ok: true, mode: 'supabase' };
}

export async function loadLeads(
  supabase: SupabaseClient
): Promise<{ leads: Lead[]; mode: LeadsDataMode; errorMessage?: string }> {
  const { data, error } = await supabase
    .from('leads')
    .select('*')
    .order('created_at', { ascending: false });

  if (!error) {
    return { leads: ((data as Lead[]) || []).map((lead) => sanitizeLead(lead)), mode: 'supabase' };
  }

  return {
    leads: getDemoLeads().sort((a, b) => +new Date(b.created_at) - +new Date(a.created_at)),
    mode: 'demo',
    errorMessage: getAdminErrorMessage(error),
  };
}

export async function loadLeadById(
  supabase: SupabaseClient,
  id: string
): Promise<{ lead: Lead | null; mode: LeadsDataMode; errorMessage?: string }> {
  const { data, error } = await supabase
    .from('leads')
    .select('*')
    .eq('id', id)
    .single();

  if (!error) {
    return { lead: sanitizeLead(data as Lead), mode: 'supabase' };
  }

  const demoLead = getDemoLeads().find((lead) => lead.id === id) ?? null;
  return {
    lead: demoLead,
    mode: 'demo',
    errorMessage: getAdminErrorMessage(error),
  };
}

export async function saveLeadStatus(
  supabase: SupabaseClient,
  mode: LeadsDataMode,
  id: string,
  status: Lead['status']
) {
  if (mode === 'demo') {
    const updated = getDemoLeads().map((lead) =>
      lead.id === id ? { ...lead, status, updated_at: new Date().toISOString() } : lead
    );
    saveDemoLeads(updated);
    return { ok: true as const };
  }

  const { error } = await supabase.from('leads').update({ status }).eq('id', id);
  if (error) {
    return { ok: false as const, error: getAdminErrorMessage(error) };
  }

  return { ok: true as const };
}

export async function removeLead(
  supabase: SupabaseClient,
  mode: LeadsDataMode,
  id: string
) {
  if (mode === 'demo') {
    const updated = getDemoLeads().filter((lead) => lead.id !== id);
    saveDemoLeads(updated);
    return { ok: true as const };
  }

  const { error } = await supabase.from('leads').delete().eq('id', id);
  if (error) {
    return { ok: false as const, error: getAdminErrorMessage(error) };
  }

  return { ok: true as const };
}

function getAdminErrorMessage(error: unknown) {
  if (typeof error === 'object' && error && 'message' in error && typeof error.message === 'string') {
    return error.message;
  }
  return 'Unable to reach Supabase. Showing demo data instead.';
}
