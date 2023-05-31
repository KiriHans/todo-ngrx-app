export class TodoItem {
  public completed: boolean;

  constructor(public text: string, public readonly id = new Date().getTime()) {
    this.completed = false;
  }
}
