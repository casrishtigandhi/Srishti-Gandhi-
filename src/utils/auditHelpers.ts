import { AUDIT_PROCEDURES, AUDIT_TABS } from '../data/procedures';
import {
  AuditProcedure,
  ProcedureEntry,
  ProcedureStatus,
  SectionSummary,
  StatusCounts,
  TabId,
} from '../types/audit';

export const STATUS_OPTIONS: ProcedureStatus[] = [
  'Completed',
  'In Progress',
  'Pending',
  'NA',
];

export const STATUS_COLORS: Record<ProcedureStatus, string> = {
  Completed: '#15803D',
  'In Progress': '#0284C7',
  Pending: '#D97706',
  NA: '#94A3B8',
};

export function parseTeamMembers(raw: string): string[] {
  const seen = new Set<string>();
  const result: string[] = [];
  for (const part of raw.split(',')) {
    const trimmed = part.trim();
    if (trimmed && !seen.has(trimmed.toLowerCase())) {
      seen.add(trimmed.toLowerCase());
      result.push(trimmed);
    }
  }
  return result;
}

export function getEffectiveStatus(entry?: ProcedureEntry): ProcedureStatus {
  if (!entry || !entry.status) {
    return 'Pending';
  }
  return entry.status;
}

export function resolveProcedureRemark(
  procedure: AuditProcedure,
  entry?: ProcedureEntry
): string {
  const status = getEffectiveStatus(entry);
  const customRemark = entry?.remarks?.trim() ?? '';

  if (customRemark.length > 0) {
    return customRemark;
  }

  if (status === 'Completed') {
    const performer = entry?.assignedTo?.trim() || 'Audit Team';
    return `${performer} did the work of ${procedure.text} and there were no adverse findings.`;
  }

  return '';
}

export function computeOverallCounts(
  entries: Record<string, ProcedureEntry>
): StatusCounts {
  const counts: StatusCounts = {
    Completed: 0,
    Pending: 0,
    'In Progress': 0,
    NA: 0,
    total: AUDIT_PROCEDURES.length,
  };

  for (const proc of AUDIT_PROCEDURES) {
    const status = getEffectiveStatus(entries[proc.id]);
    counts[status] += 1;
  }

  return counts;
}

export function computeSectionSummaries(
  entries: Record<string, ProcedureEntry>
): SectionSummary[] {
  return AUDIT_TABS.map((tab) => {
    const procs = AUDIT_PROCEDURES.filter((p) => p.tabId === tab.id);
    const counts: StatusCounts = {
      Completed: 0,
      Pending: 0,
      'In Progress': 0,
      NA: 0,
      total: procs.length,
    };

    for (const proc of procs) {
      const status = getEffectiveStatus(entries[proc.id]);
      counts[status] += 1;
    }

    return {
      tabId: tab.id,
      label: tab.label,
      counts,
    };
  });
}

export interface ValidationIssue {
  procedureId: string;
  tabId: TabId;
  tabLabel: string;
  subSection: string;
  text: string;
}

export function validateCompletedProcedures(
  entries: Record<string, ProcedureEntry>,
  validTeamMembers: string[]
): ValidationIssue[] {
  const issues: ValidationIssue[] = [];
  const memberSet = new Set(validTeamMembers.map((m) => m.trim()));

  for (const proc of AUDIT_PROCEDURES) {
    const entry = entries[proc.id];
    if (entry?.status === 'Completed') {
      const assigned = entry.assignedTo?.trim() ?? '';
      if (!assigned || (memberSet.size > 0 && !memberSet.has(assigned))) {
        const tabMeta = AUDIT_TABS.find((t) => t.id === proc.tabId);
        issues.push({
          procedureId: proc.id,
          tabId: proc.tabId,
          tabLabel: tabMeta?.label ?? proc.tabId,
          subSection: proc.subSection,
          text: proc.text,
        });
      }
    }
  }

  return issues;
}
