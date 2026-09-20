import { IReportRenderer, ReportData } from './IReportRenderer';

export class JsonRenderer implements IReportRenderer {
  readonly format = 'json';

  render({ title, columns, rows }: ReportData): string {
    const records = rows.map((row) => Object.fromEntries(columns.map((column, i) => [column, row[i]])));
    return JSON.stringify({ title, records }, null, 2);
  }
}
