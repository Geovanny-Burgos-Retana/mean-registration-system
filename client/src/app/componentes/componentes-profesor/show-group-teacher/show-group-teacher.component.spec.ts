import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowGroupTeacherComponent } from './show-group-teacher.component';

describe('ShowGroupTeacherComponent', () => {
  let component: ShowGroupTeacherComponent;
  let fixture: ComponentFixture<ShowGroupTeacherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowGroupTeacherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowGroupTeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
