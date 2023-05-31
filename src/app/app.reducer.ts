import { ActionReducerMap } from '@ngrx/store';
import { TodoItem } from './todo-page/models/todo-item.model';
import { ValidFilters } from './todo-page/store/actions/filter.actions';
import { todoReducer } from './todo-page/store/reducers/todo.reducer';
import { filterReducer } from './todo-page/store/reducers/filter.reducer';

export interface AppState {
  todos: TodoItem[];
  filter: ValidFilters;
}

export const appReducers: ActionReducerMap<AppState> = {
  todos: todoReducer,
  filter: filterReducer,
};
