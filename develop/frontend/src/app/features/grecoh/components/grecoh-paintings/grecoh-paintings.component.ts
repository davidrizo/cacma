import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {Painting} from '../../model/painting';
import {Store} from '@ngrx/store';
import {ShowErrorService} from '../../../../core/services/show-error.service';
import {
  selectAllLevelPaintingsScored,
  selectCollaborators, selectCurrentExperiment, selectCurrentLevel,
  selectGrecohServerError, selectIsFirstLevel, selectIsLastLevel, selectLevelsCompleted,
  selectPaintings,  selectQuestionsUserAnswers,
  selectSelectedCollaboratorID
} from '../../store/selectors/grecoh.selector';
import {
  // ChangeLevelIndex,
  FirstLevel,
  GetCollaborators,
  GetExperiment, GetExperimentLevelUserQuestions, GetLevels,
  GetLevelPaintings, NextLevel, PostExperimentLevelUserComment, PreviousLevel,
  ResetGrecohServerError,
  SelectCollaborator
} from '../../store/actions/grecoh.actions';
import {GrecohState, initialSemanticRepresentationState} from '../../store/state/grecoh.state';
import {Collaborator} from '../../model/collaborator';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../../auth/auth.service';
import {Level} from '../../model/level';
import {Experiment} from '../../model/experiment';
import {ExperimentLevelUserQuestionAnswer} from '../../model/experiment-level-user_questions';
import {ActivatedRoute, ParamMap} from '@angular/router';

@Component({
  selector: 'app-grecoh-paintings',
  templateUrl: './grecoh-paintings.component.html',
  styleUrls: ['./grecoh-paintings.component.css'],
})
export class GrecohPaintingsComponent implements OnInit, OnDestroy {
  currentExperimentID = 1; // TODO Del filtro de tipo de experimento
  currentExperimentSubscription: Subscription;
  currentExperiment: Experiment;
  currentLevelSubscription: Subscription;
  currentLevel: Level;
  paintings$: Observable<Painting[]>;
  allLevelPaintingsScored$: Observable<boolean>;
  isFirstLevel$: Observable<boolean>;
  isLastLevel$: Observable<boolean>;
  isLevelsCompleted$: Observable<boolean>;

  collaborators: Collaborator[];
  private serverErrorSubscription: Subscription;
  collaboratorsSubscription: Subscription;
  selectedCollaboratorSubscription: Subscription;
  selectedCollaboratorID: number; // must be a number

  questionsAnswersSubscription: Subscription;
  private emailSubscription: Subscription;
  private email: string;

  hasComments: boolean; // it has comments for all the input fields
  formQuestionsAnswers: FormGroup;
  questionsAnswers: ExperimentLevelUserQuestionAnswer[];

  constructor(private store: Store<GrecohState>, private showErrorService: ShowErrorService, private formBuilder: FormBuilder,
              private authService: AuthService) { // , private route: ActivatedRoute) {
    this.collaborators = [
      {
        id: initialSemanticRepresentationState.selectedCollaboratorID,
        name: 'Ninguno',
        email: null
      }
    ];
    this.selectedCollaboratorID = this.collaborators[0].id;

    this.formQuestionsAnswers = new FormGroup({
      questionsControls: new FormArray([])
    });

  }

  get questionsControls(): FormArray {
    return this.formQuestionsAnswers.get('questionsControls') as FormArray;
  }

