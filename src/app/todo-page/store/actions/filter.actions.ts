import { createAction, props } from '@ngrx/store';

export type ValidFilters = 'all' | 'completed' | 'pending';

export const setFilter = createAction('[Filtro] Set filter', props<{ filter: ValidFilters }>());
