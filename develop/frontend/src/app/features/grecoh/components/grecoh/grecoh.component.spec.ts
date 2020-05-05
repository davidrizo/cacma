import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrecohComponent } from './grecoh.component';

describe('GrecohComponent', () => {
  let component: GrecohComponent;
  let fixture: ComponentFixture<GrecohComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrecohComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrecohComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
