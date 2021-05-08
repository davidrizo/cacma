import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionsAnalysisComponent } from './questions-analysis.component';

describe('QuestionsAnalysisComponent', () => {
  let component: QuestionsAnalysisComponent;
  let fixture: ComponentFixture<QuestionsAnalysisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionsAnalysisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionsAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
