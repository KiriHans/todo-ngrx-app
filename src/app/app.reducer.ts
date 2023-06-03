import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { TodoItem } from './todo-page/models/todo-item.model';
import { todoReducer } from './todo-page/store/reducers/todo.reducer';
import { filterReducer } from './todo-page/store/reducers/filter.reducer';
import { ValidFilters } from './todo-page/types/valid-filter.type';
import { storageMetaReducer } from './todo-page/store/reducers/todo.metareducer';

export interface AppState {
  todos: TodoItem[];
  filter: ValidFilters;
}

export const appReducers: ActionReducerMap<AppState> = {
  todos: todoReducer,
  filter: filterReducer,
};

export const metaReducers: MetaReducer[] = [storageMetaReducer];
