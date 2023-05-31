import { Component, OnInit, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { Store } from '@ngrx/store';

import { TodoItemComponent } from '../todo-item/todo-item.component';
import { TodoItem } from '../../models/todo-item.model';

import { selectTodoList } from '../../store/selectors/todo.selectors';
import { FilterPipe } from '../../pipes/filter.pipe';
import { ValidFilters } from '../../store/actions/filter.actions';
import { selectFilter } from '../../store/selectors/filter.selectors';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [CommonModule, TodoItemComponent, MatListModule, FilterPipe],
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent implements OnInit {
  todoList!: Signal<TodoItem[]>;
  currentFilter!: Signal<ValidFilters>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.todoList = this.store.selectSignal(selectTodoList);
    this.currentFilter = this.store.selectSignal(selectFilter);
  }
}
