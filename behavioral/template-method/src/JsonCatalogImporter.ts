import { CatalogImporter } from './CatalogImporter';
import { ImportReport } from './ImportedProduct';

export class JsonCatalogImporter extends CatalogImporter {
  readonly notified: string[] = [];

  protected get source(): string {
    return 'JSON';
  }

  protected parse(raw: string): Record<string, string>[] {
    const data = JSON.parse(raw) as { items: Record<string, string>[] };
    return data.items;
  }

  // Este fornecedor manda o preço já em centavos.
  protected normalize(row: Record<string, string>) {
    return {
      sku: row.sku.trim().toLowerCase(),
      name: row.name.trim(),
      priceInCents: Number(row.price),
    };
  }

  // Usa o hook que a superclasse deixou vazio.
  protected afterImport(report: ImportReport): void {
    this.notified.push(`catálogo JSON atualizado: ${report.imported} produtos`);
    console.log(`[JSON] avisando o time de catálogo`);
  }
}
