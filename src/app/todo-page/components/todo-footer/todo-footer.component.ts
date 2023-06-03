import { Component, OnInit, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { Store } from '@ngrx/store';
import { selectFilter } from '../../store/selectors/filter.selectors';
import { ActivatedRoute, RouterModule } from '@angular/router';

import * as FilterActions from '../../store/actions/filter.actions';
import * as TodoActions from '../../store/actions/todo.actions';

import { selectPendingTodos, selectTodoList } from '../../store/selectors/todo.selectors';
import { TodoItem } from '../../models/todo-item.model';
import { ValidFilters, isValidFilter } from '../../types/valid-filter.type';
@Component({
  selector: 'app-todo-footer',
  standalone: true,
  imports: [CommonModule, MatButtonModule, RouterModule],

  templateUrl: './todo-footer.component.html',
  styleUrls: ['./todo-footer.component.css'],
})
export class TodoFooterComponent implements OnInit {
  filterList: ValidFilters[] = ['all', 'completed', 'pending'];
  currentFilter!: Signal<ValidFilters>;
  itemsLeftList!: Signal<TodoItem[]>;
  todoList!: Signal<TodoItem[]>;

  constructor(private route: ActivatedRoute, private store: Store) {}

  ngOnInit(): void {
    this.currentFilter = this.store.selectSignal(selectFilter);
    this.itemsLeftList = this.store.selectSignal(selectPendingTodos);
    this.todoList = this.store.selectSignal(selectTodoList);

    const filter = this.route.snapshot.fragment;
    if (filter && isValidFilter(filter)) {
      this.store.dispatch(FilterActions.setFilter({ filter }));
    }
  }

  changeFilter(filter: ValidFilters): void {
    if (filter === this.currentFilter()) return;
    this.store.dispatch(FilterActions.setFilter({ filter }));
  }

  clearCompletedTodos(): void {
    this.store.dispatch(TodoActions.clearAllTodos());
  }
}
