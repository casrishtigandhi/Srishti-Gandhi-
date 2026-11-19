import React from 'react';
import { EngagementHeader, SectionSummary, StatusCounts } from '../types/audit';
import { parseTeamMembers, STATUS_COLORS, STATUS_OPTIONS } from '../utils/auditHelpers';

interface OverviewInfographicProps {
  header: EngagementHeader;
  overallCounts: StatusCounts;
  sectionSummaries: SectionSummary[];
  onNavigateTab: (tabId: SectionSummary['tabId']) => void;
}

export const OverviewInfographic: React.FC<OverviewInfographicProps> = ({
  header,
  overallCounts,
  sectionSummaries,
  onNavigateTab,
}) => {
  const teamMembers = parseTeamMembers(header.teamMembersRaw);
  const total = Math.max(overallCounts.total, 1);
  const completedPct = Math.round((overallCounts.Completed / total) * 100);

  // SVG Donut geometry
  const radius = 74;
  const circumference = 2 * Math.PI * radius;
  let cumulativeOffset = 0;

  const donutSegments = STATUS_OPTIONS.map((status) => {
    const count = overallCounts[status];
    const ratio = count / total;
    const dashLength = ratio * circumference;
    const offset = cumulativeOffset;
    cumulativeOffset += dashLength;
    return {
      status,
      count,
      pct: ((count / total) * 100).toFixed(1),
      dashLength,
      offset,
      color: STATUS_COLORS[status],
    };
  });

  const maxSectionTotal = Math.max(...sectionSummaries.map((s) => s.counts.total), 1);

  return (
    <div className="space-y-6">
      {/* Engagement Summary Strip */}
      <div className="bg-white border border-slate-200 rounded-lg p-6">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
          <div className="space-y-1">
            <p className="text-xs font-medium text-slate-500">Engagement Overview</p>
            <h2 className="text-xl font-semibold text-slate-900">
              {header.auditeeName.trim() || 'Auditee Name Not Entered'}
            </h2>
            <div className="flex flex-wrap items-center gap-2 text-sm text-slate-600 pt-1">
              <span>{header.financialYear}</span>
              <span aria-hidden="true">·</span>
              <span>
                {teamMembers.length > 0
                  ? teamMembers.join(', ')
                  : 'No audit team members listed'}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 shrink-0">
            {STATUS_OPTIONS.map((status) => (
              <div
                key={status}
                className="px-4 py-3 bg-slate-50 border border-slate-200 rounded-md min-w-[116px]"
              >
                <div
                  className="text-2xl font-semibold font-mono-num"
                  style={{ color: STATUS_COLORS[status] }}
                >
                  {overallCounts[status]}
                </div>
                <div className="text-xs font-medium text-slate-600 mt-0.5 whitespace-nowrap">
                  {status}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Donut Chart Card */}
        <div className="lg:col-span-5 bg-white border border-slate-200 rounded-lg p-6 flex flex-col justify-between">
          <div>
            <h3 className="text-base font-semibold text-slate-900">
              Overall Status Distribution
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Across all {overallCounts.total} procedures in the working paper
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-6 my-6">
            <div className="relative w-48 h-48 shrink-0 flex items-center justify-center">
              <svg viewBox="0 0 180 180" className="w-full h-full -rotate-90">
                <circle
                  cx="90"
                  cy="90"
                  r={radius}
                  fill="none"
                  stroke="#E2E8F0"
                  strokeWidth="22"
                />
                {donutSegments.map(
                  (seg) =>
                    seg.count > 0 && (
                      <circle
                        key={seg.status}
                        cx="90"
                        cy="90"
                        r={radius}
                        fill="none"
                        stroke={seg.color}
                        strokeWidth="22"
                        strokeDasharray={`${seg.dashLength} ${circumference}`}
                        strokeDashoffset={-seg.offset}
                      />
                    )
                )}
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-3xl font-semibold text-slate-900 font-mono-num">
                  {completedPct}%
                </span>
                <span className="text-xs font-medium text-slate-500">Completed</span>
              </div>
            </div>

            <div className="flex-1 w-full space-y-3">
              {donutSegments.map((seg) => (
                <div
                  key={seg.status}
                  className="flex items-center justify-between text-sm py-1.5 border-b border-slate-100 last:border-b-0"
                >
                  <div className="flex items-center gap-2.5">
                    <span
                      className="w-2.5 h-2.5 rounded-sm shrink-0"
                      style={{ backgroundColor: seg.color }}
                    />
                    <span className="text-slate-700 font-medium">{seg.status}</span>
                  </div>
                  <div className="flex items-center gap-3 font-mono-num">
                    <span className="font-semibold text-slate-900">{seg.count}</span>
                    <span className="text-xs text-slate-500 w-12 text-right">
                      {seg.pct}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="text-xs text-slate-500 pt-2 border-t border-slate-100">
            This chart is embedded as a high-resolution graphic on Page 1 of the exported Word document.
          </div>
        </div>

        {/* Section-wise Breakdown Bar Chart Card */}
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-lg p-6 flex flex-col justify-between">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h3 className="text-base font-semibold text-slate-900">
                Section-Wise Status Breakdown
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Click any section row to jump directly to that checklist tab
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600">
              {STATUS_OPTIONS.map((status) => (
                <div key={status} className="flex items-center gap-1.5">
                  <span
                    className="w-2.5 h-2.5 rounded-sm"
                    style={{ backgroundColor: STATUS_COLORS[status] }}
                  />
                  <span>{status}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4 my-6">
            {sectionSummaries.map((sec) => {
              const widthScale = (sec.counts.total / maxSectionTotal) * 100;
              return (
                <button
                  key={sec.tabId}
                  type="button"
                  onClick={() => onNavigateTab(sec.tabId)}
                  className="w-full text-left group p-2.5 -mx-2.5 rounded-md hover:bg-slate-50 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-900"
                >
                  <div className="flex items-center justify-between text-sm mb-1.5">
                    <span className="font-medium text-slate-800 group-hover:text-slate-900">
                      {sec.label}
                    </span>
                    <div className="flex items-center gap-3 text-xs text-slate-600 font-mono-num">
                      <span>C: {sec.counts.Completed}</span>
                      <span>IP: {sec.counts['In Progress']}</span>
                      <span>P: {sec.counts.Pending}</span>
                      <span>NA: {sec.counts.NA}</span>
                      <span className="font-semibold text-slate-900">
                        Total {sec.counts.total}
                      </span>
                    </div>
                  </div>
                  <div className="w-full bg-slate-100 h-3.5 rounded-sm overflow-hidden">
                    <div
                      className="h-full flex"
                      style={{ width: `${Math.max(widthScale, 6)}%` }}
                    >
                      {STATUS_OPTIONS.map((status) => {
                        const val = sec.counts[status];
                        if (val <= 0) return null;
                        const pct = (val / sec.counts.total) * 100;
                        return (
                          <div
                            key={status}
                            style={{
                              width: `${pct}%`,
                              backgroundColor: STATUS_COLORS[status],
                            }}
                            title={`${status}: ${val}`}
                          />
                        );
                      })}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="text-xs text-slate-500 pt-2 border-t border-slate-100">
            Procedures left unmarked are counted as Pending in the overview summary and Word working paper.
          </div>
        </div>
      </div>
    </div>
  );
};
