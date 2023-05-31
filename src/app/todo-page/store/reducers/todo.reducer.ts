import { createReducer, on } from '@ngrx/store';
import * as TodoActions from '../actions/todo.actions';
import { TodoItem } from '../../models/todo-item.model';

export const todoFeatureKey = 'todos';

export const initialState: TodoItem[] = [
  new TodoItem('Mirar al espejo', 1),
  new TodoItem('Golpear una anciana', 2),
  new TodoItem('Destruir un hogar', 3),
];

export const todoReducer = createReducer(
  initialState,
  on(TodoActions.createTodo, (state, { text }): TodoItem[] => {
    return [...state, new TodoItem(text)];
  }),
  on(TodoActions.toggleTodo, (state, { id }): TodoItem[] => {
    return state.map((todo) => {
      if (todo.id === id) return { ...todo, completed: !todo.completed };
      return todo;
    });
  }),
  on(TodoActions.editTodo, (state, { id, newText }): TodoItem[] => {
    return state.map((todo) => {
      if (todo.id === id) return { ...todo, text: newText };
      return todo;
    });
  }),
  on(TodoActions.deleteTodo, (state, { id }): TodoItem[] => {
    return state.filter((todo) => todo.id !== id);
  }),
  on(TodoActions.toggleAllTodos, (state, { completed }): TodoItem[] => {
    return state.map((todo) => ({ ...todo, completed }));
  }),
  on(TodoActions.clearAllTodos, (state): TodoItem[] => {
    return state.filter((todo) => !todo.completed);
  })
);
