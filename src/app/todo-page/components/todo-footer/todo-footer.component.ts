import { Component, OnInit, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { Store } from '@ngrx/store';
import { selectFilter } from '../../store/selectors/filter.selectors';
import { ValidFilters } from '../../store/actions/filter.actions';
import { RouterModule } from '@angular/router';

import * as FilterActions from '../../store/actions/filter.actions';
import * as TodoActions from '../../store/actions/todo.actions';

import { selectPendingTodos } from '../../store/selectors/todo.selectors';
import { TodoItem } from '../../models/todo-item.model';

@Component({
  selector: 'app-todo-footer',
  standalone: true,
  imports: [CommonModule, MatButtonModule, RouterModule],
  templateUrl: './todo-footer.component.html',
  styleUrls: ['./todo-footer.component.css'],
})
export class TodoFooterComponent implements OnInit {
  currentFilter!: Signal<ValidFilters>;
  filterList: ValidFilters[] = ['all', 'completed', 'pending'];
  itemsLeftList!: Signal<TodoItem[]>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.currentFilter = this.store.selectSignal(selectFilter);
    this.itemsLeftList = this.store.selectSignal(selectPendingTodos);
  }

  changeFilter(filter: ValidFilters): void {
    this.store.dispatch(FilterActions.setFilter({ filter }));
  }

  cleanCompletedTodos(): void {
    this.store.dispatch(TodoActions.clearAllTodos());
  }
}
