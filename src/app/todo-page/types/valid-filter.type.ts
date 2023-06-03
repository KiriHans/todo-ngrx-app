export type ValidFilters = 'all' | 'completed' | 'pending';

export const isValidFilter = (x: string): x is ValidFilters => {
  return ['all', 'completed', 'pending'].includes(x);
};
