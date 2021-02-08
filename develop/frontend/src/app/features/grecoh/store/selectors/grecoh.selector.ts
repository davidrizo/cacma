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


export const selectSelectedCollaboratorID = createSelector(
  grecohState,
  (state: GrecohState) => state.selectedCollaboratorID
);

export const selectCurrentLevel = createSelector(
  grecohState,
  // (state: GrecohState) => state.currentLevelIndex ? state.levels[state.currentLevelIndex] : null
  (state: GrecohState) => state.currentLevel
);

export const selectIsFirstLevel = createSelector(
  grecohState,
  (state: GrecohState) => state.currentLevelIndex != null ? state.currentLevelIndex === 0 : null
);

export const selectIsLastLevel = createSelector(
  grecohState,
  (state: GrecohState) => state.currentLevelIndex ? state.currentLevelIndex === state.levels.length - 1 : null
);

export const selectLevelsCompleted = createSelector(
  grecohState,
  (state: GrecohState) => state.levelsCompleted
);

export const selectAllLevelPaintingsScored = createSelector(
  grecohState,
  (state: GrecohState) => state.allLevelPaintingsScored
);

export const selectCurrentExperiment = createSelector(
  grecohState,
  (state: GrecohState) => state.currentExperiment
);

export const selectQuestionsUserAnswers = createSelector(
  grecohState,
  (state: GrecohState) => state.questionsUserAnswers
);

export const selectGrecohServerError = createSelector(
  grecohState,
  (state: GrecohState) => state.apiRestServerError
);


