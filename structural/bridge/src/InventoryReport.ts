import { IReportRenderer, ReportData } from './IReportRenderer';
import { Report } from './Report';

export interface StockLevel {
  sku: string;
  available: number;
  reserved: number;
}

export class InventoryReport extends Report {
  constructor(
    renderer: IReportRenderer,
    private readonly levels: StockLevel[],
  ) {
    super(renderer);
  }

  protected build(): ReportData {
    return {
      title: 'Estoque atual',
      columns: ['sku', 'disponível', 'reservado'],
      rows: this.levels.map((level) => [level.sku, level.available, level.reserved]),
    };
  }
}
