import { IReportService } from './IReportService';

// Serviço real: caro de executar (varre o banco inteiro a cada chamada).
export class ReportService implements IReportService {
  generate(month: string): string {
    console.log(`[ReportService] Processando o relatório de ${month}... (caro)`);
    return `Relatório de vendas — ${month}`;
  }
}
