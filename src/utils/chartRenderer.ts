import { SectionSummary, StatusCounts } from '../types/audit';
import { STATUS_COLORS, STATUS_OPTIONS } from './auditHelpers';

function canvasToUint8Array(canvas: HTMLCanvasElement): Promise<Uint8Array> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(async (blob) => {
      if (!blob) {
        reject(new Error('Failed to export chart image from canvas.'));
        return;
      }
      const buffer = await blob.arrayBuffer();
      resolve(new Uint8Array(buffer));
    }, 'image/png');
  });
}

function drawRoundedRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

export async function renderDonutChartPng(
  counts: StatusCounts
): Promise<Uint8Array> {
  const width = 1100;
  const height = 520;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas 2D context unavailable');

  // Background card
  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(0, 0, width, height);
  ctx.strokeStyle = '#E2E8F0';
  ctx.lineWidth = 2;
  drawRoundedRect(ctx, 2, 2, width - 4, height - 4, 14);
  ctx.stroke();

  // Header
  ctx.fillStyle = '#0F2942';
  ctx.font = 'bold 26px "Plus Jakarta Sans", Arial, sans-serif';
  ctx.textAlign = 'left';
  ctx.fillText('Overall Audit Completion Summary', 40, 54);

  ctx.fillStyle = '#64748B';
  ctx.font = '16px "Public Sans", Arial, sans-serif';
  ctx.fillText(
    `Distribution across all ${counts.total} statutory & compliance audit procedures`,
    40,
    82
  );

  // Donut geometry
  const cx = 250;
  const cy = 295;
  const outerR = 152;
  const innerR = 96;
  const total = Math.max(counts.total, 1);

  const slices = STATUS_OPTIONS.map((status) => ({
    status,
    value: counts[status],
    color: STATUS_COLORS[status],
  })).filter((s) => s.value > 0);

  if (slices.length === 0) {
    ctx.beginPath();
    ctx.arc(cx, cy, outerR, 0, Math.PI * 2);
    ctx.arc(cx, cy, innerR, 0, Math.PI * 2, true);
    ctx.fillStyle = '#E2E8F0';
    ctx.fill();
  } else {
    let startAngle = -Math.PI / 2;
    const gap = slices.length > 1 ? 0.025 : 0;

    for (const slice of slices) {
      const sliceAngle = (slice.value / total) * Math.PI * 2;
      const drawStart = startAngle + gap / 2;
      const drawEnd = startAngle + sliceAngle - gap / 2;

      if (drawEnd > drawStart) {
        ctx.beginPath();
        ctx.arc(cx, cy, outerR, drawStart, drawEnd);
        ctx.arc(cx, cy, innerR, drawEnd, drawStart, true);
        ctx.closePath();
        ctx.fillStyle = slice.color;
        ctx.fill();
      }
      startAngle += sliceAngle;
    }
  }

  // Center text
  const completedPct = Math.round((counts.Completed / total) * 100);
  ctx.fillStyle = '#0F172A';
  ctx.font = 'bold 42px "Plus Jakarta Sans", Arial, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(`${completedPct}%`, cx, cy + 4);

  ctx.fillStyle = '#64748B';
  ctx.font = '600 15px "Public Sans", Arial, sans-serif';
  ctx.fillText('COMPLETED', cx, cy + 30);

  // Legend & structured breakdown on the right
  const legendX = 500;
  const legendY = 148;
  const rowW = 540;
  const rowH = 74;

  STATUS_OPTIONS.forEach((status, idx) => {
    const y = legendY + idx * (rowH + 12);
    const val = counts[status];
    const pct = ((val / total) * 100).toFixed(1);

    // Row surface
    ctx.fillStyle = '#F8FAFC';
    drawRoundedRect(ctx, legendX, y, rowW, rowH, 10);
    ctx.fill();
    ctx.strokeStyle = '#E2E8F0';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Color swatch
    ctx.fillStyle = STATUS_COLORS[status];
    drawRoundedRect(ctx, legendX + 20, y + 22, 18, 30, 4);
    ctx.fill();

    // Label
    ctx.fillStyle = '#0F172A';
    ctx.font = 'bold 20px "Public Sans", Arial, sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText(status, legendX + 54, y + 36);

    // Sub-note
    ctx.fillStyle = '#64748B';
    ctx.font = '14px "Public Sans", Arial, sans-serif';
    const desc =
      status === 'Completed'
        ? 'Verified & signed off'
        : status === 'In Progress'
        ? 'Review / testing underway'
        : status === 'Pending'
        ? 'Awaiting execution'
        : 'Not applicable to entity';
    ctx.fillText(desc, legendX + 54, y + 58);

    // Count & percentage right aligned
    ctx.fillStyle = '#0F172A';
    ctx.font = 'bold 26px "JetBrains Mono", monospace';
    ctx.textAlign = 'right';
    ctx.fillText(`${val}`, legendX + rowW - 104, y + 46);

    ctx.fillStyle = '#475569';
    ctx.font = '600 17px "JetBrains Mono", monospace';
    ctx.fillText(`${pct}%`, legendX + rowW - 22, y + 45);
  });

  return canvasToUint8Array(canvas);
}

