import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ValidFilters } from '../actions/filter.actions';

export const selectFeature = createFeatureSelector<ValidFilters>('filter');

export const selectFilter = createSelector(selectFeature, (state) => {
  return state;
});
