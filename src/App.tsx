import React, { useEffect, useMemo, useState } from 'react';
import {
  AlertTriangle,
  CheckCircle2,
  FileDown,
  Loader2,
  Search,
} from 'lucide-react';
import { OverviewInfographic } from './components/OverviewInfographic';
import { OfflineIndicator } from './components/OfflineIndicator';
import { ProcedureRow } from './components/ProcedureRow';
import { PWAInstallButton } from './components/PWAInstallButton';
import {
  AUDIT_PROCEDURES,
  AUDIT_TABS,
  FINANCIAL_YEARS,
} from './data/procedures';
import {
  EngagementHeader,
  FinancialYear,
  ProcedureEntry,
  ProcedureStatus,
  TabId,
} from './types/audit';
import {
  computeOverallCounts,
  computeSectionSummaries,
  parseTeamMembers,
  validateCompletedProcedures,
  ValidationIssue,
} from './utils/auditHelpers';
import { generateAuditWorkingPaperDocx } from './utils/docxGenerator';

const STORAGE_KEY = 'audit_working_paper_pro_v1';

const DEFAULT_HEADER: EngagementHeader = {
  auditeeName: '',
  financialYear: 'FY 2024-25',
  teamMembersRaw: '',
};

type WorkspaceView = 'checklist' | 'overview';
type StatusFilter = 'All' | 'Unmarked' | ProcedureStatus;

