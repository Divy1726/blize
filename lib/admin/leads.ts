import type { SupabaseClient } from '@supabase/supabase-js';
import type { CreateLeadInput, Lead } from '@/types';

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

export async function createLead(
  supabase: SupabaseClient,
  input: CreateLeadInput
): Promise<{ ok: true } | { ok: false; error: string }> {
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
    return { ok: false, error: getAdminErrorMessage(error) };
  }

  return { ok: true };
}

export async function loadLeads(
  supabase: SupabaseClient
): Promise<{ leads: Lead[]; errorMessage?: string }> {
  const { data, error } = await supabase
    .from('leads')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    return { leads: [], errorMessage: getAdminErrorMessage(error) };
  }

  return { leads: ((data as Lead[]) || []).map((lead) => sanitizeLead(lead)) };
}

export async function loadLeadById(
  supabase: SupabaseClient,
  id: string
): Promise<{ lead: Lead | null; errorMessage?: string }> {
  const { data, error } = await supabase
    .from('leads')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    return { lead: null, errorMessage: getAdminErrorMessage(error) };
  }

  return { lead: sanitizeLead(data as Lead) };
}

export async function saveLeadStatus(
  supabase: SupabaseClient,
  id: string,
  status: Lead['status']
) {
  const { error } = await supabase.from('leads').update({ status }).eq('id', id);
  if (error) {
    return { ok: false as const, error: getAdminErrorMessage(error) };
  }

  return { ok: true as const };
}

export async function removeLead(supabase: SupabaseClient, id: string) {
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
  return 'Unable to reach Supabase.';
}
