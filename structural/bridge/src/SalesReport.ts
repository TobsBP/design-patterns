import { IReportRenderer, ReportData } from './IReportRenderer';
import { Report } from './Report';

export interface Sale {
  month: string;
  orders: number;
  revenueInCents: number;
}

export class SalesReport extends Report {
  constructor(renderer: IReportRenderer, private readonly sales: Sale[]) {
    super(renderer);
  }

  protected build(): ReportData {
    return {
      title: 'Vendas por mês',
      columns: ['mês', 'pedidos', 'receita'],
      rows: this.sales.map((sale) => [sale.month, sale.orders, (sale.revenueInCents / 100).toFixed(2)]),
    };
  }
}
