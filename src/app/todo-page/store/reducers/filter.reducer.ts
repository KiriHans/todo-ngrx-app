import { createReducer, on } from '@ngrx/store';
import * as FilterActions from '../actions/filter.actions';
import { ValidFilters } from '../../types/valid-filter.type';

export const filterFeatureKey = 'filter';

export const initialState: ValidFilters = 'all';

export const filterReducer = createReducer<ValidFilters>(
  initialState,
  on(FilterActions.setFilter, (state, { filter }): ValidFilters => filter)
);
