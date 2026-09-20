import { IReportRenderer, ReportData } from './IReportRenderer';

// Abstração: sabe o QUE o relatório contém, nunca COMO ele é desenhado.
// A referência ao renderer é a ponte entre as duas hierarquias.
export abstract class Report {
  constructor(protected readonly renderer: IReportRenderer) {}

  protected abstract build(): ReportData;

  export(): string {
    return this.renderer.render(this.build());
  }

  get format(): string {
    return this.renderer.format;
  }
}
