import { IReportRenderer, ReportData } from './IReportRenderer';

export class CsvRenderer implements IReportRenderer {
  readonly format = 'csv';

  render({ columns, rows }: ReportData): string {
    return [columns.join(','), ...rows.map((row) => row.join(','))].join('\n');
  }
}