export default function App() {
  const [header, setHeader] = useState<EngagementHeader>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.header) return parsed.header;
      }
    } catch {
      // Ignore storage errors
    }
    return DEFAULT_HEADER;
  });

  const [entries, setEntries] = useState<Record<string, ProcedureEntry>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.entries) return parsed.entries;
      }
    } catch {
      // Ignore storage errors
    }
    return {};
  });

  const [activeView, setActiveView] = useState<WorkspaceView>('checklist');
  const [activeTab, setActiveTab] = useState<TabId>('balance-sheet');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('All');
  const [subSectionFilter, setSubSectionFilter] = useState<string>('All');
  const [validationErrors, setValidationErrors] = useState<ValidationIssue[]>([]);
  const [showValidationBanner, setShowValidationBanner] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [exportSuccessMessage, setExportSuccessMessage] = useState<string | null>(null);
  const [exportErrorMessage, setExportErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ header, entries }));
    } catch {
      // Ignore storage quota errors
    }
  }, [header, entries]);

  const teamMembers = useMemo(
    () => parseTeamMembers(header.teamMembersRaw),
    [header.teamMembersRaw]
  );

  const overallCounts = useMemo(
    () => computeOverallCounts(entries),
    [entries]
  );

  const sectionSummaries = useMemo(
    () => computeSectionSummaries(entries),
    [entries]
  );

  // Recompute validation issues live when banner is active so errors clear immediately as user fixes them
  const activeValidationIssues = useMemo(() => {
    if (!showValidationBanner) return [];
    return validateCompletedProcedures(entries, teamMembers);
  }, [showValidationBanner, entries, teamMembers]);

  const missingMemberSet = useMemo(
    () => new Set(activeValidationIssues.map((i) => i.procedureId)),
    [activeValidationIssues]
  );

  useEffect(() => {
    if (showValidationBanner && activeValidationIssues.length === 0) {
      setShowValidationBanner(false);
      setValidationErrors([]);
    }
  }, [showValidationBanner, activeValidationIssues]);

  const activeTabMeta = useMemo(
    () => AUDIT_TABS.find((t) => t.id === activeTab) ?? AUDIT_TABS[0],
    [activeTab]
  );

  const tabProcedures = useMemo(
    () => AUDIT_PROCEDURES.filter((p) => p.tabId === activeTab),
    [activeTab]
  );

  const subSectionsInTab = useMemo(() => {
    const seen = new Set<string>();
    const list: string[] = [];
    for (const p of tabProcedures) {
      if (!seen.has(p.subSection)) {
        seen.add(p.subSection);
        list.push(p.subSection);
      }
    }
    return list;
  }, [tabProcedures]);

  useEffect(() => {
    setSubSectionFilter('All');
  }, [activeTab]);

  const filteredProcedures = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return tabProcedures.filter((proc) => {
      if (subSectionFilter !== 'All' && proc.subSection !== subSectionFilter) {
        return false;
      }
      const entry = entries[proc.id];
      const currentStatus = entry?.status ?? '';
      if (statusFilter === 'Unmarked' && currentStatus !== '') {
        return false;
      }
      if (
        statusFilter !== 'All' &&
        statusFilter !== 'Unmarked' &&
        currentStatus !== statusFilter
      ) {
        return false;
      }
      if (q) {
        const hay = `${proc.subSection} ${proc.text} ${entry?.assignedTo ?? ''} ${entry?.remarks ?? ''}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [tabProcedures, subSectionFilter, statusFilter, searchQuery, entries]);

  const handleUpdateEntry = (
    procedureId: string,
    patch: Partial<ProcedureEntry>
  ) => {
    setExportSuccessMessage(null);
    setEntries((prev) => {
      const existing = prev[procedureId] ?? {
        status: '',
        assignedTo: '',
        remarks: '',
      };
      const updated = { ...existing, ...patch };
      if (updated.status === '' && !updated.assignedTo && !updated.remarks) {
        const clone = { ...prev };
        delete clone[procedureId];
        return clone;
      }
      return {
        ...prev,
        [procedureId]: updated,
      };
    });
  };

  const handleGenerateDocx = async () => {
    setExportSuccessMessage(null);
    setExportErrorMessage(null);

    const issues = validateCompletedProcedures(entries, teamMembers);
    if (issues.length > 0) {
      setValidationErrors(issues);
      setShowValidationBanner(true);
      setActiveView('checklist');
      const first = issues[0];
      setActiveTab(first.tabId);
      setStatusFilter('All');
      setSubSectionFilter('All');
      setSearchQuery('');
      setTimeout(() => {
        const el = document.getElementById(`proc-row-${first.procedureId}`);
        el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 80);
      return;
    }

    setShowValidationBanner(false);
    setValidationErrors([]);
    setIsGenerating(true);
    try {
      await generateAuditWorkingPaperDocx(header, entries);
      setExportSuccessMessage(
        `Working paper generated for ${header.auditeeName.trim() || 'Entity'} (${header.financialYear}).`
      );
    } catch (err) {
      setExportErrorMessage(
        err instanceof Error
          ? err.message
          : 'Unable to generate Word document. Please try again.'
      );
    } finally {
      setIsGenerating(false);
    }
  };

  const handleLoadSample = () => {
    const sampleMembers = 'Mr Amit Sharma, Ms Riya Gupta, CA Neha Das';
    const membersList = parseTeamMembers(sampleMembers);
    setHeader({
      auditeeName: 'Meridian Precision Components Pvt. Ltd.',
      financialYear: 'FY 2025-26',
      teamMembersRaw: sampleMembers,
    });

    const nextEntries: Record<string, ProcedureEntry> = {};
    AUDIT_PROCEDURES.forEach((proc, idx) => {
      const mod = idx % 10;
      const member = membersList[idx % membersList.length];
      if (mod <= 4) {
        nextEntries[proc.id] = {
          status: 'Completed',
          assignedTo: member,
          remarks:
            idx % 7 === 0
              ? `Verified against supporting schedules and ledger extract; W/P Ref: WP-${101 + idx}.`
              : '',
        };
      } else if (mod === 5 || mod === 6) {
        nextEntries[proc.id] = {
          status: 'In Progress',
          assignedTo: member,
          remarks: 'Awaiting signed management confirmation.',
        };
      } else if (mod === 7 || mod === 8) {
        nextEntries[proc.id] = {
          status: 'Pending',
          assignedTo: member,
          remarks: '',
        };
      } else {
        nextEntries[proc.id] = {
          status: 'NA',
          assignedTo: member,
          remarks: 'Not applicable to current reporting entity.',
        };
      }
    });

    setEntries(nextEntries);
    setShowValidationBanner(false);
    setValidationErrors([]);
    setExportSuccessMessage(null);
  };

  const handleReset = () => {
    setHeader(DEFAULT_HEADER);
    setEntries({});
    setSearchQuery('');
    setStatusFilter('All');
    setSubSectionFilter('All');
    setShowValidationBanner(false);
    setValidationErrors([]);
    setExportSuccessMessage(null);
    setExportErrorMessage(null);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore
    }
  };

  const jumpToIssue = (issue: ValidationIssue) => {
    setActiveView('checklist');
    setActiveTab(issue.tabId);
    setStatusFilter('All');
    setSubSectionFilter('All');
    setSearchQuery('');
    setTimeout(() => {
      const el = document.getElementById(`proc-row-${issue.procedureId}`);
      el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 80);
  };

  const activeSectionSummary = sectionSummaries.find(
    (s) => s.tabId === activeTab
  );

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      {/* Top Attribution Strip */}
      <div className="bg-[#0F2942] text-slate-100 text-xs font-medium py-1.5 px-4 sm:px-8 border-b border-slate-800/40">
        <div className="max-w-[1360px] mx-auto flex items-center justify-between gap-4">
          <span>Developed by CA Srishti Gandhi</span>
          <span className="hidden sm:inline text-slate-300">
            Statutory Audit Working Paper Generator
          </span>
        </div>
      </div>

      {/* Top Navigation Bar (3-zone contract) */}
      <header className="sticky top-0 z-30 bg-white border-b border-slate-200">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-8 h-16 flex items-center justify-between gap-4 sm:gap-8">
          {/* Zone 1: Single-line Brand Wordmark */}
          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              setActiveView('checklist');
            }}
            className="text-sm sm:text-lg font-bold tracking-tight text-slate-900 whitespace-nowrap truncate"
          >
            Audit Working Paper Pro
          </a>

          {/* Zone 2: Clean Single-Line Nav Links */}
          <nav
            aria-label="Primary navigation"
            className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600"
          >
            <button
              type="button"
              onClick={() => setActiveView('checklist')}
              className={`py-1 whitespace-nowrap shrink-0 border-b-2 transition-colors ${
                activeView === 'checklist'
                  ? 'text-slate-900 border-slate-900'
                  : 'border-transparent hover:text-slate-900'
              }`}
            >
              Checklist
            </button>
            <button
              type="button"
              onClick={() => setActiveView('overview')}
              className={`py-1 whitespace-nowrap shrink-0 border-b-2 transition-colors ${
                activeView === 'overview'
                  ? 'text-slate-900 border-slate-900'
                  : 'border-transparent hover:text-slate-900'
              }`}
            >
              Overview & Charts
            </button>
            <button
              type="button"
              onClick={handleLoadSample}
              className="py-1 whitespace-nowrap shrink-0 border-b-2 border-transparent hover:text-slate-900 transition-colors"
            >
              Load Sample
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="py-1 whitespace-nowrap shrink-0 border-b-2 border-transparent hover:text-slate-900 transition-colors"
            >
              Reset
            </button>
          </nav>

          {/* Zone 3: Primary Actions (Install App + Generate Word) */}
          <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
            <PWAInstallButton />
            <button
              type="button"
              onClick={handleGenerateDocx}
              disabled={isGenerating}
              className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-[#0F2942] rounded-md hover:bg-[#163859] disabled:opacity-60 transition-colors whitespace-nowrap shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#0F2942]"
            >
              {isGenerating ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <FileDown className="w-4 h-4" />
              )}
              <span className="sm:hidden">
                {isGenerating ? 'Wait...' : 'Export .docx'}
              </span>
              <span className="hidden sm:inline">
                {isGenerating ? 'Generating...' : 'Generate Word (.docx)'}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile view switcher */}
        <div className="md:hidden border-t border-slate-100 px-4 py-2 flex items-center gap-4 text-xs font-medium text-slate-600 overflow-x-auto">
          <button
            type="button"
            onClick={() => setActiveView('checklist')}
            className={`whitespace-nowrap shrink-0 ${
              activeView === 'checklist' ? 'text-slate-900 font-semibold' : ''
            }`}
          >
            Checklist
          </button>
          <button
            type="button"
            onClick={() => setActiveView('overview')}
            className={`whitespace-nowrap shrink-0 ${
              activeView === 'overview' ? 'text-slate-900 font-semibold' : ''
            }`}
          >
            Overview & Charts
          </button>
          <button
            type="button"
            onClick={handleLoadSample}
            className="whitespace-nowrap shrink-0"
          >
            Load Sample
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="whitespace-nowrap shrink-0"
          >
            Reset
          </button>
        </div>
      </header>

      <main className="flex-1 max-w-[1360px] w-full mx-auto px-4 sm:px-8 py-6 space-y-6">
        {/* Validation Error Alert (blocks Word generation when Completed procedure lacks team member) */}
        {showValidationBanner && activeValidationIssues.length > 0 && (
          <div
            role="alert"
            className="bg-red-50 border border-red-200 rounded-lg p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
          >
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-700 shrink-0 mt-0.5" />
              <div>
                <h2 className="text-sm font-semibold text-red-900">
                  Team member selection required for Completed procedures
                </h2>
                <p className="text-sm text-red-800 mt-0.5">
                  Please select who performed the work for{' '}
                  <span className="font-semibold font-mono-num">
                    {activeValidationIssues.length}
                  </span>{' '}
                  completed{' '}
                  {activeValidationIssues.length === 1 ? 'procedure' : 'procedures'}{' '}
                  before generating the Word working paper.
                  {teamMembers.length === 0 &&
                    ' Enter comma-separated team member names in the Engagement Details section first.'}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => jumpToIssue(activeValidationIssues[0])}
              className="px-3.5 py-2 text-xs font-semibold text-red-900 bg-white border border-red-300 rounded-md hover:bg-red-100 transition-colors whitespace-nowrap shrink-0 self-start sm:self-center"
            >
              Go to Procedure
            </button>
          </div>
        )}

        {/* Export Success / Error Feedback */}
        {exportSuccessMessage && (
          <div
            role="status"
            className="bg-emerald-50 border border-emerald-200 rounded-lg px-4 py-3 flex items-center justify-between gap-4"
          >
            <div className="flex items-center gap-2.5 text-sm text-emerald-900">
              <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
              <span>{exportSuccessMessage}</span>
            </div>
            <button
              type="button"
              onClick={() => setExportSuccessMessage(null)}
              className="text-xs font-medium text-emerald-800 hover:underline whitespace-nowrap"
            >
              Dismiss
            </button>
          </div>
        )}

        {exportErrorMessage && (
          <div
            role="alert"
            className="bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-sm text-red-800"
          >
            {exportErrorMessage}
          </div>
        )}

        {/* Engagement Header Details */}
        <section
          aria-labelledby="engagement-details-heading"
          className="bg-white border border-slate-200 rounded-lg p-5 sm:p-6"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 mb-5 border-b border-slate-100">
            <div>
              <h1
                id="engagement-details-heading"
                className="text-base font-semibold text-slate-900"
              >
                Engagement Details
              </h1>
              <p className="text-xs text-slate-500 mt-0.5">
                Header metadata included on the overview page and running headers of the Word working paper
              </p>
            </div>
            <div className="flex items-center gap-3 text-xs text-slate-600 font-mono-num">
              <span>Completed: {overallCounts.Completed}</span>
              <span aria-hidden="true">·</span>
              <span>In Progress: {overallCounts['In Progress']}</span>
              <span aria-hidden="true">·</span>
              <span>Pending: {overallCounts.Pending}</span>
              <span aria-hidden="true">·</span>
              <span>NA: {overallCounts.NA}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
            {/* Name of Auditee */}
            <div className="md:col-span-4">
              <label
                htmlFor="auditee-name"
                className="block text-xs font-semibold text-slate-700 mb-1.5"
              >
                Name of Auditee
              </label>
              <input
                id="auditee-name"
                type="text"
                value={header.auditeeName}
                onChange={(e) =>
                  setHeader((prev) => ({ ...prev, auditeeName: e.target.value }))
                }
                placeholder="e.g., Horizon Manufacturing Pvt. Ltd."
                className="w-full h-10 px-3 text-sm bg-white border border-slate-300 rounded-md text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10"
              />
            </div>

            {/* Financial Year */}
            <div className="md:col-span-3">
              <label
                htmlFor="financial-year"
                className="block text-xs font-semibold text-slate-700 mb-1.5"
              >
                Financial Year
              </label>
              <select
                id="financial-year"
                value={header.financialYear}
                onChange={(e) =>
                  setHeader((prev) => ({
                    ...prev,
                    financialYear: e.target.value as FinancialYear,
                  }))
                }
                className="w-full h-10 px-3 text-sm bg-white border border-slate-300 rounded-md text-slate-900 focus:outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10"
              >
                {FINANCIAL_YEARS.map((fy) => (
                  <option key={fy} value={fy}>
                    {fy}
                  </option>
                ))}
              </select>
            </div>

            {/* Audit Team Members (comma separated) */}
            <div className="md:col-span-5">
              <label
                htmlFor="team-members"
                className="block text-xs font-semibold text-slate-700 mb-1.5"
              >
                Audit Team Members (comma separated)
              </label>
              <input
                id="team-members"
                type="text"
                value={header.teamMembersRaw}
                onChange={(e) =>
                  setHeader((prev) => ({
                    ...prev,
                    teamMembersRaw: e.target.value,
                  }))
                }
                placeholder="Mr Amit Sharma, Ms Riya Gupta, CA Neha Das"
                className="w-full h-10 px-3 text-sm bg-white border border-slate-300 rounded-md text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10"
              />
              <p className="text-xs text-slate-500 mt-1.5 truncate">
                {teamMembers.length > 0
                  ? `${teamMembers.length} team ${
                      teamMembers.length === 1 ? 'member' : 'members'
                    } available in procedure dropdowns: ${teamMembers.join(' · ')}`
                  : 'Enter names separated by commas to populate procedure assignment dropdowns.'}
              </p>
            </div>
          </div>
        </section>

        {/* Workspace View */}
        {activeView === 'overview' ? (
          <OverviewInfographic
            header={header}
            overallCounts={overallCounts}
            sectionSummaries={sectionSummaries}
            onNavigateTab={(tabId) => {
              setActiveTab(tabId);
              setActiveView('checklist');
            }}
          />
        ) : (
          <section
            aria-label="Audit Procedures Checklist"
            className="bg-white border border-slate-200 rounded-lg overflow-hidden"
          >
            {/* 5 Checklist Tabs in exact required order */}
            <div
              role="tablist"
              aria-label="Audit checklist sections"
              className="flex items-center border-b border-slate-200 bg-slate-50/70 overflow-x-auto"
            >
              {AUDIT_TABS.map((tab, idx) => {
                const summary = sectionSummaries.find((s) => s.tabId === tab.id);
                const isActive = activeTab === tab.id;
                const completed = summary?.counts.Completed ?? 0;
                const total = summary?.counts.total ?? 0;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-5 py-3.5 text-sm font-medium border-b-2 transition-colors whitespace-nowrap shrink-0 flex items-center gap-2 focus:outline-none focus-visible:bg-slate-100 ${
                      isActive
                        ? 'border-[#0F2942] text-[#0F2942] bg-white font-semibold'
                        : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-100/60'
                    }`}
                  >
                    <span className="font-mono-num text-xs text-slate-400">
                      0{idx + 1}.
                    </span>
                    <span>{tab.label}</span>
                    <span className="text-xs text-slate-500 font-mono-num">
                      {completed}/{total}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Active Tab Context & Filter Bar */}
            <div className="px-5 py-4 border-b border-slate-200 bg-white space-y-4">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-2">
                <div>
                  <h2 className="text-base font-semibold text-slate-900">
                    {activeTabMeta.label}
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {activeTabMeta.description}
                  </p>
                </div>
                {activeSectionSummary && (
                  <div className="text-xs text-slate-600 font-mono-num whitespace-nowrap">
                    Completed: {activeSectionSummary.counts.Completed} · NA:{' '}
                    {activeSectionSummary.counts.NA} · In Progress:{' '}
                    {activeSectionSummary.counts['In Progress']} · Pending:{' '}
                    {activeSectionSummary.counts.Pending}
                  </div>
                )}
              </div>

              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
                {/* Search + Subsection Filter */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 flex-1">
                  <div className="relative flex-1 max-w-md">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Filter procedures, sub-sections, or remarks..."
                      aria-label="Filter procedures"
                      className="w-full h-9 pl-9 pr-3 text-xs bg-white border border-slate-200 rounded-md text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-900/10"
                    />
                  </div>

                  <select
                    value={subSectionFilter}
                    onChange={(e) => setSubSectionFilter(e.target.value)}
                    aria-label="Filter by sub-section"
                    className="h-9 px-3 text-xs bg-white border border-slate-200 rounded-md text-slate-700 max-w-xs focus:outline-none focus:border-slate-400"
                  >
                    <option value="All">All Sub-sections ({subSectionsInTab.length})</option>
                    {subSectionsInTab.map((sub) => (
                      <option key={sub} value={sub}>
                        {sub}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Status Filter Segmented Controls */}
                <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-md overflow-x-auto shrink-0">
                  {(
                    [
                      'All',
                      'Unmarked',
                      'Completed',
                      'In Progress',
                      'Pending',
                      'NA',
                    ] as StatusFilter[]
                  ).map((st) => (
                    <button
                      key={st}
                      type="button"
                      onClick={() => setStatusFilter(st)}
                      className={`px-2.5 py-1 text-xs font-medium rounded-sm transition-colors whitespace-nowrap shrink-0 ${
                        statusFilter === st
                          ? 'bg-white text-slate-900 shadow-2xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Column Headers (Desktop) */}
            <div className="hidden xl:flex items-center gap-4 px-5 py-2.5 bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-500">
              <div className="w-[44%] shrink-0 pl-10">Audit Procedure</div>
              <div className="w-[32%] shrink-0">Status & Team Member</div>
              <div className="flex-1">Remarks / Working Paper Ref</div>
            </div>

            {/* Procedure Rows */}
            <div>
              {filteredProcedures.length === 0 ? (
                <div className="px-6 py-12 text-center">
                  <p className="text-sm font-medium text-slate-700">
                    No procedures match the current filters.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery('');
                      setStatusFilter('All');
                      setSubSectionFilter('All');
                    }}
                    className="mt-3 px-3.5 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors"
                  >
                    Clear Filters
                  </button>
                </div>
              ) : (
                filteredProcedures.map((proc) => {
                  const originalIndex =
                    tabProcedures.findIndex((p) => p.id === proc.id) + 1;
                  return (
                    <ProcedureRow
                      key={proc.id}
                      index={originalIndex}
                      procedure={proc}
                      entry={entries[proc.id]}
                      teamMembers={teamMembers}
                      hasMissingMemberError={missingMemberSet.has(proc.id)}
                      onUpdateEntry={handleUpdateEntry}
                    />
                  );
                })
              )}
            </div>
          </section>
        )}
      </main>
      <OfflineIndicator />
    </div>
  );
}
