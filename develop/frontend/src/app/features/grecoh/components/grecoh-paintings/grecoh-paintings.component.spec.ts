import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrecohPaintingsComponent } from './grecoh-paintings.component';

describe('GrecohPaintingsComponent', () => {
  let component: GrecohPaintingsComponent;
  let fixture: ComponentFixture<GrecohPaintingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrecohPaintingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrecohPaintingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
