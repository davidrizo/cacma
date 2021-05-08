import {GrecohState, initialSemanticRepresentationState} from '../state/grecoh.state';
import {GetPaintingVersionScores, GrecohActions, GrecohActionTypes} from '../actions/grecoh.actions';
import {Answer, LevelQuestionAnswers, LevelsQuestionAnswers, Question} from '../../components/questions-analysis/question-analysis-model';
import {selectLevelsQuestionAnswers} from '../selectors/grecoh.selector';
import {klona} from 'klona';

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
    case GrecohActionTypes.GetLevelPaintings: {
      const newState = {...state,
        apiRestServerError: null};
      return newState;
    }
    case GrecohActionTypes.GetAllPaintingsSuccess: {
      const newState = {...state,
        apiRestServerError: null};
      newState.paintings = action.paintings;
      return newState;
    }
    case GrecohActionTypes.GetLevelPaintingsSuccess: {
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
      console.log('1');
      const newState = {...state,
        apiRestServerError: null};
      newState.paintingVersions = action.paintingVersions;
      console.log('2');
      return newState;
    }
    case GrecohActionTypes.PostPaintingVersionsScoresSuccess: {
      const newState = {...state,
        apiRestServerError: null};
      newState.postScoresResult = action.success;
      return newState;
    }
    case GrecohActionTypes.GetPaintingStatisticsSuccess: {
      console.log('X');
      const newState = {...state,
        apiRestServerError: null};
      // sort descending by average
      // slice because the redux store array is inmutable
      newState.paintingStatistics = action.paintingStatistics.slice().sort((a, b): number => b.average - a.average);
      console.log('Y');
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
    case GrecohActionTypes.GetPaintingAllVersionsScores: {
      const newState = {...state,
        apiRestServerError: null};
      newState.paintingAllVersionsScores = null;
      return newState;
    }
    case GrecohActionTypes.GetPaintingAllVersionsScoresSuccess: {
      const newState = {...state,
        apiRestServerError: null};
      newState.paintingAllVersionsScores = action.paintingVersionsScores;
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
    case GrecohActionTypes.GetLevelsSuccess: {
      const newState = {...state,
        apiRestServerError: null};
      newState.levels = action.levels;
      if (!newState.currentLevelIndex) {
        newState.currentLevelIndex = 0;
      }
      if (newState.levels && newState.levels.length > 0) {
        newState.currentLevel = newState.levels[newState.currentLevelIndex];
      }
      newState.levelsCompleted = false;
      return newState;
    }
    case GrecohActionTypes.FirstLevel: {
      const newState = {
        ...state,
        apiRestServerError: null
      };
      if (newState.levels && newState.levels.length > 0) {
        newState.currentLevelIndex = 0;
        newState.currentLevel = newState.levels[0];
      }
      newState.levelsCompleted = false;
      return newState;
    }
    case GrecohActionTypes.PreviousLevel: {
      const newState = {
        ...state,
        apiRestServerError: null
      };
      if (newState.levels && newState.levels.length > 0 && newState.currentLevelIndex > 0) {
        newState.currentLevelIndex--;
        newState.currentLevel = newState.levels[newState.currentLevelIndex];
      }
      newState.levelsCompleted = false;
      return newState;
    }
    case GrecohActionTypes.NextLevel: {
      const newState = {
        ...state,
        apiRestServerError: null
      };
      if (newState.levels && newState.levels.length > 0) {
        if (newState.currentLevelIndex < newState.levels.length) {
          newState.currentLevelIndex++;
          newState.currentLevel = newState.levels[newState.currentLevelIndex];
          newState.levelsCompleted = false;
        } else {
          newState.levelsCompleted = true;
        }
      }
      return newState;
    }
/*    case GrecohActionTypes.ChangeLevelIndex: {
      const newState = {
        ...state,
        apiRestServerError: null
      };
      newState.currentLevelIndex = action.levelIndex;
      if (newState.levels) { // if already loaded
        newState.currentLevel = newState.levels[newState.currentLevelIndex];
        newState.levelsCompleted = false;
      }
      return newState;
    }*/
    case GrecohActionTypes.GetExperimentSuccess: {
      const newState = {...state,
        apiRestServerError: null};
      newState.currentExperiment = action.experiment;
      return newState;
    }
    case GrecohActionTypes.GetExperimentLevelUserQuestionsSuccess: {
      const newState = {...state,
        apiRestServerError: null};
      newState.questionsUserAnswers = action.answers;
      return newState;
    }
    case GrecohActionTypes.PostExperimentLevelUserCommentSuccess: {
      const newState = {...state,
        apiRestServerError: null};
      newState.postExperimentLevelUserCommentsResult = action.success;
      return newState;
    }
    case GrecohActionTypes.GetAnswersExperimentSuccess: {
      const levels: Map<number, LevelQuestionAnswers> = new Map<number, LevelQuestionAnswers>();
      action.answers.forEach(answer => {
        let lqa: LevelQuestionAnswers = levels.get(answer.levelOrdering);
        if (!lqa) {
          lqa = {
            ordering: answer.levelOrdering,
            questions: new Map<number, Question>()
          };
          levels.set(answer.levelOrdering, lqa);
        }

        let q: Question = lqa.questions.get(answer.questionID);
        if (!q) {
          q = {
            id: answer.questionID,
            question: answer.question,
            answers: []
          };
          lqa.questions.set(answer.questionID, q);
        }

        const coherence: string = answer.coherence === '1' ? 'S' : answer.coherence === '0' ? 'N' : 'U';
        const a: Answer = {
          answer: answer.answer,
          email: answer.email,
          coherence
        };
        q.answers.push(a);
      });
      const levelsQuestionAnswers: LevelsQuestionAnswers = {
        levels
      };
      const newState = {...state,
        levelsQuestionAnswers,
        apiRestServerError: null};
      return newState;
    }
    case GrecohActionTypes.ChangeAnswerCoherence: {
      const newState = {...state,
        levelsQuestionAnswers: klona(state.levelsQuestionAnswers),
        apiRestServerError: null};

      for (const level of newState.levelsQuestionAnswers.levels.values()) {
        const question = level.questions.get(action.questionID);
        if (question) {
          const answer = question.answers.find(a => a.email === action.email);
          if (answer) {
            const coherence: string = action.coherence === 1 ? 'S' : action.coherence === 0 ? 'N' : 'U';
            answer.coherence = coherence;
          }
          break;
        }
      }
      return  newState;
    }
    default: {
      return state;
    }
  }
}
