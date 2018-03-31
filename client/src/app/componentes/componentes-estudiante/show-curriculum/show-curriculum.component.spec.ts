import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowCurriculumComponent } from './show-curriculum.component';

describe('ShowCurriculumComponent', () => {
  let component: ShowCurriculumComponent;
  let fixture: ComponentFixture<ShowCurriculumComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowCurriculumComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowCurriculumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
