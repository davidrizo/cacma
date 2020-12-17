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

export const selectCollaborators = createSelector(
  grecohState,
  (state: GrecohState) => state.collaborators
);


export const selectSelectedCollaborator = createSelector(
  grecohState,
  (state: GrecohState) => state.selectedCollaborator
);

export const selectQuestions = createSelector(
  grecohState,
  (state: GrecohState) => state.questions
);

export const selectCurrentLevel = createSelector(
  grecohState,
  (state: GrecohState) => state.currentLevel
);



export const selectGrecohServerError = createSelector(
  grecohState,
  (state: GrecohState) => state.apiRestServerError
);
