import {
  AlignmentType,
  BorderStyle,
  Document,
  Footer,
  Header,
  ImageRun,
  Packer,
  PageBreak,
  PageNumber,
  Paragraph,
  ShadingType,
  Table,
  TableCell,
  TableRow,
  TextRun,
  VerticalAlign,
  WidthType,
} from 'docx';
import { AUDIT_PROCEDURES, AUDIT_TABS } from '../data/procedures';
import { EngagementHeader, ProcedureEntry, ProcedureStatus } from '../types/audit';
import {
  computeOverallCounts,
  computeSectionSummaries,
  getEffectiveStatus,
  parseTeamMembers,
  resolveProcedureRemark,
} from './auditHelpers';
import { renderDonutChartPng, renderSectionBarChartPng } from './chartRenderer';

const NAVY = '0F2942';
const SLATE_DARK = '0F172A';
const SLATE_TEXT = '334155';
const SLATE_MUTED = '64748B';
const BORDER_LIGHT = 'CBD5E1';
const BORDER_SUBTLE = 'E2E8F0';
const BG_TINT = 'F8FAFC';

function statusStyling(status: ProcedureStatus): {
  textColor: string;
  fillColor: string;
} {
  switch (status) {
    case 'Completed':
      return { textColor: '15803D', fillColor: 'F0FDF4' };
    case 'In Progress':
      return { textColor: '0369A1', fillColor: 'F0F9FF' };
    case 'Pending':
      return { textColor: 'B45309', fillColor: 'FFFBEB' };
    case 'NA':
      return { textColor: '475569', fillColor: 'F1F5F9' };
  }
}

function thinBorders(color = BORDER_SUBTLE) {
  return {
    top: { style: BorderStyle.SINGLE, size: 4, color },
    bottom: { style: BorderStyle.SINGLE, size: 4, color },
    left: { style: BorderStyle.SINGLE, size: 4, color },
    right: { style: BorderStyle.SINGLE, size: 4, color },
  };
}

function noBorders() {
  return {
    top: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' },
    bottom: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' },
    left: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' },
    right: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' },
  };
}

