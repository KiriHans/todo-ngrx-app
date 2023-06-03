import { inject } from '@angular/core';
import { Action, ActionReducer } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';

import { BrowserStorageService } from 'src/app/core/services/storage.service';

const localStorageKey = '__app_storage_todo__';

export function storageMetaReducer(reducer: ActionReducer<AppState>) {
  const storage = inject(BrowserStorageService);
  return (state: AppState | undefined, action: Action) => {
    if (state === undefined) {
      const persistedTodo = storage.getItem(localStorageKey);

      return persistedTodo
        ? { ...reducer(state, action), todos: JSON.parse(persistedTodo) }
        : reducer(state, action);
    }
    const nextState = reducer(state, action);
    storage.setItem(localStorageKey, JSON.stringify(nextState.todos));
    return nextState;
  };
}
