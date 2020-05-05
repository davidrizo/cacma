import {createFeatureSelector, createSelector} from '@ngrx/store';
import {GrecohState} from '../state/grecoh.state';

export const grecohState = createFeatureSelector<GrecohState>('grecoh');

export const selectPaintings = createSelector(
  grecohState,
  (state: GrecohState) => state.paintings
);

export const selectSelectedPainting = createSelector(
  grecohState,
  (state: GrecohState) => state.selectedPainting
);

export const selectPaintingVersions = createSelector(
  grecohState,
  (state: GrecohState) => state.paintingVersions
);

export const selectPaintingStatistics = createSelector(
  grecohState,
  (state: GrecohState) => state.paintingStatistics
);

export const selectPostScoresResult = createSelector(
  grecohState,
  (state: GrecohState) => state.postScoresResult
);

export const selectPaintingVersionScores = createSelector(
  grecohState,
  (state: GrecohState) => state.paintingVersionScores
);


export const selectGrecohServerError = createSelector(
  grecohState,
  (state: GrecohState) => state.apiRestServerError
);