export async function generateAuditWorkingPaperDocx(
  header: EngagementHeader,
  entries: Record<string, ProcedureEntry>
): Promise<void> {
  const auditeeName = header.auditeeName.trim() || 'Not Specified';
  const teamMembers = parseTeamMembers(header.teamMembersRaw);
  const teamMembersDisplay =
    teamMembers.length > 0 ? teamMembers.join(', ') : 'Not Specified';
  const generatedDate = new Date().toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

  const overallCounts = computeOverallCounts(entries);
  const sectionSummaries = computeSectionSummaries(entries);

  const [donutPng, barChartPng] = await Promise.all([
    renderDonutChartPng(overallCounts),
    renderSectionBarChartPng(sectionSummaries),
  ]);

  // Build Page 1 Infographic Overview Elements
  const page1Children: (Paragraph | Table)[] = [];

  // 1. Executive Header Banner Table
  page1Children.push(
    new Table({
      width: { size: 100, type: WidthType.PERCENTAGE },
      rows: [
        new TableRow({
          children: [
            new TableCell({
              shading: { type: ShadingType.CLEAR, fill: NAVY },
              borders: noBorders(),
              margins: { top: 200, bottom: 200, left: 260, right: 260 },
              children: [
                new Paragraph({
                  spacing: { after: 60 },
                  children: [
                    new TextRun({
                      text: 'STATUTORY AUDIT WORKING PAPER',
                      bold: true,
                      size: 30,
                      color: 'FFFFFF',
                      font: 'Calibri',
                    }),
                  ],
                }),
                new Paragraph({
                  spacing: { after: 0 },
                  children: [
                    new TextRun({
                      text: `Engagement Overview & Audit Execution Summary  |  ${header.financialYear}`,
                      size: 20,
                      color: 'CBD5E1',
                      font: 'Calibri',
                    }),
                  ],
                }),
              ],
            }),
          ],
        }),
      ],
    })
  );

  page1Children.push(new Paragraph({ spacing: { before: 120, after: 0 } }));

  // 2. Engagement Metadata Grid (Auditee, FY, Team Members)
  page1Children.push(
    new Table({
      width: { size: 100, type: WidthType.PERCENTAGE },
      rows: [
        new TableRow({
          children: [
            new TableCell({
              width: { size: 46, type: WidthType.PERCENTAGE },
              shading: { type: ShadingType.CLEAR, fill: BG_TINT },
              borders: thinBorders(BORDER_LIGHT),
              margins: { top: 110, bottom: 110, left: 160, right: 160 },
              children: [
                new Paragraph({
                  spacing: { after: 40 },
                  children: [
                    new TextRun({
                      text: 'NAME OF AUDITEE',
                      bold: true,
                      size: 16,
                      color: SLATE_MUTED,
                      font: 'Calibri',
                    }),
                  ],
                }),
                new Paragraph({
                  children: [
                    new TextRun({
                      text: auditeeName,
                      bold: true,
                      size: 22,
                      color: SLATE_DARK,
                      font: 'Calibri',
                    }),
                  ],
                }),
              ],
            }),
            new TableCell({
              width: { size: 24, type: WidthType.PERCENTAGE },
              shading: { type: ShadingType.CLEAR, fill: BG_TINT },
              borders: thinBorders(BORDER_LIGHT),
              margins: { top: 110, bottom: 110, left: 160, right: 160 },
              children: [
                new Paragraph({
                  spacing: { after: 40 },
                  children: [
                    new TextRun({
                      text: 'FINANCIAL YEAR',
                      bold: true,
                      size: 16,
                      color: SLATE_MUTED,
                      font: 'Calibri',
                    }),
                  ],
                }),
                new Paragraph({
                  children: [
                    new TextRun({
                      text: header.financialYear,
                      bold: true,
                      size: 22,
                      color: SLATE_DARK,
                      font: 'Calibri',
                    }),
                  ],
                }),
              ],
            }),
            new TableCell({
              width: { size: 30, type: WidthType.PERCENTAGE },
              shading: { type: ShadingType.CLEAR, fill: BG_TINT },
              borders: thinBorders(BORDER_LIGHT),
              margins: { top: 110, bottom: 110, left: 160, right: 160 },
              children: [
                new Paragraph({
                  spacing: { after: 40 },
                  children: [
                    new TextRun({
                      text: 'WORKING PAPER DATE',
                      bold: true,
                      size: 16,
                      color: SLATE_MUTED,
                      font: 'Calibri',
                    }),
                  ],
                }),
                new Paragraph({
                  children: [
                    new TextRun({
                      text: generatedDate,
                      bold: true,
                      size: 22,
                      color: SLATE_DARK,
                      font: 'Calibri',
                    }),
                  ],
                }),
              ],
            }),
          ],
        }),
        new TableRow({
          children: [
            new TableCell({
              columnSpan: 3,
              shading: { type: ShadingType.CLEAR, fill: 'FFFFFF' },
              borders: thinBorders(BORDER_LIGHT),
              margins: { top: 110, bottom: 110, left: 160, right: 160 },
              children: [
                new Paragraph({
                  spacing: { after: 30 },
                  children: [
                    new TextRun({
                      text: 'AUDIT TEAM MEMBERS',
                      bold: true,
                      size: 16,
                      color: SLATE_MUTED,
                      font: 'Calibri',
                    }),
                  ],
                }),
                new Paragraph({
                  children: [
                    new TextRun({
                      text: teamMembersDisplay,
                      size: 20,
                      color: SLATE_DARK,
                      font: 'Calibri',
                    }),
                  ],
                }),
              ],
            }),
          ],
        }),
      ],
    })
  );

  page1Children.push(new Paragraph({ spacing: { before: 120, after: 0 } }));

  // 3. KPI Summary Strip (4 Status Cards)
  const kpiItems: Array<{ label: string; value: number; color: string; bg: string }> = [
    {
      label: 'COMPLETED',
      value: overallCounts.Completed,
      color: '15803D',
      bg: 'F0FDF4',
    },
    {
      label: 'IN PROGRESS',
      value: overallCounts['In Progress'],
      color: '0369A1',
      bg: 'F0F9FF',
    },
    {
      label: 'PENDING',
      value: overallCounts.Pending,
      color: 'B45309',
      bg: 'FFFBEB',
    },
    {
      label: 'NOT APPLICABLE (NA)',
      value: overallCounts.NA,
      color: '475569',
      bg: 'F1F5F9',
    },
  ];

  page1Children.push(
    new Table({
      width: { size: 100, type: WidthType.PERCENTAGE },
      rows: [
        new TableRow({
          children: kpiItems.map(
            (kpi) =>
              new TableCell({
                width: { size: 25, type: WidthType.PERCENTAGE },
                shading: { type: ShadingType.CLEAR, fill: kpi.bg },
                borders: thinBorders(BORDER_LIGHT),
                margins: { top: 100, bottom: 100, left: 120, right: 120 },
                children: [
                  new Paragraph({
                    alignment: AlignmentType.CENTER,
                    spacing: { after: 20 },
                    children: [
                      new TextRun({
                        text: `${kpi.value}`,
                        bold: true,
                        size: 32,
                        color: kpi.color,
                        font: 'Calibri',
                      }),
                    ],
                  }),
                  new Paragraph({
                    alignment: AlignmentType.CENTER,
                    children: [
                      new TextRun({
                        text: kpi.label,
                        bold: true,
                        size: 15,
                        color: SLATE_TEXT,
                        font: 'Calibri',
                      }),
                    ],
                  }),
                ],
              })
          ),
        }),
      ],
    })
  );

  page1Children.push(new Paragraph({ spacing: { before: 120, after: 0 } }));

  // 4. Donut Chart Image
  page1Children.push(
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 100 },
      children: [
        new ImageRun({
          type: 'png',
          data: donutPng,
          transformation: {
            width: 590,
            height: 279,
          },
        }),
      ],
    })
  );

  // 5. Section Breakdown Bar Chart Image
  page1Children.push(
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 0 },
      children: [
        new ImageRun({
          type: 'png',
          data: barChartPng,
          transformation: {
            width: 590,
            height: 343,
          },
        }),
      ],
    })
  );

  // Page Break before Detailed Checklist Pages
  page1Children.push(new Paragraph({ children: [new PageBreak()] }));

  // Build Detailed Checklist Pages (Sections 1..5)
  const detailChildren: (Paragraph | Table)[] = [];

  AUDIT_TABS.forEach((tab, tabIdx) => {
    const procs = AUDIT_PROCEDURES.filter((p) => p.tabId === tab.id);
    const secSummary = sectionSummaries.find((s) => s.tabId === tab.id);
    const completedCount = secSummary?.counts.Completed ?? 0;
    const naCount = secSummary?.counts.NA ?? 0;
    const inProgressCount = secSummary?.counts['In Progress'] ?? 0;
    const pendingCount = secSummary?.counts.Pending ?? 0;

    // Section Header Banner
    detailChildren.push(
      new Paragraph({
        spacing: { before: tabIdx === 0 ? 0 : 280, after: 60 },
        keepNext: true,
        children: [
          new TextRun({
            text: `${tabIdx + 1}. ${tab.label}`,
            bold: true,
            size: 28,
            color: NAVY,
            font: 'Calibri',
          }),
        ],
      })
    );

    // Section Summary Line (explicitly stating Completed and NA counts)
    detailChildren.push(
      new Paragraph({
        spacing: { before: 0, after: 120 },
        keepNext: true,
        children: [
          new TextRun({
            text: `Section Summary: ${completedCount} Completed  |  ${naCount} NA  |  ${inProgressCount} In Progress  |  ${pendingCount} Pending  (Total: ${procs.length} procedures)`,
            bold: true,
            size: 19,
            color: SLATE_TEXT,
            font: 'Calibri',
          }),
        ],
      })
    );

    // Table Header Row
    const headerRow = new TableRow({
      tableHeader: true,
      cantSplit: true,
      children: [
        { text: 'S.No', width: 650, align: AlignmentType.CENTER },
        { text: 'Audit Procedure', width: 4250, align: AlignmentType.LEFT },
        { text: 'Status', width: 1220, align: AlignmentType.CENTER },
        { text: 'Performed / Assigned By', width: 1550, align: AlignmentType.LEFT },
        { text: 'Remarks', width: 2652, align: AlignmentType.LEFT },
      ].map(
        (col) =>
          new TableCell({
            width: { size: col.width, type: WidthType.DXA },
            shading: { type: ShadingType.CLEAR, fill: NAVY },
            borders: thinBorders(NAVY),
            verticalAlign: VerticalAlign.CENTER,
            margins: { top: 90, bottom: 90, left: 100, right: 100 },
            children: [
              new Paragraph({
                alignment: col.align,
                children: [
                  new TextRun({
                    text: col.text,
                    bold: true,
                    size: 18,
                    color: 'FFFFFF',
                    font: 'Calibri',
                  }),
                ],
              }),
            ],
          })
      ),
    });

    const dataRows = procs.map((proc, rowIdx) => {
      const entry = entries[proc.id];
      const status = getEffectiveStatus(entry);
      const assignee = entry?.assignedTo?.trim() || '—';
      const remark = resolveProcedureRemark(proc, entry);
      const rowBg = rowIdx % 2 === 0 ? 'FFFFFF' : BG_TINT;
      const stStyle = statusStyling(status);

      return new TableRow({
        cantSplit: true,
        children: [
          // S.No
          new TableCell({
            width: { size: 650, type: WidthType.DXA },
            shading: { type: ShadingType.CLEAR, fill: rowBg },
            borders: thinBorders(BORDER_SUBTLE),
            verticalAlign: VerticalAlign.TOP,
            margins: { top: 80, bottom: 80, left: 80, right: 80 },
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                  new TextRun({
                    text: `${rowIdx + 1}`,
                    size: 18,
                    color: SLATE_MUTED,
                    font: 'Calibri',
                  }),
                ],
              }),
            ],
          }),
          // Procedure + Sub-section
          new TableCell({
            width: { size: 4250, type: WidthType.DXA },
            shading: { type: ShadingType.CLEAR, fill: rowBg },
            borders: thinBorders(BORDER_SUBTLE),
            verticalAlign: VerticalAlign.TOP,
            margins: { top: 80, bottom: 80, left: 100, right: 100 },
            children: [
              new Paragraph({
                spacing: { after: 30 },
                children: [
                  new TextRun({
                    text: proc.subSection,
                    bold: true,
                    size: 15,
                    color: SLATE_MUTED,
                    font: 'Calibri',
                  }),
                ],
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: proc.text,
                    size: 18,
                    color: SLATE_DARK,
                    font: 'Calibri',
                  }),
                ],
              }),
            ],
          }),
          // Status
          new TableCell({
            width: { size: 1220, type: WidthType.DXA },
            shading: { type: ShadingType.CLEAR, fill: stStyle.fillColor },
            borders: thinBorders(BORDER_SUBTLE),
            verticalAlign: VerticalAlign.TOP,
            margins: { top: 80, bottom: 80, left: 80, right: 80 },
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                  new TextRun({
                    text: status,
                    bold: true,
                    size: 17,
                    color: stStyle.textColor,
                    font: 'Calibri',
                  }),
                ],
              }),
            ],
          }),
          // Team Member
          new TableCell({
            width: { size: 1550, type: WidthType.DXA },
            shading: { type: ShadingType.CLEAR, fill: rowBg },
            borders: thinBorders(BORDER_SUBTLE),
            verticalAlign: VerticalAlign.TOP,
            margins: { top: 80, bottom: 80, left: 100, right: 100 },
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: assignee,
                    size: 18,
                    color: assignee === '—' ? SLATE_MUTED : SLATE_DARK,
                    font: 'Calibri',
                  }),
                ],
              }),
            ],
          }),
          // Remarks
          new TableCell({
            width: { size: 2652, type: WidthType.DXA },
            shading: { type: ShadingType.CLEAR, fill: rowBg },
            borders: thinBorders(BORDER_SUBTLE),
            verticalAlign: VerticalAlign.TOP,
            margins: { top: 80, bottom: 80, left: 100, right: 100 },
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: remark,
                    size: 17,
                    color: SLATE_TEXT,
                    font: 'Calibri',
                  }),
                ],
              }),
            ],
          }),
        ],
      });
    });

    detailChildren.push(
      new Table({
        width: { size: 10322, type: WidthType.DXA },
        rows: [headerRow, ...dataRows],
      })
    );
  });

  const doc = new Document({
    creator: 'Audit Working Paper Pro',
    title: `Audit Working Paper - ${auditeeName} (${header.financialYear})`,
    description: 'Statutory Audit Checklist and Working Paper',
    sections: [
      {
        properties: {
          page: {
            size: {
              width: 11906,
              height: 16838,
            },
            margin: {
              top: 792,
              bottom: 792,
              left: 792,
              right: 792,
            },
          },
        },
        headers: {
          default: new Header({
            children: [
              new Paragraph({
                alignment: AlignmentType.RIGHT,
                children: [
                  new TextRun({
                    text: `${auditeeName}  |  ${header.financialYear}  |  Audit Working Paper`,
                    size: 16,
                    color: SLATE_MUTED,
                    font: 'Calibri',
                  }),
                ],
              }),
            ],
          }),
        },
        footers: {
          default: new Footer({
            children: [
              new Paragraph({
                alignment: AlignmentType.RIGHT,
                children: [
                  new TextRun({
                    text: 'Confidential — Audit Working Paper  |  Page ',
                    size: 16,
                    color: SLATE_MUTED,
                    font: 'Calibri',
                  }),
                  new TextRun({
                    children: [PageNumber.CURRENT],
                    size: 16,
                    color: SLATE_MUTED,
                    font: 'Calibri',
                  }),
                  new TextRun({
                    text: ' of ',
                    size: 16,
                    color: SLATE_MUTED,
                    font: 'Calibri',
                  }),
                  new TextRun({
                    children: [PageNumber.TOTAL_PAGES],
                    size: 16,
                    color: SLATE_MUTED,
                    font: 'Calibri',
                  }),
                ],
              }),
            ],
          }),
        },
        children: [...page1Children, ...detailChildren],
      },
    ],
  });

  const blob = await Packer.toBlob(doc);
  const safeAuditee = auditeeName
    .replace(/[^a-zA-Z0-9_-]+/g, '_')
    .replace(/^_+|_+$/g, '');
  const safeFy = header.financialYear.replace(/\s+/g, '_');
  const filename = `Audit_Working_Paper_${safeAuditee || 'Entity'}_${safeFy}.docx`;

  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
