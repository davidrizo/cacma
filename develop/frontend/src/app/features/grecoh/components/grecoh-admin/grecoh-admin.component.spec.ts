import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrecohAdminComponent } from './grecoh-admin.component';

describe('GrecohAdminComponent', () => {
  let component: GrecohAdminComponent;
  let fixture: ComponentFixture<GrecohAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrecohAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrecohAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
