import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ValidFilters } from '../../types/valid-filter.type';

export const selectFeature = createFeatureSelector<ValidFilters>('filter');

export const selectFilter = createSelector(selectFeature, (state) => {
  return state;
});
