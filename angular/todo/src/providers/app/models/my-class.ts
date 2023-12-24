export class MyClass {
  public readonly dt: Date = new Date();
  public readonly name: string = 'MyClass Instance';

  public num!: number;
  public time!: number;

  constructor() {
    this.num = Math.floor(Math.random() * 1000);
    this.time = this.dt.getTime();
  }
}
