import { IReportRenderer, ReportData } from './IReportRenderer';

export class TableRenderer implements IReportRenderer {
  readonly format = 'table';

  render({ title, columns, rows }: ReportData): string {
    const widths = columns.map((column, i) =>
      Math.max(column.length, ...rows.map((row) => String(row[i]).length)),
    );
    const line = (cells: (string | number)[]) =>
      cells.map((cell, i) => String(cell).padEnd(widths[i])).join('  ');

    return [title, '', line(columns), widths.map((w) => '-'.repeat(w)).join('  '), ...rows.map(line)].join('\n');
  }
}
