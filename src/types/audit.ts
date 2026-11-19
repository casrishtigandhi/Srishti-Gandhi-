export type FinancialYear = 'FY 2024-25' | 'FY 2025-26' | 'FY 2026-27';

export type ProcedureStatus = 'Completed' | 'Pending' | 'In Progress' | 'NA';

export type TabId =
  | 'balance-sheet'
  | 'profit-and-loss'
  | 'accounting-standard-compliance'
  | 'gst-compliance'
  | 'other-compliances';

export interface AuditTabMeta {
  id: TabId;
  label: string;
  description: string;
}

export interface AuditProcedure {
  id: string;
  tabId: TabId;
  subSection: string;
  text: string;
}

export interface ProcedureEntry {
  status: ProcedureStatus | '';
  assignedTo: string;
  remarks: string;
}

export interface EngagementHeader {
  auditeeName: string;
  financialYear: FinancialYear;
  teamMembersRaw: string;
}

export interface StatusCounts {
  Completed: number;
  Pending: number;
  'In Progress': number;
  NA: number;
  total: number;
}

export interface SectionSummary {
  tabId: TabId;
  label: string;
  counts: StatusCounts;
}
