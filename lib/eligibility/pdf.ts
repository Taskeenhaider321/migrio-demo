import { PDFDocument, StandardFonts, rgb, type PDFFont } from "pdf-lib";
import type { EligibilityReport } from "@/lib/eligibility/types";

const PAGE_WIDTH = 595.28;
const PAGE_HEIGHT = 841.89;
const MARGIN = 48;
const INDIGO = rgb(0.306, 0.275, 0.706);
const INK = rgb(0.1, 0.1, 0.16);
const MUTED = rgb(0.35, 0.38, 0.45);

function pdfSafe(value: string): string {
  return value
    .replace(/\u2019/g, "'")
    .replace(/\u2018/g, "'")
    .replace(/\u2014|\u2013/g, "-")
    .replace(/\u00a0/g, " ")
    .replace(/[^\x0A\x0D\x20-\x7E\xA0-\xFF]/g, "");
}

function wrap(text: string, font: PDFFont, size: number, maxWidth: number): string[] {
  const words = pdfSafe(text).split(/\s+/).filter(Boolean);
  const lines: string[] = [];
  let line = "";

  for (const word of words) {
    const next = line ? `${line} ${word}` : word;
    if (font.widthOfTextAtSize(next, size) > maxWidth && line) {
      lines.push(line);
      line = word;
    } else {
      line = next;
    }
  }
  if (line) lines.push(line);
  return lines.length > 0 ? lines : [""];
}

export async function renderReportPdf(report: EligibilityReport): Promise<Uint8Array> {
  const doc = await PDFDocument.create();
  const regular = await doc.embedFont(StandardFonts.Helvetica);
  const bold = await doc.embedFont(StandardFonts.HelveticaBold);

  let page = doc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
  let y = PAGE_HEIGHT - MARGIN;

  const contentWidth = PAGE_WIDTH - MARGIN * 2;

  const ensure = (needed: number) => {
    if (y - needed > MARGIN) return;
    page = doc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
    y = PAGE_HEIGHT - MARGIN;
  };

  const paragraph = (
    text: string,
    options: { font?: PDFFont; size?: number; color?: ReturnType<typeof rgb>; gap?: number } = {},
  ) => {
    const font = options.font ?? regular;
    const size = options.size ?? 11;
    const color = options.color ?? INK;
    const lines = wrap(text, font, size, contentWidth);
    ensure(lines.length * (size + 4) + (options.gap ?? 10));
    for (const line of lines) {
      page.drawText(line, { x: MARGIN, y, size, font, color });
      y -= size + 4;
    }
    y -= options.gap ?? 10;
  };

  page.drawRectangle({
    x: 0,
    y: PAGE_HEIGHT - 72,
    width: PAGE_WIDTH,
    height: 72,
    color: INDIGO,
  });
  page.drawText("MIGRIO", {
    x: MARGIN,
    y: PAGE_HEIGHT - 36,
    size: 12,
    font: bold,
    color: rgb(1, 1, 1),
  });
  page.drawText("Eligibility report", {
    x: MARGIN,
    y: PAGE_HEIGHT - 54,
    size: 16,
    font: bold,
    color: rgb(1, 1, 1),
  });
  y = PAGE_HEIGHT - 104;

  paragraph(`${report.person.firstName} ${report.person.lastName}`, {
    font: bold,
    size: 14,
    gap: 2,
  });
  paragraph(report.person.email, { size: 10, color: MUTED, gap: 14 });

  paragraph(`${report.score} / 100  ·  ${report.bandLabel}`, { font: bold, size: 18, gap: 6 });
  paragraph(report.headline, { font: bold, size: 13, gap: 8 });
  paragraph(report.summary, { gap: 12 });

  paragraph(`Softest spot: ${report.weakest.label}`, { font: bold, size: 12, gap: 2 });
  paragraph(report.weakest.detail, { gap: 14 });

  paragraph("How the score breaks down", { font: bold, size: 13, gap: 8 });
  for (const factor of report.factors) {
    ensure(28);
    page.drawText(pdfSafe(`${factor.label}  ${factor.score}%`), {
      x: MARGIN,
      y,
      size: 11,
      font: bold,
      color: INK,
    });
    y -= 8;
    const barWidth = contentWidth * (factor.score / 100);
    page.drawRectangle({
      x: MARGIN,
      y: y - 4,
      width: contentWidth,
      height: 4,
      color: rgb(0.93, 0.93, 0.95),
    });
    page.drawRectangle({
      x: MARGIN,
      y: y - 4,
      width: Math.max(barWidth, 2),
      height: 4,
      color: INDIGO,
    });
    y -= 16;
    paragraph(factor.note, { size: 10, color: MUTED, gap: 8 });
  }

  paragraph("Routes to look at", { font: bold, size: 13, gap: 8 });
  for (const route of report.routes) {
    paragraph(route.name, { font: bold, size: 12, gap: 2 });
    paragraph(route.why, { gap: 8 });
  }

  if (report.flags.length > 0) {
    paragraph("Worth knowing", { font: bold, size: 13, gap: 6 });
    for (const flag of report.flags) paragraph(flag, { gap: 6 });
  }

  paragraph("What you told us", { font: bold, size: 13, gap: 6 });
  for (const row of report.summaryRows) {
    paragraph(`${row.label}: ${row.value}`, { size: 10, gap: 2 });
  }

  y -= 8;
  paragraph(`Next step. ${report.nextStep}`, { gap: 10 });
  paragraph(report.disclaimer, { size: 9, color: MUTED, gap: 4 });
  paragraph(`Report ${report.id}`, { size: 8, color: MUTED, gap: 0 });

  return doc.save();
}
