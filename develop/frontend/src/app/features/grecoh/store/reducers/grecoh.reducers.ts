import {initialSemanticRepresentationState, GrecohState} from '../state/grecoh.state';
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
    case GrecohActionTypes.GetPaintingsSuccess: {
      const newState = {...state,
        apiRestServerError: null};
      newState.paintings = action.paintings;
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
      newState.paintingStatistics = action.paintingStatistics;
      return newState;
    }
    case GrecohActionTypes.GetPaintingVersionScoresSuccess: {
      const newState = {...state,
        apiRestServerError: null};
      newState.paintingVersionScores = action.paintingVersionScores;
      return newState;
    }
    default: {
      return state;
    }
  }
}