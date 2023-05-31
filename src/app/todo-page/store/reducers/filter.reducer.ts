import { createReducer, on } from '@ngrx/store';
import { ValidFilters } from '../actions/filter.actions';
import * as FilterActions from '../actions/filter.actions';

export const filterFeatureKey = 'filter';

export const initialState: ValidFilters = 'all';

export const filterReducer = createReducer<ValidFilters>(
  initialState,
  on(FilterActions.setFilter, (state, { filter }): ValidFilters => filter)
);
