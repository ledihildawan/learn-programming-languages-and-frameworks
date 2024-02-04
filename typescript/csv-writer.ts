import { appendFileSync } from "https://deno.land/std@0.36.0/node/fs.ts";

interface Payment {
  id: number,
  amount: number,
  to: string
  notes: string
}

class CSVWriter<T> {
  private csv!: string | undefined;

  constructor(private readonly _columns: (keyof T)[]) {
    this.csv = _columns.join(',') + '\n';
  }

  private _formatRow(value: T): string {
    return this._columns.map((column) => value[column]).join(',');
  }

  public save(filename: string): void {
    appendFileSync(filename, this.csv);

    this.csv = '\n';

    console.log('file saved to', filename);
  }

  public addRows(values: T[]): void {
    const rows: string[] = values.map((value) => this._formatRow(value));

    this.csv += rows.join('\n');

    console.log(this.csv)
  }
}

const paymentWritter: CSVWriter<Payment> = new CSVWriter<Payment>(['id', 'amount', 'to', 'notes']);

paymentWritter.addRows([
  { id: 1, amount: 50, to: 'yoshi', notes: 'for design work' },
  { id: 2, amount: 100, to: 'Mario', notes: 'for dev work' }
]);

paymentWritter.save('./data/payments.csv');
