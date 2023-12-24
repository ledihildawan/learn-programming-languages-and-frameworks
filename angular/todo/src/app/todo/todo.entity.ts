export type Todo = Partial<{
  id?: any;
  title: string;
  complete: boolean;
}>;

export class TodoEntity {
  public id?: any;
  public title: string = '';
  public complete: boolean = false;

  constructor(values: Todo = {}) {
    Object.assign(this, values);
  }
}
