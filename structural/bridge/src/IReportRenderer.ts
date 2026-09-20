export interface ReportData {
  title: string;
  columns: string[];
  rows: (string | number)[][];
}

// Implementador: o lado da ponte que pode variar sozinho.
// Cada formato de saída implementa isso sem saber que relatório está desenhando.
export interface IReportRenderer {
  readonly format: string;
  render(data: ReportData): string;
}
