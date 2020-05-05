import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrecohScoreStatisticsComponent } from './grecoh-score-statistics.component';

describe('ScoreStatisticsComponent', () => {
  let component: GrecohScoreStatisticsComponent;
  let fixture: ComponentFixture<GrecohScoreStatisticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrecohScoreStatisticsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrecohScoreStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
