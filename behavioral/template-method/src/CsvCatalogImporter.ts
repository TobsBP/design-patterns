import { CatalogImporter } from './CatalogImporter';

export class CsvCatalogImporter extends CatalogImporter {
  protected get source(): string {
    return 'CSV';
  }

  protected parse(raw: string): Record<string, string>[] {
    const [header, ...lines] = raw.trim().split('\n');
    const columns = header.split(',').map((column) => column.trim());

    return lines.map((line) => {
      const values = line.split(',').map((value) => value.trim());
      return Object.fromEntries(columns.map((column, i) => [column, values[i] ?? '']));
    });
  }
}
