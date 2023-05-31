import { Pipe, PipeTransform } from '@angular/core';
import { TodoItem } from '../models/todo-item.model';
import { ValidFilters } from '../store/actions/filter.actions';

@Pipe({
  name: 'filterTodo',
  standalone: true,
})
export class FilterPipe implements PipeTransform {
  transform(todoList: TodoItem[], filter: ValidFilters): TodoItem[] {
    switch (filter) {
      case 'completed':
        return todoList.filter((todo) => todo.completed);
      case 'pending':
        return todoList.filter((todo) => !todo.completed);
      case 'all':
        return todoList;
      default:
        (() => {
          const flag: never = filter;
          throw new Error(flag);
        })();
    }
  }
}
