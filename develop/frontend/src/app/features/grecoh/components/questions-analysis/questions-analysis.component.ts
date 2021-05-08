import {AfterContentInit, AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {selectCurrentExperiment, selectLevels, selectLevelsQuestionAnswers} from '../../store/selectors/grecoh.selector';
import {ChangeAnswerCoherence, GetAnswersExperiment, GetLevels} from '../../store/actions/grecoh.actions';
import {Store} from '@ngrx/store';
import {GrecohState} from '../../store/state/grecoh.state';
import {Observable} from 'rxjs';
import {LevelsQuestionAnswers} from './question-analysis-model';

@Component({
  selector: 'app-questions-analysis',
  templateUrl: './questions-analysis.component.html',
  styleUrls: ['./questions-analysis.component.css']
})
export class QuestionsAnalysisComponent implements OnInit {
  currentExperimentID = 1; // TODO Del filtro de tipo de experimento
  levelsQuestionsAnswers$: Observable<LevelsQuestionAnswers>;


  constructor(private store: Store<GrecohState>) {
    this.store.dispatch(new GetAnswersExperiment(this.currentExperimentID));
  }

  ngOnInit(): void {
    this.levelsQuestionsAnswers$ = this.store.select(selectLevelsQuestionAnswers);
  }

  trackByIndex(index, item) {
    return index;
  }

  onCoherenceChanged(questionID: number, email: string, coherence: number) {
    this.store.dispatch(new ChangeAnswerCoherence(questionID, email, coherence));
  }
}
