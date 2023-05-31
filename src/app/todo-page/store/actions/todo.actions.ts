import { createAction, props } from '@ngrx/store';

export const createTodo = createAction('[Todo] Create todo item', props<{ text: string }>());

export const toggleTodo = createAction('[Todo] Toggle todo', props<{ id: number }>());

export const editTodo = createAction('[Todo] Edit todo', props<{ id: number; newText: string }>());

export const deleteTodo = createAction('[Todo] Delete todo', props<{ id: number }>());

export const toggleAllTodos = createAction(
  '[Todo] Toggle all todos',
  props<{ completed: boolean }>()
);

export const clearAllTodos = createAction('[Todo] Clear all todos');
