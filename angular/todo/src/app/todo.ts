export type ITodo = Partial<{
  id: number;
  title: string;
  complete: boolean;
}>;

export class Todo {
  public id!: number;

  public title: string = '';
  public complete: boolean = false;

  constructor(values: ITodo = {}) {
    Object.assign(this, values);
  }
}
