import React from 'react';
import { AlertCircle } from 'lucide-react';
import { AuditProcedure, ProcedureEntry, ProcedureStatus } from '../types/audit';
import { STATUS_OPTIONS } from '../utils/auditHelpers';

interface ProcedureRowProps {
  index: number;
  procedure: AuditProcedure;
  entry: ProcedureEntry | undefined;
  teamMembers: string[];
  hasMissingMemberError: boolean;
  onUpdateEntry: (procedureId: string, patch: Partial<ProcedureEntry>) => void;
}

const STATUS_BUTTON_STYLES: Record<
  ProcedureStatus,
  { active: string; inactive: string }
> = {
  Completed: {
    active: 'bg-emerald-700 text-white border-emerald-700',
    inactive: 'bg-white text-slate-700 border-slate-200 hover:border-emerald-300 hover:bg-emerald-50/50',
  },
  'In Progress': {
    active: 'bg-sky-700 text-white border-sky-700',
    inactive: 'bg-white text-slate-700 border-slate-200 hover:border-sky-300 hover:bg-sky-50/50',
  },
  Pending: {
    active: 'bg-amber-600 text-white border-amber-600',
    inactive: 'bg-white text-slate-700 border-slate-200 hover:border-amber-300 hover:bg-amber-50/50',
  },
  NA: {
    active: 'bg-slate-700 text-white border-slate-700',
    inactive: 'bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-100',
  },
};

export const ProcedureRow: React.FC<ProcedureRowProps> = ({
  index,
  procedure,
  entry,
  teamMembers,
  hasMissingMemberError,
  onUpdateEntry,
}) => {
  const currentStatus = entry?.status ?? '';
  const currentAssignee = entry?.assignedTo ?? '';
  const currentRemarks = entry?.remarks ?? '';

  const handleStatusClick = (status: ProcedureStatus) => {
    const nextStatus = currentStatus === status ? '' : status;
    onUpdateEntry(procedure.id, { status: nextStatus });
  };

  return (
    <div
      id={`proc-row-${procedure.id}`}
      className={`px-5 py-4 border-b border-slate-200 last:border-b-0 transition-colors ${
        hasMissingMemberError ? 'bg-red-50/60' : 'bg-white hover:bg-slate-50/70'
      }`}
    >
      <div className="flex flex-col xl:flex-row xl:items-start gap-4">
        {/* Left: S.No & Procedure Description */}
        <div className="flex items-start gap-3.5 xl:w-[44%] shrink-0">
          <span className="text-xs font-medium text-slate-400 font-mono-num pt-0.5 w-7 shrink-0 text-right">
            {index}.
          </span>
          <div className="min-w-0">
            <p className="text-xs font-medium text-slate-500 mb-0.5">
              {procedure.subSection}
            </p>
            <p className="text-sm text-slate-900 leading-snug">
              {procedure.text}
            </p>
          </div>
        </div>

        {/* Middle: Status Controls + Conditional Team Member Dropdown */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 xl:w-[32%] shrink-0 pl-10 xl:pl-0">
          <div
            className="inline-flex items-center rounded-md shadow-2xs shrink-0"
            role="group"
            aria-label={`Status for procedure ${index}`}
          >
            {STATUS_OPTIONS.map((status, idx) => {
              const isActive = currentStatus === status;
              const style = STATUS_BUTTON_STYLES[status];
              const roundedClass =
                idx === 0
                  ? 'rounded-l-md'
                  : idx === STATUS_OPTIONS.length - 1
                  ? 'rounded-r-md -ml-px'
                  : '-ml-px';
              return (
                <button
                  key={status}
                  type="button"
                  onClick={() => handleStatusClick(status)}
                  aria-pressed={isActive}
                  className={`px-2.5 py-2 text-xs font-medium border transition-colors whitespace-nowrap shrink-0 focus:outline-none focus-visible:z-10 focus-visible:ring-2 focus-visible:ring-slate-900 ${roundedClass} ${
                    isActive ? style.active : style.inactive
                  }`}
                >
                  {status}
                </button>
              );
            })}
          </div>

          {currentStatus !== '' && (
            <div className="flex-1 min-w-[165px]">
              <select
                value={currentAssignee}
                onChange={(e) =>
                  onUpdateEntry(procedure.id, { assignedTo: e.target.value })
                }
                aria-label={`Assign team member for procedure ${index}`}
                className={`w-full h-9 px-2.5 text-xs rounded-md border bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900 ${
                  hasMissingMemberError
                    ? 'border-red-500 ring-1 ring-red-500 text-red-900'
                    : 'border-slate-300'
                }`}
              >
                <option value="">
                  {teamMembers.length === 0
                    ? 'Enter team members above...'
                    : currentStatus === 'Completed'
                    ? 'Select performer (Required)*'
                    : 'Assign team member (Optional)'}
                </option>
                {teamMembers.map((member) => (
                  <option key={member} value={member}>
                    {member}
                  </option>
                ))}
              </select>
              {hasMissingMemberError && (
                <div className="flex items-center gap-1 mt-1 text-xs text-red-700 font-medium">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>Select who performed this work</span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right: Remarks Field */}
        <div className="flex-1 pl-10 xl:pl-0">
          <input
            type="text"
            value={currentRemarks}
            onChange={(e) =>
              onUpdateEntry(procedure.id, { remarks: e.target.value })
            }
            aria-label={`Remarks for procedure ${index}`}
            placeholder={
              currentStatus === 'Completed'
                ? 'Optional (auto-fills standard confirmation if left blank)'
                : 'Optional remarks / W/P reference'
            }
            className="w-full h-9 px-3 text-xs bg-white border border-slate-200 rounded-md text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-900/10"
          />
        </div>
      </div>
    </div>
  );
};
