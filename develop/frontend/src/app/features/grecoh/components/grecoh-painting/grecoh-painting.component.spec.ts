import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrecohPaintingComponent } from './grecoh-painting.component';

describe('GrecohPaintingComponent', () => {
  let component: GrecohPaintingComponent;
  let fixture: ComponentFixture<GrecohPaintingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrecohPaintingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrecohPaintingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
