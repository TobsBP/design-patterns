import { IReportService } from './IReportService';
import { ReportService } from './ReportService';

// Proxy: mesma interface do serviço real, mas controla o acesso a ele.
// - só cria o serviço quando alguém realmente pede um relatório (lazy)
// - guarda o resultado para não reprocessar o mesmo mês
export class CachedReportProxy implements IReportService {
  private service?: IReportService;
  private readonly cache = new Map<string, string>();

  constructor(private readonly createService = () => new ReportService()) {}

  generate(month: string): string {
    const cached = this.cache.get(month);
    if (cached !== undefined) {
      console.log(`[Proxy] Cache hit para ${month}`);
      return cached;
    }

    this.service ??= this.createService();
    const report = this.service.generate(month);
    this.cache.set(month, report);
    return report;
  }
}