  ngOnInit() {
    this.store.dispatch(new GetExperiment(this.currentExperimentID));

   /* this.route.paramMap.subscribe((params: ParamMap) => {
      const levelIndex = this.route.snapshot.paramMap.get('levelIndex');
      if (levelIndex) {
        this.store.dispatch(new ChangeLevelIndex(+levelIndex));
      }
    });*/

    this.currentExperimentSubscription = this.store.select(selectCurrentExperiment).subscribe(next => {
      if (next) {
        this.currentExperiment = next;
        this.store.dispatch(new GetLevels(next.id));
      }
    });
    this.currentLevelSubscription = this.store.select(selectCurrentLevel).subscribe(next => {
      if (next) {
        this.currentLevel = next;
        this.dispatchPaintingsAndExperimentLevelUser();
      }
    });

    this.emailSubscription = this.authService.userProfile$.subscribe(next => {
      if (next) {
        this.email = next.email;
        this.dispatchPaintingsAndExperimentLevelUser();
      }
    });

    this.paintings$ = this.store.select(selectPaintings);
    this.allLevelPaintingsScored$ = this.store.select(selectAllLevelPaintingsScored);
    this.isFirstLevel$ = this.store.select(selectIsFirstLevel);
    this.isLastLevel$ = this.store.select(selectIsLastLevel);
    this.isLevelsCompleted$ = this.store.select(selectLevelsCompleted);

    this.collaboratorsSubscription = this.store.select(selectCollaborators).subscribe(value => {
      if (value && this.collaborators.length === 1) { // don't initialize twice on reload
        this.collaborators = this.collaborators.concat(value);
      }
    });

    this.store.dispatch(new GetCollaborators());

    this.serverErrorSubscription = this.store.select(selectGrecohServerError).subscribe(next => {
      if (next) {
        this.showErrorService.warning(next);
        this.store.dispatch(new ResetGrecohServerError());
      }
    });
    this.selectedCollaboratorSubscription = this.store.select(selectSelectedCollaboratorID).subscribe(next => {
      if (next) {
        this.selectedCollaboratorID = next;
      }
    });

    this.questionsAnswersSubscription = this.store.select(selectQuestionsUserAnswers).subscribe(next => {
      this.hasComments = false;
      if (next) {
        this.questionsAnswers = next;
        this.fillQuestionsForms();
      }
    });
  }


  trackByPainting(index, item: Painting) {
    return item.id; // unique id corresponding to the item
  }

  trackByQuestionAnswer(index, item: ExperimentLevelUserQuestionAnswer) {
    return index;
  }

  getGrayscaleImage(item: Painting): string {
    return `assets/paintings/${item.painter_slug}/${item.slug}/grayscale.jpg`;
  }

  ngOnDestroy(): void {
    this.currentExperimentSubscription.unsubscribe();
    this.serverErrorSubscription.unsubscribe();
    this.collaboratorsSubscription.unsubscribe();
    this.selectedCollaboratorSubscription.unsubscribe();
    this.questionsAnswersSubscription.unsubscribe();
    this.emailSubscription.unsubscribe();
  }

  onCollaboratorChanged($event) {
    this.store.dispatch(new SelectCollaborator($event));
  }

  prevLevel() {
    this.store.dispatch(new PreviousLevel());
  }

  nextLevel() {
    this.store.dispatch(new NextLevel());
  }

  firstLevel() {
    this.store.dispatch(new FirstLevel());
  }

  private dispatchPaintingsAndExperimentLevelUser() {
    if (this.email && this.currentLevel && this.currentExperimentID) {
      this.store.dispatch(new GetLevelPaintings(this.currentLevel.id, this.email));
      this.store.dispatch(new GetExperimentLevelUserQuestions(this.currentLevel.id, this.email));
    }
  }

  private fillQuestionsForms() {
    if (this.questionsAnswers) {
      let i = 0;
      this.hasComments = true;
      this.questionsControls.clear();
      this.questionsAnswers.forEach(question => {
        const control = new FormControl(question.question, Validators.required);
        this.questionsControls.push(control);
        control.setValue(question.answer);
        if (!question.answer || question.answer.trim().length === 0) {
          this.hasComments = false;
        }
        i++;
      });
    }
  }

  sendAnswers() {
    const answers: ExperimentLevelUserQuestionAnswer[] = [];
    this.hasComments = true;
    let i = 0;
    this.questionsControls.controls.forEach(control => {
      const answer: ExperimentLevelUserQuestionAnswer = {
        question_id: this.questionsAnswers[i].question_id,
        email: this.email,
        answer: control.value
      };
      answers.push(answer);

      if (!answer.answer || answer.answer.trim().length === 0) {
        this.hasComments = false;
      }
      i++;
    });

    this.store.dispatch(new PostExperimentLevelUserComment(answers));
  }

  getPreviousLevelName() {
    const n: number = +this.currentLevel.ordering as number;
    return n - 1;
  }
  getNextLevelName() {
    let n: number = +this.currentLevel.ordering as number;
    if (n === 2) { // TODO
      return 'Pasar a la conclusión final';
    } else {
      n++;
      return 'Pasar al nivel ' + n;
    }
  }
}
