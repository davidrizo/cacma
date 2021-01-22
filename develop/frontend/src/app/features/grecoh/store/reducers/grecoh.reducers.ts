import {GrecohState, initialSemanticRepresentationState} from '../state/grecoh.state';
import {GrecohActions, GrecohActionTypes} from '../actions/grecoh.actions';

export function grecohReducers(state = initialSemanticRepresentationState, action: GrecohActions):
  GrecohState {
  switch (action.type) {
    case GrecohActionTypes.ResetGrecohServerError: {
      return {
        ...state,
        apiRestServerError: null
      };
    }
    case GrecohActionTypes.GrecohServerError: {
      return {
        ...state,
        apiRestServerError: action.serverError
      };
    }
    case GrecohActionTypes.GetPaintings: {
      const newState = {...state,
        apiRestServerError: null};
      newState.currentLevel = action.level;
      return newState;
    }
    case GrecohActionTypes.GetPaintingsSuccess: {
      const newState = {...state,
        apiRestServerError: null};
      newState.paintings = action.paintings;
      newState.allLevelPaintingsScored = true;
      action.paintings.forEach(painting => {
        if (!painting.scored) {
          newState.allLevelPaintingsScored = false;
        }
      });
      return newState;
    }
    case GrecohActionTypes.GetPaintingSuccess: {
      const newState = {...state,
        apiRestServerError: null};
      newState.selectedPainting = action.painting;
      return newState;
    }
    case GrecohActionTypes.GetPaintingVersionsSuccess: {
      const newState = {...state,
        apiRestServerError: null};
      newState.paintingVersions = action.paintingVersions;
      return newState;
    }
    case GrecohActionTypes.PostPaintingVersionsScoresSuccess: {
      const newState = {...state,
        apiRestServerError: null};
      newState.postScoresResult = action.success;
      return newState;
    }
    case GrecohActionTypes.GetPaintingStatisticsSuccess: {
      const newState = {...state,
        apiRestServerError: null};
      // sort descending by average
      // slice because the redux store array is inmutable
      newState.paintingStatistics = action.paintingStatistics.slice().sort((a, b): number => b.average - a.average);
      return newState;
    }
    case GrecohActionTypes.ResetScoreResults: {
      const newState = {...state,
        apiRestServerError: null};
      newState.postScoresResult = null;
      return newState;
    }
    case GrecohActionTypes.GetPaintingVersionScoresSuccess: {
      const newState = {...state,
        apiRestServerError: null};
      newState.paintingVersionScores = action.paintingVersionScores;
      return newState;
    }
    case GrecohActionTypes.GetCollaboratorsSuccess: {
      const newState = {...state,
        apiRestServerError: null};
      newState.collaborators = action.collaborators;
      return newState;
    }
    case GrecohActionTypes.SelectCollaborator: {
      const newState = {...state,
        apiRestServerError: null};
      newState.selectedCollaboratorID = action.collaboratorID;
      return newState;
    }
    case GrecohActionTypes.ChangeLevel: {
      const newState = {
        ...state,
        apiRestServerError: null
      };
      newState.currentLevel = action.level;
      return newState;
    }
    case GrecohActionTypes.GetQuestionsSuccess: {
      const newState = {...state,
        apiRestServerError: null};
      newState.questions = action.questions;
      return newState;
    }
    case GrecohActionTypes.GetExperimentSuccess: {
      const newState = {...state,
        apiRestServerError: null};
      newState.currentExperiment = action.experiment;
      return newState;
    }
    case GrecohActionTypes.GetExperimentLevelUserSuccess: {
      const newState = {...state,
        apiRestServerError: null};
      newState.experimentLevelUser = action.experimentLevelUser;
      return newState;
    }
    case GrecohActionTypes.PostExperimentLevelUserCommentSuccess: {
      const newState = {...state,
        apiRestServerError: null};
      newState.postExperimentLevelUserCommentsResult = action.success;
      return newState;
    }
    default: {
      return state;
    }
  }
}
