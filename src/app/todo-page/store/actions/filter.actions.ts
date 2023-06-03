import { createAction, props } from '@ngrx/store';
import { ValidFilters } from '../../types/valid-filter.type';

export const setFilter = createAction('[Filtro] Set filter', props<{ filter: ValidFilters }>());