export async function renderSectionBarChartPng(
  sections: SectionSummary[]
): Promise<Uint8Array> {
  const width = 1100;
  const height = 640;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas 2D context unavailable');

  // Background card
  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(0, 0, width, height);
  ctx.strokeStyle = '#E2E8F0';
  ctx.lineWidth = 2;
  drawRoundedRect(ctx, 2, 2, width - 4, height - 4, 14);
  ctx.stroke();

  // Header
  ctx.fillStyle = '#0F2942';
  ctx.font = 'bold 26px "Plus Jakarta Sans", Arial, sans-serif';
  ctx.textAlign = 'left';
  ctx.fillText('Section-Wise Status Breakdown', 40, 52);

  ctx.fillStyle = '#64748B';
  ctx.font = '16px "Public Sans", Arial, sans-serif';
  ctx.fillText(
    'Procedure counts across all five audit workstreams',
    40,
    80
  );

  // Top-right horizontal legend
  let lx = 580;
  const ly = 56;
  STATUS_OPTIONS.forEach((status) => {
    ctx.fillStyle = STATUS_COLORS[status];
    drawRoundedRect(ctx, lx, ly - 13, 14, 14, 3);
    ctx.fill();

    ctx.fillStyle = '#334155';
    ctx.font = '600 14px "Public Sans", Arial, sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText(status, lx + 20, ly);
    lx += ctx.measureText(status).width + 44;
  });

  // Chart plotting area
  const chartLeft = 170;
  const chartRight = 1055;
  const chartTop = 118;
  const chartBottom = 380;
  const chartW = chartRight - chartLeft;
  const chartH = chartBottom - chartTop;

  const maxTotal = Math.max(...sections.map((s) => s.counts.total), 10);
  const yMax = Math.ceil(maxTotal / 20) * 20;
  const gridSteps = 5;

  // Horizontal gridlines + Y labels
  for (let i = 0; i <= gridSteps; i++) {
    const val = Math.round((yMax / gridSteps) * i);
    const y = chartBottom - (val / yMax) * chartH;

    ctx.strokeStyle = i === 0 ? '#94A3B8' : '#E2E8F0';
    ctx.lineWidth = i === 0 ? 1.5 : 1;
    ctx.beginPath();
    ctx.moveTo(chartLeft, y);
    ctx.lineTo(chartRight, y);
    ctx.stroke();

    ctx.fillStyle = '#64748B';
    ctx.font = '14px "JetBrains Mono", monospace';
    ctx.textAlign = 'right';
    ctx.fillText(`${val}`, chartLeft - 14, y + 5);
  }

  // Columns
  const colW = chartW / sections.length;
  const barW = 76;

  sections.forEach((sec, idx) => {
    const centerX = chartLeft + colW * idx + colW / 2;
    const barX = centerX - barW / 2;
    let currentY = chartBottom;

    STATUS_OPTIONS.forEach((status) => {
      const val = sec.counts[status];
      if (val <= 0) return;
      const segH = Math.max((val / yMax) * chartH, 4);
      currentY -= segH;
      ctx.fillStyle = STATUS_COLORS[status];
      ctx.fillRect(barX, currentY, barW, segH);

      // Subtle white separator between stacked segments
      ctx.strokeStyle = '#FFFFFF';
      ctx.lineWidth = 1.5;
      ctx.strokeRect(barX, currentY, barW, segH);
    });

    // Total above bar
    ctx.fillStyle = '#0F172A';
    ctx.font = 'bold 16px "JetBrains Mono", monospace';
    ctx.textAlign = 'center';
    ctx.fillText(`${sec.counts.total}`, centerX, currentY - 10);

    // Column Header Label below axis (wrapped neatly if needed)
    const shortLabels: Record<string, string[]> = {
      'Balance Sheet': ['Balance', 'Sheet'],
      'Profit and Loss': ['Profit and', 'Loss'],
      'Accounting Standard Compliance': ['Accounting Std', 'Compliance'],
      'GST Compliance': ['GST', 'Compliance'],
      'Other Compliances': ['Other', 'Compliances'],
    };
    const lines = shortLabels[sec.label] ?? [sec.label];
    ctx.fillStyle = '#0F2942';
    ctx.font = 'bold 15px "Public Sans", Arial, sans-serif';
    lines.forEach((line, lIdx) => {
      ctx.fillText(line, centerX, chartBottom + 26 + lIdx * 18);
    });
  });

  // Aligned Data Breakdown Table below column labels
  const tableTop = 442;
  const rowHeight = 36;

  STATUS_OPTIONS.forEach((status, sIdx) => {
    const ry = tableTop + sIdx * rowHeight;

    // Alternating row tint
    ctx.fillStyle = sIdx % 2 === 0 ? '#F8FAFC' : '#FFFFFF';
    ctx.fillRect(40, ry, chartRight - 40, rowHeight);

    ctx.strokeStyle = '#E2E8F0';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(40, ry + rowHeight);
    ctx.lineTo(chartRight, ry + rowHeight);
    ctx.stroke();

    // Swatch + Status Name
    ctx.fillStyle = STATUS_COLORS[status];
    drawRoundedRect(ctx, 50, ry + 11, 12, 12, 2);
    ctx.fill();

    ctx.fillStyle = '#334155';
    ctx.font = '600 15px "Public Sans", Arial, sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText(status, 72, ry + 23);

    // Values centered under each bar
    sections.forEach((sec, idx) => {
      const centerX = chartLeft + colW * idx + colW / 2;
      ctx.fillStyle = '#0F172A';
      ctx.font = '600 16px "JetBrains Mono", monospace';
      ctx.textAlign = 'center';
      ctx.fillText(`${sec.counts[status]}`, centerX, ry + 23);
    });
  });

  return canvasToUint8Array(canvas);
}
