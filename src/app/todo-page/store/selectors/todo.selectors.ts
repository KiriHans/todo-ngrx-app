import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TodoItem } from '../../models/todo-item.model';

export const selectFeature = createFeatureSelector<TodoItem[]>('todos');

export const selectTodoList = createSelector(selectFeature, (state): TodoItem[] => {
  return state;
});

export const selectPendingTodos = createSelector(selectFeature, (state): TodoItem[] => {
  return state.filter((todo) => !todo.completed);
});
